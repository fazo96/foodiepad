'use client';

import { useState, useEffect, use } from 'react';
import { Box, Container, Button, List, ListItem, ListItemText, IconButton, Typography, Checkbox, Skeleton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import { supabase, ShoppingItem, ShoppingList as ShoppingListType } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { redirect } from 'next/navigation';
import { forceSignIn } from '@/env';
import AutoFocusTextField from '@/components/AutoFocusTextField';
import AddIcon from '@mui/icons-material/Add';
import { Assignment } from '@mui/icons-material';
export default function ShoppingList({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [list, setList] = useState<ShoppingListType | null>(null);
  const [newItem, setNewItem] = useState('');
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading, signOut } = useAuth();
  const listId = parseInt(id);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user && forceSignIn) {
      redirect('/login');
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (user || !forceSignIn) {
      // Initial fetch
      const fetchData = async () => {
        setLoading(true);
        await Promise.all([fetchList(), fetchItems()]);
        setLoading(false);
      };
      fetchData();

      // Set up realtime subscription for items
      const itemsChannel = supabase
        .channel('shopping_items_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'shopping_items',
            filter: `list_id=eq.${listId}`
          },
          (payload) => {
            console.log('Change received!', payload);
            fetchItems();
          }
        )
        .subscribe();

      // Set up realtime subscription for list updates
      const listChannel = supabase
        .channel('shopping_list_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'shopping_lists',
            filter: `id=eq.${listId}`
          },
          (payload) => {
            console.log('List change received!', payload);
            fetchList();
          }
        )
        .subscribe();

      // Cleanup subscriptions
      return () => {
        supabase.removeChannel(itemsChannel);
        supabase.removeChannel(listChannel);
      };
    }
  }, [user, listId]);

  const fetchList = async () => {
    const { data, error } = await supabase
      .from('shopping_lists')
      .select('*')
      .eq('id', listId)
      .single();

    if (error) {
      console.error('Error fetching list:', error);
    } else {
      setList(data);
    }
  };

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('shopping_items')
      .select('*')
      .eq('list_id', listId)
      .order('item_name', { ascending: true });

    if (error) {
      console.error('Error fetching items:', error);
    } else {
      setItems(data || []);
    }
  };

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    const { error } = await supabase
      .from('shopping_items')
      .insert([{ 
        item_name: newItem.trim(), 
        is_completed: false,
        list_id: listId
      }]);

    if (error) {
      console.error('Error adding item:', error);
    } else {
      setNewItem('');
    }
  };

  const toggleItem = async (id: number, isCompleted: boolean) => {
    const { error } = await supabase
      .from('shopping_items')
      .update({ is_completed: !isCompleted })
      .eq('id', id);

    if (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async (id: number) => {
    const { error } = await supabase
      .from('shopping_items')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting item:', error);
    } else {
      fetchItems();
    }
  };

  if (authLoading) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Assignment style={{ marginRight: 8 }} />
              <Skeleton variant="text" width={200} height={40} />
            </Box>
          ) : (
            <Typography variant="h4" component="h1">
              <Assignment style={{ marginRight: 8 }} />
              {list?.name || 'Shopping List'}
            </Typography>
          )}
          {user && (
            <IconButton onClick={signOut} title="Sign out">
              <LogoutIcon />
            </IconButton>
          )}
        </Box>

        <Box component="form" onSubmit={addItem} sx={{ mb: 4, display: 'flex', gap: 1 }}>
          <AutoFocusTextField
            fullWidth
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item"
            size="small"
          />
          <Button
            type="submit"
            variant="contained"
            disabled={!newItem.trim()}
            endIcon={<AddIcon />}
          >
            Add
          </Button>
        </Box>

        <List>
          {loading ? (
            // Show 5 skeleton items while loading
            [...Array(5)].map((_, index) => (
              <ListItem key={index}>
                <Skeleton variant="circular" width={40} height={40} sx={{ mr: 1 }} />
                <Skeleton variant="text" width="80%" height={40} />
                <Skeleton variant="circular" width={40} height={40} sx={{ ml: 1 }} />
              </ListItem>
            ))
          ) : (
            items.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton edge="end" onClick={() => deleteItem(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <Checkbox
                  edge="start"
                  checked={item.is_completed}
                  onChange={() => toggleItem(item.id, item.is_completed)}
                />
                <ListItemText
                  primary={item.item_name}
                  sx={{
                    textDecoration: item.is_completed ? 'line-through' : 'none',
                  }}
                />
              </ListItem>
            ))
          )}
        </List>
      </Box>
    </Container>
  );
} 
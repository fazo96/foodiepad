'use client';

import { useState, useEffect } from 'react';
import { Box, Container, TextField, Button, List, ListItem, ListItemText, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { supabase, ShoppingList } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { redirect, useRouter } from 'next/navigation';
import { forceSignIn } from '@/env';

export default function Home() {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [newListName, setNewListName] = useState('');
  const [editingList, setEditingList] = useState<ShoppingList | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user && forceSignIn) {
      redirect('/login');
    }
  }, [user, loading]);

  useEffect(() => {
    if (user || !forceSignIn) {
      // Initial fetch
      fetchLists();

      // Set up realtime subscription
      const channel = supabase
        .channel('shopping_lists_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'shopping_lists',
            filter: user ? `user_id=eq.${user.id}` : undefined
          },
          (payload) => {
            console.log('Change received!', payload);
            fetchLists();
          }
        )
        .subscribe();

      // Cleanup subscription
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const fetchLists = async () => {
    const { data, error } = await supabase
      .from('shopping_lists')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching lists:', error);
    } else {
      setLists(data || []);
    }
  };

  const addList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;

    const { error } = await supabase
      .from('shopping_lists')
      .insert([{ 
        name: newListName.trim(),
        user_id: user?.id
      }]);

    if (error) {
      console.error('Error adding list:', error);
    } else {
      setNewListName('');
      fetchLists();
    }
  };

  const updateList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingList || !editingList.name.trim()) return;

    const { error } = await supabase
      .from('shopping_lists')
      .update({ name: editingList.name.trim() })
      .eq('id', editingList.id);

    if (error) {
      console.error('Error updating list:', error);
    } else {
      setEditingList(null);
      setDialogOpen(false);
      fetchLists();
    }
  };

  const deleteList = async (id: number) => {
    const { error } = await supabase
      .from('shopping_lists')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting list:', error);
    } else {
      fetchLists();
    }
  };

  const openList = (id: number) => {
    router.push(`/shopping-list/${id}`);
  };

  if (loading) {
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
          <Typography variant="h4" component="h1">
            Foodiepad
          </Typography>
          {user && (
            <IconButton onClick={signOut} title="Sign out">
              <LogoutIcon />
            </IconButton>
          )}
        </Box>

        <Box component="form" onSubmit={addList} sx={{ mb: 4, display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="Add new list"
            size="small"
          />
          <Button type="submit" variant="contained" disabled={!newListName.trim()}>
            Add
          </Button>
        </Box>

        <List>
          {lists.map((list) => (
            <ListItem
              key={list.id}
              onClick={() => openList(list.id)}
              sx={{ cursor: 'pointer' }}
              secondaryAction={
                <Box>
                  <IconButton 
                    edge="end" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingList(list);
                      setDialogOpen(true);
                    }}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    edge="end" 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteList(list.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText primary={list.name} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Dialog open={dialogOpen} onClose={() => {
        setDialogOpen(false);
        setEditingList(null);
      }}>
        <DialogTitle>Rename List</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            value={editingList?.name || ''}
            onChange={(e) => setEditingList(prev => prev ? { ...prev, name: e.target.value } : null)}
            placeholder="List name"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setDialogOpen(false);
            setEditingList(null);
          }}>Cancel</Button>
          <Button onClick={updateList} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Chip, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import { supabase, ShoppingList } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { redirect, useRouter } from 'next/navigation';
import { forceSignIn } from '@/env';
import AutoFocusTextField from '@/components/AutoFocusTextField';
import GitHubIcon from '@mui/icons-material/GitHub';
import ShoppingListCard from '@/components/ShoppingListCard';

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
            foodiepad <Chip label="Beta" color="primary" />
          </Typography>
          <IconButton href="https://github.com/fazo96/foodiepad" title="GitHub">
            <GitHubIcon />
          </IconButton>
          {user && (
            <IconButton onClick={signOut} title="Sign out">
              <LogoutIcon />
            </IconButton>
          )}
        </Box>

        <Box component="form" onSubmit={addList} sx={{ mb: 4, display: 'flex', gap: 1 }}>
          <AutoFocusTextField
            fullWidth
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="Add new list"
            size="small"
          />
          <Button
            type="submit"
            variant="contained"
            disabled={!newListName.trim()}
            endIcon={<AddIcon />}
          >
            Add
          </Button>
        </Box>

        <Box sx={{ display: 'grid', gap: 2 }}>
          {lists.map((list) => (
            <ShoppingListCard
              key={list.id}
              list={list}
              onEdit={(list) => {
                setEditingList(list);
                setDialogOpen(true);
              }}
              onDelete={deleteList}
              onClick={openList}
            />
          ))}
        </Box>
      </Box>

      <Dialog open={dialogOpen} onClose={() => {
        setDialogOpen(false);
        setEditingList(null);
      }}>
        <DialogTitle>Rename List</DialogTitle>
        <DialogContent>
          <AutoFocusTextField
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

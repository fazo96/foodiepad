'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Button, Typography, Chip, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import { supabase, ShoppingList } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { redirect, useRouter } from 'next/navigation';
import { forceSignIn } from '@/env';
import AutoFocusTextField from '@/components/AutoFocusTextField';
import GitHubIcon from '@mui/icons-material/GitHub';
import ShoppingListCard from '@/components/ShoppingListCard';
import EditListDialog from '@/components/EditListDialog';

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

  const updateList = async (updatedList: ShoppingList, sharedWithUserId: string | null) => {
    if (!updatedList || !updatedList.name.trim()) return;

    const updates: any = { name: updatedList.name.trim() };
    
    if (sharedWithUserId) {
      // First, verify if the user exists
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', sharedWithUserId)
        .single();

      if (userError || !userData) {
        alert('User not found. Please check the user ID.');
        return;
      }

      // Create a sharing record
      const { error: sharingError } = await supabase
        .from('shares')
        .insert([{
          list_id: updatedList.id,
          from_user_id: user?.id,
          to_user_id: sharedWithUserId
        }]);

      if (sharingError) {
        console.error('Error sharing list:', sharingError);
        alert('Failed to share the list. The user might already have access to this list.');
        return;
      }
    }

    const { error } = await supabase
      .from('shopping_lists')
      .update(updates)
      .eq('id', updatedList.id);

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
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton href="https://github.com/fazo96/foodiepad" title="GitHub">
              <GitHubIcon />
            </IconButton>
            {user && (
              <IconButton onClick={signOut} title="Sign out">
                <LogoutIcon />
              </IconButton>
            )}
          </Box>
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

      {dialogOpen && (
        <EditListDialog
          open={dialogOpen}
          list={editingList}
          onClose={() => {
            setDialogOpen(false);
            setEditingList(null);
          }}
          onSave={updateList}
        />
      )}
    </Container>
  );
}

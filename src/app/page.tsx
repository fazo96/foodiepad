'use client';

import { useState, useEffect } from 'react';
import { Box, Container, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { supabase, ShoppingItem } from '@/lib/supabase';

export default function Home() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    // Initial fetch
    fetchItems();

    // Set up realtime subscription
    const channel = supabase
      .channel('shopping_items_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'shopping_items'
        },
        (payload) => {
          console.log('Change received!', payload);
          fetchItems();
        }
      )
      .subscribe();

    // Cleanup subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('shopping_items')
      .select('*')
      .order('created_at', { ascending: false });

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
      .insert([{ item_name: newItem.trim(), is_completed: false }]);

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
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Foodiepad
        </Typography>
        
        <Box component="form" onSubmit={addItem} sx={{ mb: 4, display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item"
            size="small"
          />
          <Button type="submit" variant="contained" disabled={!newItem.trim()}>
            Add
          </Button>
        </Box>

        <List>
          {items.map((item) => (
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
          ))}
        </List>
      </Box>
    </Container>
  );
}

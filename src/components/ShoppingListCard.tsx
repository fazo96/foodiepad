import { useState, useEffect } from 'react';
import { Card, CardContent, Box, Typography, IconButton, Chip, Skeleton } from '@mui/material';
import { Assignment, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { supabase, ShoppingList } from '@/lib/supabase';

interface ShoppingListItem {
  item_name: string;
}

interface ShoppingListCardProps {
  list: ShoppingList;
  onEdit: (list: ShoppingList) => void;
  onDelete: (id: number) => void;
  onClick: (id: number) => void;
}

export default function ShoppingListCard({ list, onEdit, onDelete, onClick }: ShoppingListCardProps) {
  const [items, setItems] = useState<ShoppingListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();

    // Set up realtime subscription
    const channel = supabase
      .channel(`shopping_list_items_${list.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'shopping_list_items',
          filter: `list_id=eq.${list.id}`
        },
        () => {
          fetchItems();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [list.id]);

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('shopping_items')
      .select('item_name')
      .eq('list_id', list.id)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching items:', error);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  return (
    <Card
      sx={{ cursor: 'pointer' }}
      onClick={() => onClick(list.id)}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
            <Assignment sx={{ mr: 1 }} />
            {list.name}
            {loading ? (
              <Skeleton width={60} height={24} sx={{ ml: 1 }} />
            ) : (
              <Chip
                label={items.length ? `${items.length} items` : 'Empty'}
                size="small"
                color={items.length ? 'primary' : 'default'}
                sx={{ ml: 1 }}
              />
            )}
          </Typography>
          <Box>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(list);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(list.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        {loading ? (
          <Skeleton width="80%" height={20} />
        ) : (
          <Typography variant="body2" color="text.secondary">
            {items.length ? (
              items.slice(0, 3).map(item => item.item_name).join(', ') + 
              (items.length > 3 ? ` and ${items.length - 3} more...` : '')
            ) : (
              'No items yet'
            )}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
} 
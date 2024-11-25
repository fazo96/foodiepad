import { useState, useEffect } from 'react';
import { Card, CardContent, Box, Typography, IconButton, Chip, Skeleton, AvatarGroup, Avatar, Tooltip } from '@mui/material';
import { Assignment, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { supabase, ShoppingList, Share } from '@/lib/supabase';

interface ShoppingListItem {
  item_name: string;
}

interface SharedUser {
  name: string;
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
  const [userName, setUserName] = useState<string | null>(null);
  const [sharedUsers, setSharedUsers] = useState<SharedUser[]>([]);
  const [sharesLoading, setSharesLoading] = useState(true);

  useEffect(() => {
    fetchItems();
    fetchUserName();
    fetchSharedUsers();

    // Set up realtime subscription for items
    const itemsChannel = supabase
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

    // Set up realtime subscription for shares
    const sharesChannel = supabase
      .channel(`shares_${list.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'shares',
          filter: `list_id=eq.${list.id}`
        },
        () => {
          fetchSharedUsers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(itemsChannel);
      supabase.removeChannel(sharesChannel);
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

  const fetchUserName = async () => {
    if (!list.user_id) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('name')
      .eq('user_id', list.user_id)
      .limit(1);

    if (error) {
      console.error('Error fetching user:', error);
    } else {
      setUserName(data?.[0]?.name || 'Unknown user');
    }
  };

  const fetchSharedUsers = async () => {
    setSharesLoading(true);
    
    // Get all shares for this list
    const { data: shares, error: sharesError } = await supabase
      .from('shares')
      .select('to_user_id')
      .eq('list_id', list.id);

    if (sharesError) {
      console.error('Error fetching shares:', sharesError);
      setSharesLoading(false);
      return;
    }

    if (!shares || shares.length === 0) {
      setSharedUsers([]);
      setSharesLoading(false);
      return;
    }

    // Get user names from profiles
    const userIds = shares.map(share => share.to_user_id);
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('name')
      .in('user_id', userIds);

    if (profilesError) {
      console.error('Error fetching shared users:', profilesError);
    } else {
      setSharedUsers(profiles || []);
    }
    setSharesLoading(false);
  };

  return (
    <Card
      sx={{ cursor: 'pointer' }}
      onClick={() => onClick(list.id)}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box>
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
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Created by {userName}
              </Typography>
              {sharesLoading ? (
                <Skeleton width={100} height={32} />
              ) : sharedUsers.length > 0 && (
                <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: '0.75rem' } }}>
                  {sharedUsers.map((user, index) => (
                    <Tooltip key={index} title={`Shared with ${user.name}`}>
                      <Avatar>{user.name.charAt(0).toUpperCase()}</Avatar>
                    </Tooltip>
                  ))}
                </AvatarGroup>
              )}
            </Box>
          </Box>
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
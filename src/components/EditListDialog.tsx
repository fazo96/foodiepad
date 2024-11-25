import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from '@mui/material';
import AutoFocusTextField from './AutoFocusTextField';
import { ShoppingList } from '@/lib/supabase';
import { useState } from 'react';

interface EditListDialogProps {
  open: boolean;
  list: ShoppingList | null;
  onClose: () => void;
  onSave: (list: ShoppingList, sharedWithUserId: string | null) => void;
}

export default function EditListDialog({ open, list, onClose, onSave }: EditListDialogProps) {
  const [editedList, setEditedList] = useState<ShoppingList | null>(list);
  const [sharedWithUserId, setSharedWithUserId] = useState('');

  const handleSave = () => {
    if (!editedList) return;
    onSave(editedList, sharedWithUserId.trim() || null);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Edit List</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <AutoFocusTextField
            autoFocus
            fullWidth
            label="List Name"
            value={editedList?.name || ''}
            onChange={(e) => setEditedList(prev => prev ? { ...prev, name: e.target.value } : null)}
            placeholder="List name"
          />
          
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Share with User
            </Typography>
            <AutoFocusTextField
              fullWidth
              placeholder="Enter user ID to share with"
              value={sharedWithUserId}
              onChange={(e) => setSharedWithUserId(e.target.value)}
              helperText="Enter the user ID of the person you want to share this list with"
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSave} 
          variant="contained"
          disabled={!editedList?.name.trim()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
} 
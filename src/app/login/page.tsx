'use client';

import { useState, useEffect } from 'react';
import { Box, Container, TextField, Button, Typography, Alert } from '@mui/material';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Handle the magic link authentication
    const handleMagicLink = async () => {
      const hash = window.location.hash;
      if (!hash) return;

      // Remove the '#' from the hash string
      const hashParams = new URLSearchParams(hash.replace('#', ''));
      
      // Check for error parameters
      const error = hashParams.get('error');
      const errorDescription = hashParams.get('error_description');
      
      if (error) {
        setMessage({ 
          type: 'error', 
          text: errorDescription?.replace(/\+/g, ' ') || 'Authentication failed'
        });
        return;
      }

      // Handle successful authentication
      if (hash.includes('access_token')) {
        try {
          setLoading(true);
          
          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token');
          
          if (!accessToken) throw new Error('No access token found');
          
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || '',
          });

          console.log('SESSION DATA', data, error);
          
          if (error) {
            setMessage({ type: 'error', text: error.message });
          } else if (data?.session) {
            // Successfully authenticated
            router.push('/'); // Redirect to home page
          }
        } catch (error) {
          setMessage({ 
            type: 'error', 
            text: 'An error occurred while signing in. Please try again.' 
          });
          console.error('Auth error:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    handleMagicLink();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}`,
        },
      });

      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setMessage({ 
          type: 'success', 
          text: 'Check your email for the login link!' 
        });
        setEmail('');
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'An unexpected error occurred. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        my: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3
      }}>
        <Typography variant="h4" component="h1">
          Welcome to Foodiepad
        </Typography>
        
        <Typography variant="body1" textAlign="center">
          Sign in with your email to access your shopping lists.
        </Typography>

        {message && (
          <Alert severity={message.type} sx={{ width: '100%' }}>
            {message.text}
          </Alert>
        )}

        <Box 
          component="form" 
          onSubmit={handleLogin}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
          
          <Button 
            type="submit"
            variant="contained"
            disabled={loading || !email}
            sx={{ py: 1.5 }}
          >
            {loading ? 'Sending...' : 'Send Magic Link'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 
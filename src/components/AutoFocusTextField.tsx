'use client';

import { useEffect, useRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface AutoFocusTextFieldProps extends Omit<TextFieldProps, 'inputRef'> {
  autoFocusDelay?: number; // Delay in milliseconds
}

export default function AutoFocusTextField({
  autoFocusDelay = 100,
  ...props
}: AutoFocusTextFieldProps) {
  const textFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      textFieldRef.current?.focus();
    }, autoFocusDelay);

    return () => clearTimeout(timer);
  }, [autoFocusDelay]);

  return (
    <TextField
      {...props}
      inputRef={textFieldRef}
    />
  );
} 
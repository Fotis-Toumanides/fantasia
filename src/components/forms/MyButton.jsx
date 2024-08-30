import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function MyButton({label, type}) {
  return (
      <Button variant="contained" type={type} className='w-full'>{label}</Button>
  );
}
import * as React from 'react';
import TextField from '@mui/material/TextField';

import { Controller } from 'react-hook-form';

export default function MyTextField({label, name, control}) {
  return (
    <Controller 
      name={name}
      control={control}
      render={({
        field: {onChange, value},
        fieldState: {error},
        formState,
      }) => (
        <TextField 
          className='textField'
          onChange={onChange}
          value={value}
          id="outlined-basic" 
          label={label} 
          variant="outlined" 
          error={!!error}
          helperText={error?.message}
        />
        )
      }
    />
    
  );
}
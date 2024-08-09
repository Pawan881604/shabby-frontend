import * as React from 'react';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

export function CustomersFilters() {
  return (
    <Card sx={{ px: 2, py: 2 }}>
      <OutlinedInput
        defaultValue=""
        fullWidth
        placeholder="Search customer"
        startAdornment={
          <InputAdornment position="start">
            <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
          </InputAdornment>
        }
        inputProps={{
          style: {
            padding: '10px',
            fontSize: '12px' // Adjust the font size here if needed
          }
        }}
        sx={{ maxWidth: '500px' }}
      />
    </Card>
  );
}

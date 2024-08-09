'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

export function UpdatePasswordForm() {
  return React.createElement("form", { onSubmit: event => event.preventDefault() },
    React.createElement(Card, null,
      React.createElement(CardHeader, { subheader: "Update password", title: "Password" }),
      React.createElement(Divider, null),
      React.createElement(CardContent, null,
        React.createElement(Stack, { spacing: 3, sx: { maxWidth: 'sm' } },
          React.createElement(FormControl, { fullWidth: true },
            React.createElement(InputLabel, null, "Password"),
            React.createElement(OutlinedInput, { label: "Password", name: "password", type: "password" })
          ),
          React.createElement(FormControl, { fullWidth: true },
            React.createElement(InputLabel, null, "Confirm password"),
            React.createElement(OutlinedInput, { label: "Confirm password", name: "confirmPassword", type: "password" })
          )
        )
      ),
      React.createElement(Divider, null),
      React.createElement(CardActions, { sx: { justifyContent: 'flex-end' } },
        React.createElement(Button, { variant: "contained" }, "Update")
      )
    )
  );
}

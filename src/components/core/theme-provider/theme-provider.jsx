'use client';

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from '../../../store';
import { createTheme } from '../../../styles/theme/create-theme';
import EmotionCache from './emotion-cache';

export function ThemeProvider({ children }) {
  const theme = createTheme();
  
  return (
    <Provider store={store}>
      <EmotionCache options={{ key: 'mui' }}>
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          {children}
        </CssVarsProvider>
      </EmotionCache>
    </Provider>
  );
}

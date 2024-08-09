'use client';

import * as React from 'react';

import { authClient } from '../lib/auth/client';
import { logger } from '../lib/default-logger';
import { get_all_users } from '../api/authapi';

export const UserContext = React.createContext(undefined);

export function UserProvider({ children }) {
  const [state, setState] = React.useState({
    user: null,
    error: null,
    isLoading: true,
  });

  const checkSession = React.useCallback(async () => {
    try {
      const { data, error } = await authClient.getUser();

      if (error) {
        logger.error(error);
        setState(prev => ({ ...prev, user: null, error: 'Something went wrong', isLoading: false }));
        return;
      }

      setState(prev => ({
        ...prev,
        user: data ?? null,
        error: null,
        isLoading: false
      }));
    } catch (err) {
      logger.error(err);
      setState(prev => ({ ...prev, user: null, error: 'Something went wrong', isLoading: false }));
    }
  }, []);

  React.useEffect(() => {
    checkSession().catch(err => {
      logger.error(err);
    });
  }, [checkSession]);

  return <UserContext.Provider value={{ ...state, checkSession }}>{children}</UserContext.Provider>;
}

export const UserConsumer = UserContext.Consumer;

'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { paths } from '../../paths';
import { useUser } from '../../hooks/use-user';

const schema = zod.object({
  firstName: zod.string().min(1, {
    message: 'First name is required'
  }),
  lastName: zod.string().min(1, {
    message: 'Last name is required'
  }),
  email: zod.string().min(1, {
    message: 'Email is required'
  }).email(),
  password: zod.string().min(6, {
    message: 'Password should be at least 6 characters'
  }),
  terms: zod.boolean().refine(value => value, 'You must accept the terms and conditions')
});

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  terms: false
};

export function SignUpForm() {
  const router = useRouter();
  const { checkSession } = useUser();
  const [isPending, setIsPending] = React.useState(false);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema)
  });

  const onSubmit = () => {
    
    // async (values: Values): Promise<void> => {
    //   setIsPending(true);

    //   const { error } = await authClient.signUp(values);

    //   if (error) {
    //     setError('root', { type: 'server', message: error });
    //     setIsPending(false);
    //     return;
    //   }

    //   // Refresh the auth state
    //   await checkSession?.();

    //   // UserProvider, for this case, will not refresh the router
    //   // After refresh, GuestGuard will handle the redirect
    //   router.refresh();
    // },
    // [checkSession, router, setError]
  };




 // const onOtpSubmit = React.useCallback(async values => {
  //   setIsPending(true);
  //   const uuid = await generateUuid();
  //   const params = {
  //     otp: values.otp,
  //     user_id: user_id,
  //     uuid: uuid
  //   };
  //   const {
  //     error
  //   } = await authClient.signInWithOtp(params);
  //   if (error) {
  //     setOtpError('root', {
  //       type: 'server',
  //       message: error
  //     });
  //     setIsPending(false);
  //     return;
  //   }

  //   // Refresh the auth state
  //   await checkSession?.();

  //   // UserProvider, for this case, will not refresh the router
  //   // After refresh, GuestGuard will handle the redirect
  //   router.refresh();
  // }, [checkSession, router, user_id, setOtpError]);
  // const handleResendOTP = async () => {
  //   console.log('Resend OTP button clicked');
  //   // Add your logic to resend the OTP here
  // };

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign up</Typography>
        <Typography color="text.secondary" variant="body2">
          Already have an account?{' '}
          <Link component={RouterLink} href={paths.auth.signIn} underline="hover" variant="subtitle2">
            Sign in
          </Link>
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormControl error={Boolean(errors.firstName)}>
                <InputLabel>First name</InputLabel>
                <OutlinedInput {...field} label="First name" />
                {errors.firstName && <FormHelperText>{errors.firstName.message}</FormHelperText>}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormControl error={Boolean(errors.lastName)}>
                <InputLabel>Last name</InputLabel>
                <OutlinedInput {...field} label="Last name" />
                {errors.lastName && <FormHelperText>{errors.lastName.message}</FormHelperText>}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput {...field} label="Email address" type="email" />
                {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput {...field} label="Password" type="password" />
                {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="terms"
            render={({ field }) => (
              <div>
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label={
                    <>
                      I have read the <Link href="#">terms and conditions</Link>
                    </>
                  }
                />
                {errors.terms && <FormHelperText error>{errors.terms.message}</FormHelperText>}
              </div>
            )}
          />
          {errors.root && <Alert color="error">{errors.root.message}</Alert>}
          <Button disabled={isPending} type="submit" variant="contained">
            Sign up
          </Button>
        </Stack>
      </form>
      <Alert color="warning">Created users are not persisted</Alert>
    </Stack>
  );
}

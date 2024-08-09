'use client';

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import OtpInput from 'react-otp-input';
import { authClient } from '../../lib/auth/client';
import { useUser } from '../../hooks/use-user';
import { Box } from '@mui/material';
import { Auth } from '../../api/authapi';
import generateUuid from '../../lib/Uuidv4';
const schema = zod.object({
  phone: zod.string().min(10, "Phone number must be at least 10 digits")
});
const otp_schema = zod.object({
  otp: zod.string().length(6, "OTP must be exactly 6 digits") // Adjust length based on your OTP requirements
  .regex(/^\d+$/, "OTP must be digits only") // Ensure OTP is numeric
});
export function SignInForm() {
  const router = useRouter();
  const [value, setValue] = React.useState('');
  const [otp_value, setotp_Value] = React.useState('');
  const [otp_page, setOpt_page] = React.useState(false);
  const [user_id, setuser_id] = React.useState('');
  const {
    checkSession
  } = useUser();
  const [isPending, setIsPending] = React.useState(false);
  const [is_number_Pending, setis_number_Pending] = React.useState(false);

  // const { control, handleSubmit, setError, formState: { errors } } = useForm<Values>({
  //   resolver: zodResolver(schema),
  // });
  const {
    control: phoneControl,
    handleSubmit: handlePhoneSubmit,
    setError: setPhoneError,
    formState: {
      errors: phoneErrors
    }
  } = useForm({
    resolver: zodResolver(schema)
  });
  const {
    control: otpControl,
    handleSubmit: handleOtpSubmit,
    setError: setOtpError,
    formState: {
      errors: otpErrors
    }
  } = useForm({
    resolver: zodResolver(otp_schema)
  });
  const onSubmitPhone = React.useCallback(async values => {
    // setIsPending(true);
    const {
      phone
    } = values;
    setis_number_Pending(true);
    const uuid = await generateUuid();
    const response = await Auth(phone, uuid);
    if (response.data) {
      setuser_id(response.data.user_data);
      setOpt_page(true);
      return;
    }
    if (response.error) {
      setPhoneError('root', {
        type: 'server',
        message: response.error
      });
      setis_number_Pending(false);
      return;
    }
    router.refresh();
  }, [router, setPhoneError, setOpt_page, setuser_id, setis_number_Pending]);
  const onOtpSubmit = React.useCallback(async values => {
    setIsPending(true);
    const uuid = await generateUuid();
    const params = {
      otp: values.otp,
      user_id: user_id,
      uuid: uuid
    };
    const {
      error
    } = await authClient.signInWithOtp(params);
    if (error) {
      setOtpError('root', {
        type: 'server',
        message: error
      });
      setIsPending(false);
      return;
    }

    // Refresh the auth state
    await checkSession?.();

    // UserProvider, for this case, will not refresh the router
    // After refresh, GuestGuard will handle the redirect
    router.refresh();
  }, [checkSession, router, user_id, setOtpError]);
  const handleResendOTP = async () => {
    console.log('Resend OTP button clicked');
    // Add your logic to resend the OTP here
  };
  return (
    <Box style={{ overflow: 'hidden', position: 'relative' }}>
          <Stack spacing={4}>
          
            <Typography variant='h2' style={{ textAlign: 'center', color: '#fff',marginTop:45 }}>
              Welcome to
            </Typography>
            <Stack spacing={1} className='login-img-cont'>
              <Box
                component="img"
                alt="Widgets"
                src="/assets/shabby.png"
                sx={{ height: 'auto', width: '110px', maxWidth: '600px' }}
              />
            </Stack>
            <Box style={{ background: '#fff',margin:'10px 0px 0px', borderRadius:'20px 20px 0px 0px' }}>
    
              <Box style={{ maxWidth: '450px', margin:'auto',padding:'70px 20px 175px' }}>
    
                <Box style={{ overflow: 'hidden', }}>
                  <Box style={{ display: 'flex', transform: `${otp_page ? 'translateX(-100%)' : 'translateX(0%)'}`, }}>
                    <Box style={{ flex: '0 0 auto', width: '100%' }}><form onSubmit={handlePhoneSubmit(onSubmitPhone)}>
                      <Stack spacing={2}>
                        <Controller
                          control={phoneControl}
                          name="phone"
                          render={({ field }) => (
                            <FormControl error={Boolean(phoneErrors.phone)}>
                              <PhoneInput
                                country={'in'}
                                value={value}
                                inputProps={{
                                  autoFocus: true,
                                  required: true,
                                  name: 'phone',
                                  style: {
                                    width: '100%',
                                  },
                                }}
                                onChange={phone => {
                                  setValue(phone);
                                  field.onChange(phone); // Update the value in react-hook-form
                                }}
                                placeholder="Enter phone number"
                              />
                              {phoneErrors.phone && <FormHelperText>{phoneErrors.phone.message}</FormHelperText>}
                            </FormControl>
                          )}
                        />
    
                        {phoneErrors.root ? <Alert color="error">{phoneErrors.root.message}</Alert> : null}
                        <Button type="submit" disabled={is_number_Pending} variant="contained">
                          Send OTP
                        </Button>
                      </Stack>
                    </form></Box>
                    <Box style={{ flex: '0 0 auto', width: '100%' }}>
                      <form onSubmit={handleOtpSubmit(onOtpSubmit)}>
                        <Stack spacing={2}>
                          <Controller
                            control={otpControl}
                            name="otp"
                            render={({ field }) => (
                              <FormControl error={Boolean(otpErrors.otp)}>
                                <OtpInput
                                  value={otp_value}
                                  numInputs={6}
                                  renderSeparator={<span style={{ margin: '1px' }}>-</span>}
    
                                  renderInput={(props) => (
                                    <input
                                      {...props}
                                      style={{
                                        width: '40px',
                                        height: '40px',
                                        textAlign: 'center',
                                        fontSize: '20px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        margin: '0 5px',
                                        padding: '5px',
                                        outline: 'none',
                                        transition: 'border-color 0.3s',
                                      }}
                                    />
                                  )}
                                  onChange={(otp) => {
                                    setotp_Value(otp);
                                    field.onChange(otp); // Update the value in react-hook-form
                                  }}
                                />
    
                                {otpErrors.otp && <FormHelperText>{otpErrors.otp.message}</FormHelperText>}
                              </FormControl>
                            )}
                          />
    
                          {otpErrors.root ? <Alert color="error">{otpErrors.root.message}</Alert> : null}
                          <Button type="submit" disabled={isPending} variant="contained">
                            Submit OTP
                          </Button>
                          {/* <button onClick={handleResendOTP}>Resend OTP</button> */}
                        </Stack>
                      </form>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
    
          </Stack>
    
    
    
        </Box>
      );
}
'use client';

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  const {
    checkSession
  } = useUser();
  const [isPending, setIsPending] = React.useState(false);
  const {
    control,
    handleSubmit,
    setError,
    formState: {
      errors
    }
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
  return /*#__PURE__*/React.createElement(Stack, {
    spacing: 3
  }, /*#__PURE__*/React.createElement(Stack, {
    spacing: 1
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "h4"
  }, "Sign up"), /*#__PURE__*/React.createElement(Typography, {
    color: "text.secondary",
    variant: "body2"
  }, "Already have an account?", ' ', /*#__PURE__*/React.createElement(Link, {
    component: RouterLink,
    href: paths.auth.signIn,
    underline: "hover",
    variant: "subtitle2"
  }, "Sign in"))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/React.createElement(Stack, {
    spacing: 2
  }, /*#__PURE__*/React.createElement(Controller, {
    control: control,
    name: "firstName",
    render: ({
      field
    }) => /*#__PURE__*/React.createElement(FormControl, {
      error: Boolean(errors.firstName)
    }, /*#__PURE__*/React.createElement(InputLabel, null, "First name"), /*#__PURE__*/React.createElement(OutlinedInput, _extends({}, field, {
      label: "First name"
    })), errors.firstName ? /*#__PURE__*/React.createElement(FormHelperText, null, errors.firstName.message) : null)
  }), /*#__PURE__*/React.createElement(Controller, {
    control: control,
    name: "lastName",
    render: ({
      field
    }) => /*#__PURE__*/React.createElement(FormControl, {
      error: Boolean(errors.firstName)
    }, /*#__PURE__*/React.createElement(InputLabel, null, "Last name"), /*#__PURE__*/React.createElement(OutlinedInput, _extends({}, field, {
      label: "Last name"
    })), errors.firstName ? /*#__PURE__*/React.createElement(FormHelperText, null, errors.firstName.message) : null)
  }), /*#__PURE__*/React.createElement(Controller, {
    control: control,
    name: "email",
    render: ({
      field
    }) => /*#__PURE__*/React.createElement(FormControl, {
      error: Boolean(errors.email)
    }, /*#__PURE__*/React.createElement(InputLabel, null, "Email address"), /*#__PURE__*/React.createElement(OutlinedInput, _extends({}, field, {
      label: "Email address",
      type: "email"
    })), errors.email ? /*#__PURE__*/React.createElement(FormHelperText, null, errors.email.message) : null)
  }), /*#__PURE__*/React.createElement(Controller, {
    control: control,
    name: "password",
    render: ({
      field
    }) => /*#__PURE__*/React.createElement(FormControl, {
      error: Boolean(errors.password)
    }, /*#__PURE__*/React.createElement(InputLabel, null, "Password"), /*#__PURE__*/React.createElement(OutlinedInput, _extends({}, field, {
      label: "Password",
      type: "password"
    })), errors.password ? /*#__PURE__*/React.createElement(FormHelperText, null, errors.password.message) : null)
  }), /*#__PURE__*/React.createElement(Controller, {
    control: control,
    name: "terms",
    render: ({
      field
    }) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormControlLabel, {
      control: /*#__PURE__*/React.createElement(Checkbox, field),
      label: /*#__PURE__*/React.createElement(React.Fragment, null, "I have read the ", /*#__PURE__*/React.createElement(Link, null, "terms and conditions"))
    }), errors.terms ? /*#__PURE__*/React.createElement(FormHelperText, {
      error: true
    }, errors.terms.message) : null)
  }), errors.root ? /*#__PURE__*/React.createElement(Alert, {
    color: "error"
  }, errors.root.message) : null, /*#__PURE__*/React.createElement(Button, {
    disabled: isPending,
    type: "submit",
    variant: "contained"
  }, "Sign up"))), /*#__PURE__*/React.createElement(Alert, {
    color: "warning"
  }, "Created users are not persisted"));
}
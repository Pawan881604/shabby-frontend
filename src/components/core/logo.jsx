'use client';

function _extends() { 
  return _extends = Object.assign ? Object.assign.bind() : function (n) { 
    for (var e = 1; e < arguments.length; e++) { 
      var t = arguments[e]; 
      for (var r in t) {
        ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); 
      }
    } 
    return n; 
  }, 
  _extends.apply(null, arguments); 
}

import * as React from 'react';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';
import { NoSsr } from './no-ssr';

const HEIGHT = 60;
const WIDTH = 60;

export function Logo({ color = 'dark', emblem, height = HEIGHT, width = WIDTH }) {
  let url;
  if (emblem) {
    url = color === 'light' ? '/assets/logo-emblem.svg' : '/assets/logo-emblem--dark.svg';
  } else {
    url = color === 'light' ? '/assets/logo.svg' : '/assets/logo--dark.svg';
  }
  return (
    <Box
      alt="logo"
      component="img"
      height={height}
      src={url}
      width={width}
    />
  );
}

export function DynamicLogo({ colorDark = 'light', colorLight = 'dark', height = HEIGHT, width = WIDTH, ...props }) {
  const { colorScheme } = useColorScheme();
  const color = colorScheme === 'dark' ? colorDark : colorLight;
  return (
    <NoSsr
      fallback={<Box sx={{ height: `${height}px`, width: `${width}px` }} />}
    >
      <Logo
        color={color}
        height={height}
        width={width}
        {...props}
      />
    </NoSsr>
  );
}

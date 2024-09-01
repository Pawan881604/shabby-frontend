import React, { forwardRef } from 'react';
import Slide from '@mui/material/Slide';

// Define the custom Transition component using Slide
export const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

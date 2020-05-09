/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { CircularProgress, CircularProgressProps } from '@material-ui/core';

export const Loading = (props: CircularProgressProps) => <CircularProgress {...props} />;

export default Loading;

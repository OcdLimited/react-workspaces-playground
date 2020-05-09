/* eslint-disable @typescript-eslint/no-explicit-any */
/* istanbul ignore file */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

export default (storyFn: () => any) => <MemoryRouter>{storyFn()}</MemoryRouter>;

import React from 'react';
import { MemoryRouter } from 'react-router-dom';

export default storyFn => <MemoryRouter>{storyFn()}</MemoryRouter>;

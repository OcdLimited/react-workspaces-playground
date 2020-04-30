import { addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

addDecorator(storyFn => <MemoryRouter>{storyFn()}</MemoryRouter>);

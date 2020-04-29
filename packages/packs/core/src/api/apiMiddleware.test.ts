import { createApiMiddleware } from './apiMiddleware';
import { act } from 'react-dom/test-utils';
import axios from 'axios';

jest.mock('axios');

const middleware = createApiMiddleware();

const state = {
	config: {
		environment: {
			apis: {
				default: {
					url: 'url',
				},
			},
		},
	},
};

beforeEach(() => {
	(axios as jest.Mock).mockClear();
});

it('invalid request', async () => {
	const dispatch = jest.fn();
	const next = jest.fn();
	const onSuccess = jest.fn();

	const action = {
		type: 'invalid',
		payload: {
			url: '/api/abp/application-configuration',
			method: 'GET',
			onSuccess,
		},
	};

	(axios.request as jest.Mock).mockReturnValue({
		data: {},
	});

	await act(() =>
		middleware({
			dispatch,
			getState: () => state,
		})(next)(action),
	);

	expect(onSuccess).not.toHaveBeenCalled();
});

it('valid request', async () => {
	const dispatch = jest.fn();
	const next = jest.fn();
	const onSuccess = jest.fn();

	const action = {
		type: 'api/apiRequest',
		payload: {
			url: '/api/abp/application-configuration',
			method: 'POST',
			data: {},
			onSuccess,
		},
	};

	(axios.request as jest.Mock).mockReturnValue({
		data: {},
	});

	await act(() =>
		middleware({
			dispatch,
			getState: () => state,
		})(next)(action),
	);

	expect(onSuccess).toHaveBeenCalled();
});

it('failure', async () => {
	const dispatch = jest.fn();
	const next = jest.fn();
	const onFailure = jest.fn();

	const action = {
		type: 'api/apiRequest',
		payload: {
			url: '/api/abp/application-configuration',
			method: 'GET',
			onFailure,
		},
	};

	(axios.request as jest.Mock).mockImplementation(() => {
		throw new Error('');
	});

	await act(() =>
		middleware({
			dispatch,
			getState: () => state,
		})(next)(action),
	);

	expect(onFailure).toHaveBeenCalled();
});

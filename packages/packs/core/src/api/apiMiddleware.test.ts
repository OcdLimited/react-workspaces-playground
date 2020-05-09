import { act } from 'react-dom/test-utils';
import axios from 'axios';
import { createApiMiddleware } from './apiMiddleware';

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
		localization: {
			currentCulture: {
				cultureName: 'en',
			},
		},
		currentTenant: {
			isAvailable: true,
			id: 'id',
		},
	},
	token: {
		current: {
			access_token: 'asd',
			token_type: 'asd',
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
	const headers = {};

	const action = {
		type: 'api/apiRequest',
		payload: {
			url: '/api/abp/application-configuration',
			method: 'POST',
			data: {},
			onSuccess,
			successType: () => {},
			headers,
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
	expect(headers).toEqual({ __tenant: 'id', 'Accept-Language': 'en' });
});

it('valid request - empty', async () => {
	const dispatch = jest.fn();
	const next = jest.fn();
	const onSuccess = jest.fn();
	const headers = {};

	const action = {
		type: 'api/apiRequest',
		payload: {
			url: '/api/abp/application-configuration',
			method: 'POST',
			data: {},
			onSuccess,
			successType: () => {},
			headers,
		},
	};

	(axios.request as jest.Mock).mockReturnValue({
		data: {},
	});

	await act(() =>
		middleware({
			dispatch,
			getState: () => ({
				config: {
					environment: {
						apis: {
							default: {
								url: 'url',
							},
						},
					},
				},
			}),
		})(next)(action),
	);

	expect(onSuccess).toHaveBeenCalled();
	expect(headers).toEqual({});
});

it('valid secured request', async () => {
	const dispatch = jest.fn();
	const next = jest.fn();
	const onSuccess = jest.fn();
	const headers = {};

	const action = {
		type: 'api/apiRequest',
		payload: {
			url: '/api/abp/application-configuration',
			method: 'POST',
			data: {},
			onSuccess,
			secured: true,
			headers,
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
	expect(headers).toEqual({ __tenant: 'id', 'Accept-Language': 'en', Authorization: 'asd asd' });
});

it('valid secured request - not token', async () => {
	const dispatch = jest.fn();
	const next = jest.fn();
	const onSuccess = jest.fn();
	const headers = {};

	const action = {
		type: 'api/apiRequest',
		payload: {
			url: '/api/abp/application-configuration',
			method: 'POST',
			data: {},
			onSuccess,
			secured: true,
			headers,
		},
	};

	(axios.request as jest.Mock).mockReturnValue({
		data: {},
	});

	await act(() =>
		middleware({
			dispatch,
			getState: () => ({
				config: {
					environment: {
						apis: {
							default: {
								url: 'url',
							},
						},
					},
				},
				token: { current: {} },
			}),
		})(next)(action),
	);

	expect(onSuccess).toHaveBeenCalled();
	expect(headers).toEqual({});
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
			failureType: () => {},
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

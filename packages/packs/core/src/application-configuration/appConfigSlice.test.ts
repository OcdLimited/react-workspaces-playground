import reducer, {
	setConfig,
	selectConfigLoaded,
	selectApiUrl,
	receiveConfig,
	requestAppConfig,
	selectAuthSettings,
} from './appConfigSlice';

it('initialState', () => {
	expect(reducer(undefined, {})).toEqual({ loaded: false });
});

it('setConfig', () => {
	expect(reducer(undefined, setConfig({}))).toEqual({ loaded: true });
});

it('receiveConfig', () => {
	expect(
		reducer(
			undefined,
			receiveConfig({
				data: {
					test: {},
				},
			}),
		),
	).toEqual({ loaded: true, test: {} });
});

it('requestAppConfig.successType', () => {
	const {
		payload: { successType },
	} = requestAppConfig();

	expect(
		reducer(
			undefined,
			successType({
				data: {
					test: {},
				},
			}),
		),
	).toEqual({ loaded: true, test: {} });
});

it('selectConfigLoaded', () => {
	const state = reducer(undefined, setConfig({}));
	const result = selectConfigLoaded({
		config: state,
	});

	expect(result).toBeTruthy();
});

it('selectApiUrl', () => {
	const state = reducer(
		undefined,
		setConfig({
			environment: {
				apis: {
					default: {
						url: 'url',
					},
				},
			},
		}),
	);
	const result = selectApiUrl({
		config: state,
	});

	expect(result).toBeTruthy();
});

it('selectApiUrl', () => {
	const state = reducer(
		undefined,
		setConfig({
			environment: {
				oAuthConfig: {
					default: {
						url: 'url',
					},
				},
			},
		}),
	);
	const result = selectAuthSettings({
		config: state,
	});

	expect(result).toBeTruthy();
});

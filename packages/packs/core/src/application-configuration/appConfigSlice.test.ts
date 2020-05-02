import reducer, {
	setConfig,
	selectConfigLoaded,
	selectApiUrl,
	receiveConfig,
	requestAppConfig,
	selectAuthSettings,
	selectSettings,
	selectAppName,
	selectMultiTenancy,
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

it('selectAppName', () => {
	const state = reducer(
		undefined,
		setConfig({
			environment: {
				application: {
					name: 'test app',
				},
			},
		}),
	);
	const result = selectAppName({
		config: state,
	});

	expect(result).toEqual('test app');
});

it('selectMultiTenancy', () => {
	const state = reducer(
		undefined,
		setConfig({
			multiTenancy: {
				isEnabled: true,
			},
		}),
	);
	const result = selectMultiTenancy({
		config: state,
	});

	expect(result).toEqual(true);
});

describe('selectSettings', () => {
	var state = {};

	beforeEach(() => {
		state = reducer(
			undefined,
			setConfig({
				setting: {
					values: {
						'Abp.Account.IsSelfRegistrationEnabled': 'true',
						'Abp.Account.EnableLocalLogin': 'true',
					},
				},
			}),
		);
	});

	it('should get a multi value', () => {
		const [result] = selectSettings('Abp.Account.EnableLocalLogin')({
			config: state,
		});

		expect(result).toBe('true');
	});

	it('should get a single value', () => {
		const result = selectSettings(
			'Abp.Account.EnableLocalLogin',
			'Abp.Account.IsSelfRegistrationEnabled',
		)({
			config: state,
		});

		expect(result).toEqual(['true', 'true']);
	});

	it('not settings should work', () => {
		const result = selectSettings(
			'Abp.Account.EnableLocalLogin',
			'Abp.Account.IsSelfRegistrationEnabled',
		)({
			config: reducer(undefined, setConfig({})),
		});

		expect(result).toEqual([undefined, undefined]);
	});
});

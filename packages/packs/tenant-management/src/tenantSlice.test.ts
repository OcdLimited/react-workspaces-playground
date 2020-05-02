import reducer, {
	receiveTenant,
	setTenant,
	selectTenantLoaded,
	selectTenantLoading,
	selectTenantNeedsLoaded,
} from './tenantSlice';

it('initialState', () => {
	expect(reducer(undefined, {})).toEqual({ loading: 'none' });
});

it('setTenant', () => {
	expect(
		reducer(
			undefined,
			setTenant({
					test: {},
			}),
		),
	).toEqual({ loading: 'loaded', test: {} });
});


it('receiveTenant', () => {
	expect(
		reducer(
			undefined,
			receiveTenant({
					data: {test: {}},
			}),
		),
	).toEqual({ loading: 'loaded', test: {} });
});


it('selectTenantLoaded', () => {
	const state = reducer({ loading: 'loaded'}, {});
	const result = selectTenantLoaded({
		tenant: state,
	});

	expect(result).toBeTruthy();
});

it('selectTenantLoading', () => {
	const state = reducer({ loading: 'loading'}, {});
	const result = selectTenantLoading({
		tenant: state,
	});

	expect(result).toBeTruthy();
});


it('selectTenantNeedsLoaded', () => {
	const state = reducer({ loading: 'none'}, {});
	const result = selectTenantNeedsLoaded({
		tenant: state,
	});

	expect(result).toBeTruthy();
});

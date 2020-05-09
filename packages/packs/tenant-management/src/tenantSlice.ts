import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

type Tenant = {};

interface TenantState extends Tenant {
	loading: 'none' | 'loaded' | 'loading';
}

const initialState: TenantState = {
	loading: 'none',
};

const name = 'tenant';

const setTenantHelper: CaseReducer<TenantState, PayloadAction<Tenant>> = (state, action) => {
	return {
		...state,
		...action.payload,
		loading: 'loaded',
	};
};

export const tenantSlice = createSlice({
	name,
	initialState,
	reducers: {
		setTenant: setTenantHelper,
		receiveTenant: (state, { payload: { data: payload }, type }) => {
			return setTenantHelper(state, { type, payload });
		},
	},
});

export const { setTenant, receiveTenant } = tenantSlice.actions;

export type RootState = {
	tenant: TenantState;
};

export const selectTenantLoaded = (state: RootState) => state.tenant.loading === 'loaded';
export const selectTenantLoading = (state: RootState) => state.tenant.loading === 'loading';
export const selectTenantNeedsLoaded = (state: RootState) => state.tenant.loading === 'none';

export default tenantSlice.reducer;

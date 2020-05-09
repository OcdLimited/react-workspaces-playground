import { buildStore } from '@ocdlimited/abp.react.core';
import { environment } from '../../environments/environment';

export const store = buildStore(
	{},
	{
		config: {
			environment,
		},
	},
);

export default store;

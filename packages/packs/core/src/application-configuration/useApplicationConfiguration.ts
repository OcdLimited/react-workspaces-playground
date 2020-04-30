/* istanbul ignore file */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequest } from '../api/apiSlice';
import { AppConfigResponse } from '../models';
import { setConfig, selectConfigLoaded } from './appConfigSlice';

export function useAppConfig(next?: any): any {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(
			apiRequest({
				url: '/api/abp/application-configuration',
				method: 'GET',
				onSuccess: (data: AppConfigResponse) => {
					dispatch(setConfig(data));
					next && next();
				},
			}),
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const loaded = useSelector(selectConfigLoaded);

	return loaded;
}

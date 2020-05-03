/* istanbul ignore file */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buildSelectConfigLoaded, requestAppConfig } from './appConfigSlice';
import { AppConfigResponse } from '../models';

export function useAppConfig(next?: any): any {
	const dispatch = useDispatch();
	const configLoaded = useSelector(buildSelectConfigLoaded());

	useEffect(() => {
		!configLoaded &&
			dispatch(
				requestAppConfig(false, (data: AppConfigResponse) => {
					next && next(data);
				}),
			);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [configLoaded]);

	const loaded = useSelector(buildSelectConfigLoaded());

	return loaded;
}

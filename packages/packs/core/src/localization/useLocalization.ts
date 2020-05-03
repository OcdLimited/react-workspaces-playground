import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { buildSelectLocalization } from '../application-configuration/appConfigSlice';
import { reinit } from './i18next';

export function useLocalization() {
	const localization = useSelector(buildSelectLocalization());

	useEffect(() => {
		if (!localization) {
			return;
		}
		const { values, currentCulture } = localization;

		reinit({
			resources: {
				[currentCulture.cultureName]: values,
			},
			lng: currentCulture.cultureName,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [localization?.currentCulture]);
}

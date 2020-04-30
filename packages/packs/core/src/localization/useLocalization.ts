import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectLocalization } from '../application-configuration/appConfigSlice';
import { reinit } from './i18next';

export function useLocalization() {
	const localization = useSelector(selectLocalization);

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
	}, [localization]);
}

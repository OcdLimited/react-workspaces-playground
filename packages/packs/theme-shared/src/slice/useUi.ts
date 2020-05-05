import { useSelector, useDispatch } from 'react-redux';
import { useReducer } from '@ocdlimited/abp.react.redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeOptions, Theme as MuiTheme } from '@material-ui/core';
import { useMountEffect } from '@ocdlimited/abp.react.core';

import reducer, { buildSelectCurrentTheme, setUi, Theme } from './uiSlice';
import * as themes from '../themes';

interface UseThemeResult extends Array<any> {
	currentTheme: MuiTheme;
}

export interface UseThemeOptions {
	onSelectInitialTheme?(): any;
	onSelectAvailableThemes?(themes: Theme[]): Theme[];
}

export function useTheme(options?: UseThemeOptions): UseThemeResult {
	const finalOptions = {
		...{
			onSelectInitialTheme: (_: Theme[]) => themes.dark,
			onSelectAvailableThemes: (_: Theme[]) => _,
		},
		...(options || {}),
	};

	useReducer({
		key: 'ui',
		reducer,
	});

	const currentThemeName = useSelector(buildSelectCurrentTheme());
	const dispatch = useDispatch();

	const themesAsArray = themes.all.map(x => (x as unknown) as Theme);

	const availableThemes = finalOptions.onSelectAvailableThemes(themesAsArray);
	const initialTheme = finalOptions.onSelectInitialTheme(availableThemes);

	/* istanbul ignore next */
	if (!initialTheme) {
		throw new Error('No initial theme returned');
	}

	useMountEffect(() => {
		dispatch(
			setUi({
				currentTheme: initialTheme.themeName,
				availableThemes: availableThemes.map(x => x.themeName),
			}),
		);
	});

	const muiTheme = createMuiTheme(themes.all.find(t => t.themeName === currentThemeName) as ThemeOptions);
	const result = [muiTheme] as UseThemeResult;
	result.currentTheme = muiTheme;

	return result;
}

export function useBasicTheme(options?: UseThemeOptions) {
	return useTheme(options);
}

import React from 'react';
import {
	LanguageSwitcher,
	LanguageSwitcherProps,
	ThemeSwitcher,
	ThemeSwitcherProps,
} from '@ocdlimited/abp.react.theme.shared';

interface LoginTopBarActionsProps extends LanguageSwitcherProps, ThemeSwitcherProps {}

export function LoginTopBarActions({
	onSelectLanguage,
	languages,
	currentCulture,
	themes,
	currentTheme,
	onSelectTheme,
}: LoginTopBarActionsProps) {
	return (
		<>
			<LanguageSwitcher
				onSelectLanguage={onSelectLanguage}
				languages={languages}
				currentCulture={currentCulture}
			/>
			<ThemeSwitcher themes={themes} currentTheme={currentTheme} onSelectTheme={onSelectTheme} />
		</>
	);
}

export default LoginTopBarActions;

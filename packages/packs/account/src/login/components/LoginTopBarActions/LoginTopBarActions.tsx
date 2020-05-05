import React from 'react';
import { LanguageSwitcher, LanguageSwitcherProps, ThemeSwitcher } from '@ocdlimited/abp.react.theme.shared';
import { ThemeSwitcherProps } from '@ocdlimited/abp.react.theme.shared/src/components/ThemeSwitcher/ThemeSwitcher';

interface LoginTopBarActionsProps extends LanguageSwitcherProps, ThemeSwitcherProps {}

export function LoginTopBarActions({
	onSelectLanguage: onLanguageChange,
	languages,
	currentCulture,
	themes,
	currentTheme,
	onSelectTheme,
}: LoginTopBarActionsProps) {
	return (
		<React.Fragment>
			<LanguageSwitcher
				onSelectLanguage={onLanguageChange}
				languages={languages}
				currentCulture={currentCulture}
			/>
			<ThemeSwitcher themes={themes} currentTheme={currentTheme} onSelectTheme={onSelectTheme} />
		</React.Fragment>
	);
}

export default LoginTopBarActions;

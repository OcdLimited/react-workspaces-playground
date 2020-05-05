import React from 'react';
import { LanguageSwitcher, LanguageSwitcherProps, SettingsCog } from '@ocdlimited/abp.react.theme.shared';

interface LoginTopBarActionsProps extends LanguageSwitcherProps {}

export function LoginTopBarActions({ onLanguageChange, languages, currentCulture }: LoginTopBarActionsProps) {
	return (
		<React.Fragment>
			<LanguageSwitcher
				onLanguageChange={onLanguageChange}
				languages={languages}
				currentCulture={currentCulture}
			/>
			<SettingsCog />
		</React.Fragment>
	);
}

export default LoginTopBarActions;

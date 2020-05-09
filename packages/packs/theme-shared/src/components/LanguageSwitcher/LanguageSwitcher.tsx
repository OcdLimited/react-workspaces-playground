/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { IconButton, Badge, Menu, MenuItem, ListItemText } from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { usePopupState } from 'material-ui-popup-state/hooks';
import { Language } from '@ocdlimited/abp.react.core/src/models';

export interface LanguageSwitcherProps {
	onSelectLanguage: (culture: Language) => void;
	languages: Language[];
	currentCulture: Language;
}

export function LanguageSwitcher({
	onSelectLanguage: onLanguageChange,
	languages,
	currentCulture,
}: LanguageSwitcherProps) {
	const popupState = usePopupState({ popupId: 'language', variant: 'popover' });

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function handleLanguageClick(e: any) {
		const cultureName = e.currentTarget.dataset?.language;
		const newCurrentCulture = languages.find(x => x.cultureName === cultureName);

		if (newCurrentCulture) {
			onLanguageChange(newCurrentCulture);
		}
	}

	useEffect(() => {
		popupState.close();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentCulture]);

	return (
		<>
			<IconButton color="inherit" {...bindTrigger(popupState)} data-testid="open-language">
				<Badge color="secondary">
					<LanguageIcon />
				</Badge>
			</IconButton>
			<Menu
				{...bindMenu(popupState)}
				getContentAnchorEl={null}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				{languages.map(language => (
					<MenuItem
						key={language.cultureName}
						data-language={language.cultureName}
						onClick={handleLanguageClick}
						selected={currentCulture.cultureName === language.cultureName}
					>
						<ListItemText primary={language.displayName} />
					</MenuItem>
				))}
			</Menu>
		</>
	);
}

export default LanguageSwitcher;

import React, { useEffect } from 'react';
import { IconButton, Badge, Menu, MenuItem, ListItemText } from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { usePopupState } from 'material-ui-popup-state/hooks';

export interface LanguageSwitcherProps {
	onLanguageChange: (culture: any) => void;
	languages: any[];
	currentCulture: any;
}

export function LanguageSwitcher({ onLanguageChange, languages, currentCulture }: LanguageSwitcherProps) {
	const popupState = usePopupState({ popupId: 'demoMenu', variant: 'popover' });

	function handleLanguageClick(e: any) {
		const cultureName = e.currentTarget.dataset?.language;
		const currentCulture = languages.find(x => x.cultureName === cultureName);

		onLanguageChange(currentCulture);
	}

	useEffect(() => {
		popupState.close();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentCulture]);

	return (
		<React.Fragment>
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
		</React.Fragment>
	);
}

export default LanguageSwitcher;

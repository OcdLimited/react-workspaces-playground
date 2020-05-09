import React, { useEffect, SyntheticEvent } from 'react';
import { IconButton, Badge, MenuItem } from '@material-ui/core';
import PaletteIcon from '@material-ui/icons/Palette';
import { CascadingMenu } from '../CascadingMenu';

export interface ThemeSwitcherProps {
	themes: string[];
	currentTheme: string;
	onSelectTheme(theme: string): void;
}

export function ThemeSwitcher({ themes, currentTheme, onSelectTheme }: ThemeSwitcherProps) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [open, setOpen] = React.useState(false);

	const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		/* istanbul ignore if */
		if (open) {
			setOpen(false);
		} else {
			setAnchorEl(event.currentTarget);
			setOpen(true);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	function handleClick<T extends HTMLElement>(e: SyntheticEvent<T>) {
		const theme = themes.find(x => x === e.currentTarget.dataset.theme);

		if (!theme || theme === currentTheme) return;

		onSelectTheme(theme);
	}

	useEffect(() => {
		handleClose();
	}, [currentTheme]);

	return (
		<>
			<IconButton color="inherit" onClick={handleOpen} data-testid="open-menu">
				<Badge color="secondary">
					<PaletteIcon />
				</Badge>
			</IconButton>
			<CascadingMenu id="themeMenu" open={open} anchorEl={anchorEl} onClose={handleClose}>
				{themes.map(themeName => (
					<MenuItem
						key={themeName}
						data-theme={themeName}
						onClick={handleClick}
						selected={currentTheme === themeName}
					>
						{themeName}
					</MenuItem>
				))}
			</CascadingMenu>
		</>
	);
}

export default ThemeSwitcher;

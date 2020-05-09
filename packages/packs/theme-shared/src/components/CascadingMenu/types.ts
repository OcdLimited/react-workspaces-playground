import React from 'react';
import { PopupState } from 'material-ui-popup-state/hooks';
import { MenuProps } from '@material-ui/core/Menu';

export const ParentPopupState = React.createContext<PopupState | null>(null);

export interface CascadingHoverMenusProps extends MenuProps {
	menu?: MenuItemOptions[];
	id: string;
	children?: React.ReactNode;
	component?: React.ComponentType | React.ReactNode;
	open: boolean;
}

export interface MenuItemOptions {
	key: string;
	text: string | React.ReactNode | Element;
	onClick?(e: React.SyntheticEvent, currentPopupState: PopupState): void;
	children?: MenuItemOptions[];
}

export interface Popupbag {
	popupState: PopupState;
}

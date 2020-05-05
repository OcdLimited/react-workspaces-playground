import { PopupState } from 'material-ui-popup-state/hooks';
import { MenuProps } from '@material-ui/core/Menu';

export interface CascadingHoverMenusProps extends MenuProps {
	menu?: MenuItemOptions[];
	id: string;
	children?: any;
	component?: React.ComponentType | React.ReactNode;
	open: boolean;
}

export interface MenuItemOptions {
	key?: string;
	text: string | React.ReactNode | Element;
	onClick?(e: React.SyntheticEvent, currentPopupState: PopupState, parentPopupState?: PopupState): void;
	children?: MenuItemOptions[];
}

export interface Popupbag {
	popupState: PopupState;
}

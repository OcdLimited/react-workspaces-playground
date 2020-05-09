/* eslint-disable @typescript-eslint/indent */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { SyntheticEvent, useEffect } from 'react';
import Menu from 'material-ui-popup-state/HoverMenu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import { usePopupState, bindMenu, PopupState } from 'material-ui-popup-state/hooks';

import { Submenu } from './Submenu';
import { CascadingHoverMenusProps, MenuItemOptions, Popupbag } from './types';
import { isEmptyChildren, isFunction } from './utils';

function renderForMenu(menu: MenuItemOptions[], popupState: PopupState) {
	return menu.map((item: MenuItemOptions) => {
		if (!item.children) {
			return (
				<MenuItem
					onClick={e => {
						return item.onClick && item.onClick(e, popupState);
					}}
					key={`${item.key || item.text}`}
				>
					{item.text}
				</MenuItem>
			);
		}

		return (
			<Submenu
				id={`${item.key || item.text}popid`}
				key={`${item.key || item.text}submenu`}
				title={item.text}
				items={item.children}
				onClick={(e: React.SyntheticEvent<Element, Event>) => {
					return item.onClick && item.onClick(e, popupState);
				}}
			/>
		);
	});
}

export const CascadingMenu = ({ menu, id: popupId, children, open, anchorEl, onClose }: CascadingHoverMenusProps) => {
	const popupState = usePopupState({ popupId, variant: 'popover' });

	const popupbag = {
		popupState,
	};

	useEffect(() => {
		if (open !== undefined) {
			popupState.setOpen(!!open);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open]);

	function handleClickAway(e: React.MouseEvent<Document>) {
		popupState.close();
		if (onClose) {
			onClose(e, 'backdropClick');
		}
	}

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<Menu
				{...bindMenu(popupState)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				transformOrigin={{ vertical: 'top', horizontal: 'left' }}
				getContentAnchorEl={null}
				anchorEl={anchorEl}
			>
				{menu
					? renderForMenu(menu, popupState)
					: children // children come last, always called
					? isFunction(children)
						? (children as (bag: Popupbag) => React.ReactNode)(popupbag as Popupbag)
						: !isEmptyChildren(children)
						? children
						: null
					: null}
			</Menu>
		</ClickAwayListener>
	);
};

export default CascadingMenu;

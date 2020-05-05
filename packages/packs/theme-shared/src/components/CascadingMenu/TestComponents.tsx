/* istanbul ignore file */
import React from 'react';
import { MenuItem, Button, Grid } from '@material-ui/core';
import { PopupState } from 'material-ui-popup-state/hooks';

import { CascadingMenu } from './CascadingMenu';
import { Submenu } from './Submenu';

export const MenuProp = ({ menu }: any) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [open, setOpen] = React.useState(false);

	const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
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

	return (
		<Grid container alignItems="flex-start" justify="flex-end" direction="row">
			<Grid item xs={3}>
				<Button variant="contained" onClick={handleOpen}>
					Click to open Menu
				</Button>
				<CascadingMenu
					id="demo"
					menu={menu}
					open={Boolean(anchorEl)}
					anchorEl={anchorEl}
					onClose={handleClose}
				/>
			</Grid>
		</Grid>
	);
};

export const Children = ({ action }: any) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [open, setOpen] = React.useState(false);

	const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
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

	const handleClick = (name: string) => {
		const a = action(name);
		const onClicked = (...args: any) => {
			handleClose();
			a(...args);
		};

		return onClicked;
	};

	return (
		<React.Fragment>
			<Grid container alignItems="flex-start" justify="flex-end" direction="row">
				<Grid item xs={3}>
					<Button variant="contained" onClick={handleOpen}>
						Click to open Menu
					</Button>
					<CascadingMenu id="demo2" open={open} anchorEl={anchorEl} onClose={handleClose}>
						<MenuItem onClick={handleClick('Tea')}>Tea</MenuItem>
						<MenuItem onClick={handleClick('Cake')}>Cake</MenuItem>
						<MenuItem onClick={handleClick('Death')}>Death</MenuItem>
						<Submenu id="moreChoicesMenu" title="More Choices">
							<MenuItem onClick={handleClick('Cheesecake')}>Cheesecake</MenuItem>
							<MenuItem onClick={handleClick('Cheesedeath')}>Cheesedeath</MenuItem>
							<Submenu id="evenMoreChoicesMenu" title="Even More Choices">
								<MenuItem onClick={handleClick('Cake (the band)')}>Cake (the band)</MenuItem>
								<MenuItem onClick={handleClick('Death Metal')}>Death Metal</MenuItem>
							</Submenu>
							<Submenu id="moreBenignChoices" title="More Benign Choices">
								<MenuItem onClick={handleClick('Salad')}>Salad</MenuItem>
								<MenuItem onClick={handleClick('Lobotomy')}>Lobotomy</MenuItem>
							</Submenu>
						</Submenu>
					</CascadingMenu>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

export const ChildrenFunction = ({ action }: any) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [open, setOpen] = React.useState(false);

	const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
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

	const handleClick = (name: string, state: PopupState) => {
		const a = action(name);
		const onClicked = (...args: any) => {
			handleClose();
			a(...args);
			state.close();
		};

		return onClicked;
	};

	return (
		<React.Fragment>
			<Grid container alignItems="flex-start" justify="flex-end" direction="row">
				<Grid item xs={3}>
					<Button variant="contained" onClick={handleOpen}>
						Click to open Menu
					</Button>
					<CascadingMenu id="demo2" open={open} anchorEl={anchorEl} onClose={handleClose}>
						{({ popupState }: { popupState: PopupState }) => (
							<div>
								<MenuItem onClick={handleClick('Tea', popupState)}>Tea</MenuItem>
								<MenuItem onClick={handleClick('Cake', popupState)}>Cake</MenuItem>
								<MenuItem onClick={handleClick('Death', popupState)}>Death</MenuItem>
								<Submenu id="moreChoicesMenu" title="More Choices">
									<MenuItem onClick={handleClick('Cheesecake', popupState)}>Cheesecake</MenuItem>
									<MenuItem onClick={handleClick('Cheesedeath', popupState)}>Cheesedeath</MenuItem>
									<Submenu id="evenMoreChoicesMenu" title="Even More Choices">
										<MenuItem onClick={handleClick('Cake (the band)', popupState)}>
											Cake (the band)
										</MenuItem>
										<MenuItem onClick={handleClick('Death Metal', popupState)}>
											Death Metal
										</MenuItem>
									</Submenu>
									<Submenu id="moreBenignChoices" title="More Benign Choices">
										<MenuItem onClick={handleClick('Salad', popupState)}>Salad</MenuItem>
										<MenuItem onClick={handleClick('Lobotomy', popupState)}>Lobotomy</MenuItem>
									</Submenu>
								</Submenu>
							</div>
						)}
					</CascadingMenu>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

export const Component = ({ action }: any) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [open, setOpen] = React.useState(false);

	const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
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

	const handleClick = (name: string) => {
		const a = action(name);
		const onClicked = (...args: any) => {
			handleClose();
			a(...args);
		};

		return onClicked;
	};

	const Test = () => (
		<div>
			<MenuItem onClick={handleClick('Tea')}>Tea</MenuItem>
			<MenuItem onClick={handleClick('Cake')}>Cake</MenuItem>
			<MenuItem onClick={handleClick('Death')}>Death</MenuItem>
			<Submenu id="moreChoicesMenu" title="More Choices">
				<MenuItem onClick={handleClick('Cheesecake')}>Cheesecake</MenuItem>
				<MenuItem onClick={handleClick('Cheesedeath')}>Cheesedeath</MenuItem>
				<Submenu id="evenMoreChoicesMenu" title="Even More Choices">
					<MenuItem onClick={handleClick('Cake (the band)')}>Cake (the band)</MenuItem>
					<MenuItem onClick={handleClick('Death Metal')}>Death Metal</MenuItem>
				</Submenu>
				<Submenu id="moreBenignChoices" title="More Benign Choices">
					<MenuItem onClick={handleClick('Salad')}>Salad</MenuItem>
					<MenuItem onClick={handleClick('Lobotomy')}>Lobotomy</MenuItem>
				</Submenu>
			</Submenu>
		</div>
	);

	return (
		<React.Fragment>
			<Grid container alignItems="flex-start" justify="flex-end" direction="row">
				<Grid item xs={3}>
					<Button variant="contained" onClick={handleOpen}>
						Click to open Menu
					</Button>
					<CascadingMenu
						id="demo2"
						open={open}
						anchorEl={anchorEl}
						onClose={handleClose}
						component={Test}
					></CascadingMenu>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

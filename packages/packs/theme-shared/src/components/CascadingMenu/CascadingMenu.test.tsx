import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { MenuProp, Children, ChildrenFunction, Component } from './TestComponents';
import CascadingMenu from './CascadingMenu';

const action = jest.fn();

beforeEach(() => {
	action.mockClear();
});

it('should render with a menu prop', () => {
	const menu = [
		{
			text: 'Tea',
			onClick: () => action('tea clicked'),
		},
		{
			text: (
				<React.Fragment>
					<ListItemIcon>
						<InboxIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Inbox" />
				</React.Fragment>
			),
			onClick: () => action('inbox clicked'),
		},
		{
			text: 'Cake',
			onClick: () => action('Cake clicked'),
		},
		{
			text: 'Death',
			onClick: () => action('Death clicked'),
		},
		{
			text: 'More Choices',
			onClick: () => action('More Choices'),
			children: [
				{
					text: 'Cheesecake',
					onClick: () => action('Cheesecake clicked'),
				},
				{
					text: 'Cheesedeath',
					onClick: () => action('Cheesedeath clicked'),
					children: [
						{
							text: 'Even More Choices',
							onClick: () => action('Even More Choices clicked'),
							children: [
								{
									text: 'Cake (the band)',
									onClick: () => action('Cake (the band) clicked'),
								},
								{
									text: 'Death Metal',
									onClick: () => action('Death Metal clicked'),
								},
							],
						},
						{
							text: 'More Benign Choices clicked',
							onClick: () => action('More Benign Choices clicked'),
							children: [
								{
									text: 'Salad',
									onClick: () => action('Salad clicked'),
								},
								{
									text: 'Lobotomy',
									onClick: () => action('Lobotomy clicked'),
								},
							],
						},
					],
				},
			],
		},
	];

	runTest(<MenuProp menu={menu} action={action} />);

	expect(action).toBeCalledTimes(3);
});

const runTest = (component: any) => {
	const { getByText, container } = render(component);

	const openButton = getByText(/Click to open Menu/i);

	expect(openButton).toBeInTheDocument();

	act(() => {
		fireEvent.click(openButton);
	});

	const clickMenuOption = getByText(/Death/i);

	expect(clickMenuOption).toBeInTheDocument();

	act(() => {
		fireEvent.click(clickMenuOption);
	});

	const hoverMenuOption = getByText(/More Choices/i);

	expect(hoverMenuOption).toBeInTheDocument();

	act(() => {
		fireEvent.mouseOver(hoverMenuOption);
		fireEvent.click(hoverMenuOption);
	});

	const subMenuOption = getByText(/Cheesecake/i);

	act(() => {
		fireEvent.click(subMenuOption);
		fireEvent.click(container);
	});
};

it('should render with children', () => {
	runTest(<Children action={() => action} />);
	expect(action).toBeCalled();
});

it('should render with function', () => {
	runTest(<ChildrenFunction action={() => action} />);
	expect(action).toBeCalled();
});

it('should render with Component', () => {
	runTest(<Component action={() => action} />);
	expect(action).toBeCalled();
});

it('render empty', () => {
	render(<CascadingMenu action={() => action} />);
});

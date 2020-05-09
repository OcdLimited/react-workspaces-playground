import React from 'react';
import { action } from '@storybook/addon-actions';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import { MenuProp, Children as ChildrenProp, ChildrenFunction, Component as ComponentProp } from './TestComponents';

const menu = [
	{
		text: 'Tea',
		onClick: action('tea clicked'),
	},
	{
		text: (
			<>
				<ListItemIcon>
					<InboxIcon fontSize="small" />
				</ListItemIcon>
				<ListItemText primary="Inbox" />
			</>
		),
		onClick: action('inbox clicked'),
	},
	{
		text: 'Cake',
		onClick: action('Cake clicked'),
	},
	{
		text: 'Death',
		onClick: action('Death clicked'),
	},
	{
		text: 'More Choices',
		onClick: action('More Choices'),
		children: [
			{
				text: 'Cheesecake',
				onClick: action('Cheesecake clicked'),
			},
			{
				text: 'Cheesedeath',
				onClick: action('Cheesedeath clicked'),
				children: [
					{
						text: 'Even More Choices',
						onClick: action('Even More Choices clicked'),
						children: [
							{
								text: 'Cake (the band)',
								onClick: action('Cake (the band) clicked'),
							},
							{
								text: 'Death Metal',
								onClick: action('Death Metal clicked'),
							},
						],
					},
					{
						text: 'More Benign Choices clicked',
						onClick: action('More Benign Choices clicked'),
						children: [
							{
								text: 'Salad',
								onClick: action('Salad clicked'),
							},
							{
								text: 'Lobotomy',
								onClick: action('Lobotomy clicked'),
							},
						],
					},
				],
			},
		],
	},
];

export default {
	title: 'Shared Theme/Components/CascadingHoverMenus',
};

export const MenuFromProps = () => <MenuProp menu={menu} />;
export const Children = () => <ChildrenProp action={action} />;
export const FunctionChiild = () => <ChildrenFunction action={action} />;
export const Component = () => <ComponentProp action={action} />;

export {} from './TestComponents';

import React from 'react';
import { action } from '@storybook/addon-actions';
import { LoginTopBarActions } from './LoginTopBarActions';

const languages = [
	{
		cultureName: 'cs',
		uiCultureName: 'cs',
		displayName: 'Čeština',
		flagIcon: null,
	},
	{
		cultureName: 'en',
		uiCultureName: 'en',
		displayName: 'English',
		flagIcon: null,
	},
	{
		cultureName: 'pt-BR',
		uiCultureName: 'pt-BR',
		displayName: 'Português',
		flagIcon: null,
	},
	{
		cultureName: 'ru',
		uiCultureName: 'ru',
		displayName: 'Русский',
		flagIcon: null,
	},
	{
		cultureName: 'tr',
		uiCultureName: 'tr',
		displayName: 'Türkçe',
		flagIcon: null,
	},
	{
		cultureName: 'zh-Hans',
		uiCultureName: 'zh-Hans',
		displayName: '简体中文',
		flagIcon: null,
	},
	{
		cultureName: 'zh-Hant',
		uiCultureName: 'zh-Hant',
		displayName: '繁體中文',
		flagIcon: null,
	},
];

const currentCulture = {
	displayName: 'English',
	englishName: 'English',
	threeLetterIsoLanguageName: 'eng',
	twoLetterIsoLanguageName: 'en',
	isRightToLeft: false,
	cultureName: 'en',
	name: 'en',
	nativeName: 'English',
	dateTimeFormat: {
		calendarAlgorithmType: 'SolarCalendar',
		dateTimeFormatLong: 'dddd, MMMM d, yyyy',
		shortDatePattern: 'M/d/yyyy',
		fullDateTimePattern: 'dddd, MMMM d, yyyy h:mm:ss tt',
		dateSeparator: '/',
		shortTimePattern: 'h:mm tt',
		longTimePattern: 'h:mm:ss tt',
	},
};

export default {
	title: 'account/Login/Components/LoginTopBarActions',
};

export const Default = () => (
	<LoginTopBarActions
		onLanguageChange={action('onLanguageChange')}
		languages={languages}
		currentCulture={currentCulture}
	/>
);

Default.story = {
	name: 'Default',
};

import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { LanguageSwitcher } from './LanguageSwitcher';

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

it('should render', () => {
	const onLanguageChange = jest.fn();

	const { getByText, getByTestId } = render(
		<LanguageSwitcher
			onLanguageChange={onLanguageChange}
			languages={languages}
			currentCulture={{
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
			}}
		/>,
	);

	act(() => {
		fireEvent.click(getByTestId('open-language'));
	});

	expect(getByText(/Português/i)).toBeInTheDocument();

	act(() => {
		fireEvent.click(getByText(/Português/i));
	});

	expect(onLanguageChange).toBeCalled();
});

import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { LanguageSwitcher } from './LanguageSwitcher';
import { languages, currentCulture } from './testData';

export default {
	title: 'Shared Theme/Components/LanguageSwitcher',
};

export const Default = () => {
	const [culture, setCulture] = useState(currentCulture);

	return (
		<LanguageSwitcher
			onLanguageChange={c => {
				action('onLanguageChange')(c);
				setCulture(c);
			}}
			languages={languages}
			currentCulture={culture}
		/>
	);
};

Default.story = {
	name: 'Default',
};

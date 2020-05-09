declare module 'addon-redux/enhancer' {
	export function withReduxEnhancer(next: StoreCreator): StoreCreator;
	export = withReduxEnhancer;
}

declare module 'addon-redux/withRedux' {
	import { AddonStore } from '@storybook/react';

	export function withRedux(store: AddonStore);
	export = withRedux;
}

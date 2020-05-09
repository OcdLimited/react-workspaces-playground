import reducer, { setUi, setCurrentTheme, buildSelectCurrentTheme } from './uiSlice';

it('initialState', () => {
	expect(reducer(undefined, {})).toEqual({ currentTheme: 'empty', availableThemes: [] });
});

it('setUi', () => {
	expect(
		reducer(
			undefined,
			setUi({
				test: {},
			}),
		),
	).toEqual({ test: {}, currentTheme: 'empty', availableThemes: [] });
});

it('setCurrentTheme', () => {
	expect(reducer(undefined, setCurrentTheme('test'))).toEqual({
		currentTheme: 'test',
		availableThemes: [],
	});
});

it('buildSelectCurrentUi', () => {
	const state = reducer({ currentTheme: 'test' }, {});
	const result = buildSelectCurrentTheme()({
		ui: state,
	});

	expect(result).toEqual('test');
});

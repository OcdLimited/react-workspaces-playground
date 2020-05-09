import reducer, {
	receive{{properCase name}},
	set{{properCase name}},
	select{{properCase name}}Loaded,
	select{{properCase name}}Loading,
	select{{properCase name}}NeedsLoaded,
} from './{{camelCase name}}Slice';

it('initialState', () => {
	expect(reducer(undefined, {})).toEqual({ loading: 'none' });
});

it('set{{properCase name}}', () => {
	expect(
		reducer(
			undefined,
			set{{properCase name}}({
					test: {},
			}),
		),
	).toEqual({ loading: 'loaded', test: {} });
});


it('receive{{properCase name}}', () => {
	expect(
		reducer(
			undefined,
			receive{{properCase name}}({
					data: {test: {}},
			}),
		),
	).toEqual({ loading: 'loaded', test: {} });
});


it('select{{properCase name}}Loaded', () => {
	const state = reducer({ loading: 'loaded'}, {});
	const result = select{{properCase name}}Loaded({
		{{camelCase name}}: state,
	});

	expect(result).toBeTruthy();
});

it('select{{properCase name}}Loading', () => {
	const state = reducer({ loading: 'loading'}, {});
	const result = select{{properCase name}}Loading({
		{{camelCase name}}: state,
	});

	expect(result).toBeTruthy();
});


it('select{{properCase name}}NeedsLoaded', () => {
	const state = reducer({ loading: 'none'}, {});
	const result = select{{properCase name}}NeedsLoaded({
		{{camelCase name}}: state,
	});

	expect(result).toBeTruthy();
});

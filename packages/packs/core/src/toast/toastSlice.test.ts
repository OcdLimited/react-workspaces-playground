import reducer, { enqueue, remove, close } from './toastSlice';

it('initialState', () => {
	expect(reducer(undefined, {})).toEqual({ notifications: [] });
});

it('enqueue', () => {
	expect(reducer(undefined, enqueue({}))).toEqual({ notifications: [{}] });
});

it('close', () => {
	const msg = {
		key: 'test',
	};

	let state = reducer(undefined, enqueue(msg));
	state = reducer(state, enqueue({ key: 'key2' }));
	state = reducer(state, close(msg));

	expect(state).toEqual({
		notifications: [
			{
				...msg,
				dismissed: true,
			},
			{ key: 'key2' },
		],
	});
});

it('remove', () => {
	const msg = {
		key: 'test',
	};

	let state = reducer(undefined, enqueue(msg));
	state = reducer(state, enqueue({ key: 'key2' }));
	state = reducer(state, remove(msg));

	expect(state).toEqual({ notifications: [{ key: 'key2' }] });
});

it('remove all', () => {
	const msg = {
		key: 'test',
	};

	let state = reducer(undefined, enqueue(msg));
	state = reducer(state, enqueue({ key: 'key2' }));
	state = reducer(
		state,
		remove({
			...msg,
			all: true,
		}),
	);

	expect(state).toEqual({ notifications: [] });
});

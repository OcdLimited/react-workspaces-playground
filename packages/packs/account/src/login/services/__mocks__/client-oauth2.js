export const mockPlaySoundFile = jest.fn();
const mock = jest.fn().mockImplementation(() => {
	return {
		owner: {
			getToken: username => {
				if (username === 'throw') {
					throw new Error();
				}
				mockPlaySoundFile();
			},
		},
	};
});

export default mock;

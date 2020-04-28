import { AuthService } from './authService';

it('should work', async () => {
	var auth = new AuthService({
		clientId: '',
		clientSecret: '',
		accessTokenUri: '',
		authorizationUri: '',
		redirectUri: '',
		scopes: ['scope'],
	});

	await auth.login('username', 'password');
});

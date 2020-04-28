import ClientOAuth2 from 'client-oauth2';

interface LoginResult {
	success: boolean;
	accessToken?: any;
	error?: string;
	body?: any;
}

export class AuthService {
	options: ClientOAuth2.Options;

	constructor(options: ClientOAuth2.Options) {
		this.options = options;
	}

	async login(username: string, password: string, options: ClientOAuth2.Options = {}): Promise<LoginResult> {
		var authClient = new ClientOAuth2({
			...this.options,
			...options,
		});

		try {
			const accessToken = await authClient.owner.getToken(username, password, {
				// TODO: Tenant header
			});

			return {
				success: true,
				accessToken,
			};
		} catch (error) {
			return {
				success: false,
				error: error.message,
				body: error.body,
			};
		}
	}
}

export default AuthService;

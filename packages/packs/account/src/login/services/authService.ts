import ClientOAuth2 from 'client-oauth2';

interface LoginResult {
	success: boolean;
	accessToken?: any;
	error?: string;
	body?: any;
}

export interface AuthOptions extends ClientOAuth2.Options {}

export class AuthService {
	options: AuthOptions;
	authClient: ClientOAuth2;

	constructor(options: AuthOptions) {
		this.options = options;
		this.authClient = new ClientOAuth2({
			...this.options,
		});
	}

	async login(username: string, password: string): Promise<LoginResult> {
		try {
			const accessToken = await this.authClient.owner.getToken(username, password, {
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

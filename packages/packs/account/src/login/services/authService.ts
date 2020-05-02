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

	async login(username: string, password: string, tenantId?: string): Promise<LoginResult> {
		try {
			const headers: any = {};

			if (tenantId) {
				headers.__tenant = tenantId;
			}

			const accessToken = await this.authClient.owner.getToken(username, password, {
				headers,
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

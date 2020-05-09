import ClientOAuth2, { Token } from 'client-oauth2';

interface LoginResult {
	success: boolean;
	accessToken?: Token;
	error?: string;
	body?: unknown;
}

export type AuthOptions = ClientOAuth2.Options;

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
			const headers: { [key: string]: string } = {};

			if (tenantId) {
				// eslint-disable-next-line no-underscore-dangle
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

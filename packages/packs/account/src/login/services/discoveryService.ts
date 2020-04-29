import axios from 'axios';
import { AuthOptions } from './authService';

interface LoginResult {
	success: boolean;
	accessToken?: any;
	error?: string;
	body?: any;
}

interface Settings {
	scopes: string[];
	issuer: string;
	clientId: string;
	clientSecret: string;
}

export class DiscoveryService {
	options: Settings;
	API_PATH: string = '/.well-known/openid-configuration';

	constructor(options: Settings) {
		this.options = options;
	}

	async getDiscovery(): Promise<AuthOptions> {
		const response = await axios.get(`${this.options.issuer}${this.API_PATH}`);
		const result = this.transformResult(response.data);

		return result;
	}

	transformResult(data: any, options: Settings = this.options): AuthOptions {
		if (data) {
			return {
				accessTokenUri: data.token_endpoint,
				authorizationUri: data.authorization_endpoint,
				scopes: options.scopes,
				...options,
			};
		}

		return {};
	}
}

export default DiscoveryService;

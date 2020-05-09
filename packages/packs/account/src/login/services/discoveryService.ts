import axios from 'axios';
import { AuthOptions } from './authService';

interface Settings {
	scopes: string[];
	issuer: string;
	clientId: string;
	clientSecret: string;
}

export class DiscoveryService {
	options: Settings;

	API_PATH = '/.well-known/openid-configuration';

	constructor(options: Settings) {
		this.options = options;
	}

	async getDiscovery(): Promise<AuthOptions> {
		const response = await axios.get(`${this.options.issuer}${this.API_PATH}`);
		const result = this.transformResult(response.data);

		return result;
	}

	transformResult(
		data: { token_endpoint: string; authorization_endpoint: string },
		options: Settings = this.options,
	): AuthOptions {
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

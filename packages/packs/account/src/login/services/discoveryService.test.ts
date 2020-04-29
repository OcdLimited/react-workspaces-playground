import { DiscoveryService } from './discoveryService';
import axios from 'axios';

jest.mock('axios');

beforeEach(() => {
	axios.mockClear();
});

const data = {
	issuer: 'https://localhost:44367',
	jwks_uri: 'https://localhost:44367/.well-known/openid-configuration/jwks',
	authorization_endpoint: 'https://localhost:44367/connect/authorize',
	token_endpoint: 'https://localhost:44367/connect/token',
	userinfo_endpoint: 'https://localhost:44367/connect/userinfo',
	end_session_endpoint: 'https://localhost:44367/connect/endsession',
	check_session_iframe: 'https://localhost:44367/connect/checksession',
	revocation_endpoint: 'https://localhost:44367/connect/revocation',
	introspection_endpoint: 'https://localhost:44367/connect/introspect',
	device_authorization_endpoint: 'https://localhost:44367/connect/deviceauthorization',
	frontchannel_logout_supported: true,
	frontchannel_logout_session_supported: true,
	backchannel_logout_supported: true,
	backchannel_logout_session_supported: true,
	scopes_supported: ['openid', 'profile', 'email', 'address', 'phone', 'role', 'AdsDataSpike', 'offline_access'],
	claims_supported: [
		'sub',
		'birthdate',
		'family_name',
		'gender',
		'given_name',
		'locale',
		'middle_name',
		'name',
		'nickname',
		'picture',
		'preferred_username',
		'profile',
		'updated_at',
		'website',
		'zoneinfo',
		'email',
		'email_verified',
		'address',
		'phone_number',
		'phone_number_verified',
		'role',
	],
	grant_types_supported: [
		'authorization_code',
		'client_credentials',
		'refresh_token',
		'implicit',
		'password',
		'urn:ietf:params:oauth:grant-type:device_code',
	],
	response_types_supported: [
		'code',
		'token',
		'id_token',
		'id_token token',
		'code id_token',
		'code token',
		'code id_token token',
	],
	response_modes_supported: ['form_post', 'query', 'fragment'],
	token_endpoint_auth_methods_supported: ['client_secret_basic', 'client_secret_post'],
	id_token_signing_alg_values_supported: ['RS256'],
	subject_types_supported: ['public'],
	code_challenge_methods_supported: ['plain', 'S256'],
	request_parameter_supported: true,
};

it('should work', async () => {
	var auth = new DiscoveryService({
		issuer: 'https://localhost:44367',
		scopes: [''],
		clientId: '',
		clientSecret: '',
	});

	axios.get = jest.fn();

	axios.get.mockReturnValueOnce({ data });

	const result = await auth.getDiscovery();

	expect(result).toEqual({
		accessTokenUri: 'https://localhost:44367/connect/token',
		authorizationUri: 'https://localhost:44367/connect/authorize',
		scopes: [''],
		issuer: 'https://localhost:44367',
		clientId: '',
		clientSecret: '',
	});
});

it('no data returns empty', async () => {
	var auth = new DiscoveryService({
		issuer: 'https://localhost:44367',
		scopes: [''],
		clientId: '',
		clientSecret: '',
	});

	axios.get = jest.fn();

	axios.get.mockReturnValueOnce({});

	const result = await auth.getDiscovery();

	expect(result).toEqual({});
});

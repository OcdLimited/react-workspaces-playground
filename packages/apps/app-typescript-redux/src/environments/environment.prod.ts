export const environment = {
  production: true,
  application: {
    name: 'AdsDataSpike',
    logoUrl: ''
  },
  oAuthConfig: {
    issuer: 'https://localhost:44367',
    clientId: 'AdsDataSpike_App',
    dummyClientSecret: '1q2w3e*',
    scope: 'AdsDataSpike',
    showDebugInformation: true,
    oidc: false,
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://localhost:44367'
    }
  },
  localization: {
    defaultResourceName: 'AdsDataSpike'
  }
};

export const environment = {
  production: true,
  apiRootUri: 'http://127.0.0.1:5000/api/v1/',
  uploadRootUri: 'http://127.0.0.1:5000/',
  storage: {
    auth: {
      strategy: 'session',
      key: 'auth',
    },
    member: {
      key: 'memberData',
    }
  },
  theme: 'dark',
  version: require('../../package.json').version
};

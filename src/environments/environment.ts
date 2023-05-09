// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

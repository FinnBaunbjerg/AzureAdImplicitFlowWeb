// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl:'https://implicitflow-api.azurewebsites.net/api/',
  scopeUri: ['api://25232c13-f2dc-475f-b754-5a5eaeb127ed/Test.Read'],
  tenantId: '97bdeb05-925a-4b5f-9038-d8b67e9cbdb7',
  uiClienId: '3aa95672-e167-4c37-b9f5-aff62d011bf6',
  redirectUrl: 'https://implicitflow-web.azurewebsites.net'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBZEV_uk1VfvVvvSJHi8hOLeDj7sk1yV4A',
    authDomain: 'baas-dev.firebaseapp.com',
    databaseURL: 'https://baas-dev.firebaseio.com',
    projectId: 'baas-dev',
    storageBucket: 'baas-dev.appspot.com',
    messagingSenderId: '144406050312'
  },
  version: ''
};

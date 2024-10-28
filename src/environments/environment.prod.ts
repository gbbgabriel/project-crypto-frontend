import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  baseUrl: 'http://104.131.80.141:3000',
  apiUrl: 'http://104.131.80.141:3000'
};

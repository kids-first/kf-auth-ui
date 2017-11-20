import 'semantic-ui-css/semantic.min.css';
import 'flexboxgrid';
import 'index.css';

localStorage.setItem('debug', process.env.REACT_APP_DEBUG || ''); // manually set because CRA doesn't allow arbitrary env variable names.
const debug = require('debug') as Function;
global.log = debug('app');

export const STATUSES = ['Disabled', 'Approved', 'Pending'];
export const apiRoot = process.env.REACT_APP_API;
export const useDummyData = process.env.REACT_APP_DUMMY;

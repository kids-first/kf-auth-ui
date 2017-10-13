import React from 'react';
import ReactDOM from 'react-dom';
import { injectIntl, IntlProvider, FormattedRelative } from 'react-intl';
import qs from 'qs';
import 'flexboxgrid';
import './index.css';

// const App = require('./App').default;
import App from './App';

const locale = qs.parse('?locale=en', { ignoreQueryPrefix: true });

const messages = {};

ReactDOM.render(
  <IntlProvider>
    <App />
  </IntlProvider>,
  document.getElementById('root') as HTMLElement,
);

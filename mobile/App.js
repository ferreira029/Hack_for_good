import React from 'react';
import Routes from './src/routes';
import { Provider } from 'react-redux';
import { Store } from './src/redux/store';

export default function App() {
  return (
    <Provider store={Store}>
      <Routes />
    </Provider>
  );
}

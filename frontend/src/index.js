import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import Context from './contexts/userContext'
import store from './redux/store'


ReactDOM.render(
<Provider store={store}>
    <Context>
        {/* <PersistGate persistor={persistor}> */}
            <App />
        {/* </PersistGate> */}
    </Context>
</Provider>
, document.getElementById('root'));

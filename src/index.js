import React from 'react';
import ReactDOM from 'react-dom';
import './styles/base.scss';
import './styles/bs4/bootstrap.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGoogle, fab } from '@fortawesome/free-brands-svg-icons';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import stores from './stores';

import Root from './Root';
import * as serviceWorker from './serviceWorker';


library.add(faGoogle, fab);

configure({ 
    enforceActions: "observed"
});

ReactDOM.render(
    <Provider {...stores}>
        <Root />
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();

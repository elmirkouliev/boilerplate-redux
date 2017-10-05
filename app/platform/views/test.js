import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';;

import configureStore from '../../store';
import Root from '../root';
import reducer from '../../modules/test';
import Test from '../containers/Test';

//SASS
import '../../sass/test.scss'

/**
 * Props grabed from window variable
 */
const store = configureStore(window.__initialProps__, reducer);

ReactDOM.render(
    <Root store={store}>
        <Test />
    </Root>,
    document.getElementById('app')
);
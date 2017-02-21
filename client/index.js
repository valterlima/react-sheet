/*
    ./client/index.js
    which is the webpack entry file
*/

/*eslint no-undef: 0*/
/*eslint no-unused-vars: 0*/

import React from 'react';
import ReactDOM from 'react-dom';
import Sheet from './components/Sheet.jsx';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<Sheet />, document.getElementById('root'));


/*
    ./client/index.js
    which is the webpack entry file
*/

/*eslint no-undef: 0*/
/*eslint no-unused-vars: 0*/

import React from 'react';
import ReactDOM from 'react-dom';
import Sheet from './Sheet.jsx';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

const items = {
  income: [
    { id: 1, description: "Salary", amount: 1000 },
    { id: 2, description: "Stock Interest", amount: 150 },
    { id: 3, description: "Rent Income", amount: 70 }
  ],
  expense: [
    { id: 1, description: "Food", amount: 80 },
    { id: 2, description: "Rent", amount: 200 },
    { id: 3, description: "Mortgage", amount: 500 }
  ]
}

ReactDOM.render(<Sheet items={items} />, document.getElementById('root'));


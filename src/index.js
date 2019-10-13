import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Game from './Game/';

ReactDOM.render(<Game />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}

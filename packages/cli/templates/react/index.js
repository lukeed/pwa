import React from 'react';
import ReactDOM from 'react-dom';
import App from '@components/App';
import './index.{{style}}';

ReactDOM.render(<App />, document.getElementById('app'));

if (process.env.NODE_ENV === 'production') {
	{{registration}}
}

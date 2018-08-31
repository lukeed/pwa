import React from 'react';
import style from './index.{{style}}';

export default function () {
	return (
		<footer className={ style.footer }>
			<span>Made with </span>
			<i className={ style.heart } />
			<span> by <a href="https://github.com/lukeed">lukeed</a></span>
		</footer>
	);
}

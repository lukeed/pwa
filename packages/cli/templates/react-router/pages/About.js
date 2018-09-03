import React from 'react';
import { HMR } from '@pwa/preset-react';
import Intro from '@components/Intro';
import style from './index.{{style}}';

function About() {
	return (
		<div className={ style.about }>
			<Intro>
				<h1>About Page</h1>
				<p>This is a <em>very</em> generic about page.</p>
				<p>There's really nothing to say here, especially since this is just a demo template! 😉</p>
				<p>So.. you're gunna get a bunch of Lorem Ipsum text instead. Have a nice day!</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit error culpa dolore blanditiis expedita beatae, quis saepe eveniet facilis esse. Assumenda, odit voluptates doloremque eligendi libero hic incidunt, alias cum!</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit error culpa dolore blanditiis expedita beatae, quis saepe eveniet facilis esse. Assumenda, odit voluptates doloremque eligendi libero hic incidunt, alias cum!</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit error culpa dolore blanditiis expedita beatae, quis saepe eveniet facilis esse. Assumenda, odit voluptates doloremque eligendi libero hic incidunt, alias cum!</p>
			</Intro>
		</div>
	);
}

export default HMR(About, module);

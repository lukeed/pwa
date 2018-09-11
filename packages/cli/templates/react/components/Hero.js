import React from 'react';
import Nav from '@components/Nav';
import style from './index.{{style}}';

const SHAPES = ['point', 'square', 'penta', 'circle', 'cross'];

export default class Hero extends React.Component {
	setShapes = elem => {
		this.shapes = elem;
	}

	componentDidMount() {
		const elem = this.shapes;
		const ww = elem.clientWidth;
		const wh = elem.clientHeight;
		const steps = wh / 2;

		function Particle() {
			let y = wh;
			let dir = Math.random() > 0.5 ? -1 : 1;
			let fric = Math.random() * 3 + 1;
			let scale = Math.random() + 0.5;
			let sine = Math.random() * 60;
			let x = ww * Math.random();

			let item = document.createElement('span');
			item.className = style.shape + ' ' + SHAPES[SHAPES.length * Math.random() | 0];
			item.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`;
			elem.appendChild(item);

			let height = item.clientHeight;
			let target = -1 * height;

			return () => {
				y -= fric;
				let rot = dir * Math.abs(y + height);
				let left = x + Math.sin(y * Math.PI / steps) * sine;
				item.style.transform = `translate3d(${left}px,${y}px,0) scale(${scale}) rotate(${rot}deg)`;
				return (y > target) || item.remove();
			}
		}

		let last = 0;
		let running = 1;
		let particles = [];

		window.onblur = window.onfocus = () => {
			running = document.hasFocus();
		};

		function update(ms) {
			let len = particles.length;
			if (running && len < 50 && (ms - last) > 200) {
				last = ms;
				particles.push(Particle());
			}
			while (len--) {
				particles[len]() || particles.splice(len, 1);
			}
			requestAnimationFrame(update);
		}

		update();
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<header className={ style.hero }>
				<Nav />
				<div className={ style.titles }>
					<h1>PWA</h1>
					<h3>Universal Builder</h3>
				</div>
				<div ref={ x => this.shapes = x } className={ style.shapes } />
			</header>
		);
	}
}

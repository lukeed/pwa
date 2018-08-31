import React from 'react';
import { HMR } from '@pwa/preset-react';
import Footer from '@components/Footer';
import Window from '@components/Window';
import Feats from '@components/Feats';
import Hero from '@components/Hero';
import Code from '@components/Code';
import style from './index.{{style}}';

class App extends React.Component {
	render() {
		return (
			<div className={ style.app }>
				<Hero />

				<Window />

				<main className={ style.wrapper }>
					<Feats />

					<section className={ style.section }>
						<h2>Installation</h2>
						<Code text="npm install --global @pwa/cli" />
						<Code offset label="OR" text="yarn global add @pwa/cli" />
					</section>

					<section className={ style.section }>
						<h2>Commands</h2>
						<Code label="Scaffold a new project!" text="pwa init" />
						<Code label="Run development/live-reload server" text="pwa watch" />
						<Code label="Build production bundle(s)" text="pwa build" />
						<Code label="Generate static HTML exports" text="pwa export" />
					</section>
				</main>

				<Footer />
			</div>
		);
	}
}

export default HMR(App, module);

import React from 'react';
import Loadable from 'react-loadable';
import { HMR } from '@pwa/preset-react';
import { Route, withRouter } from 'react-router-dom';
import Footer from '@components/Footer';
import Hero from '@components/Hero';
import style from './index.{{style}}';

// Route-Split Components
const loading = () => <div>Loading...</div>;
const load = loader => Loadable({ loader, loading });

const Home = load(() => import('@pages/Home'));
const About = load(() => import('@pages/About'));
const Article = load(() => import('@pages/Article'));
const Blog = load(() => import('@pages/Blog'));

class App extends React.Component {
	componentDidMount() {
		if (process.env.NODE_ENV === 'production') {
			this.props.history.listen(obj => {
				if (window.ga) ga.send('pageview', { dp:obj.pathname });
			});
		}
	}

	render() {
		return (
			<div className={ style.app }>
				<Hero />

				<main className={ style.wrapper }>
					<Route path="/" exact component={ Home } />
					<Route path="/blog" exact component={ Blog } />
					<Route path="/blog/:title" component={ Article } />
					<Route path="/about" exact component={ About } />
				</main>

				<Footer />
			</div>
		);
	}
}

export default HMR(withRouter(App), module);

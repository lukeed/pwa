import { h, render } from 'preact';
import App from './app';
// import './index.css';

// export default class App extends Component {
// 	render() {
// 		return (
// 			<div>
// 				<h1>Hello, World!</h1>
// 			</div>
// 		);
// 	}
// }

let elem = document.body;
let root = elem.firstElementChild;
root = render(h(App), elem, root);

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./app.js', () => {
		console.log('updated hello');
		root = render(h(App), elem, root);
	});
}

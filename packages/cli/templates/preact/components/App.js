import Intro from '@components/Intro';
import Feat from '@components/Feat';
import Nav from '@components/Nav';
import style from './index.css';

export default function (props) {
	return (
		<div class={ style.app }>
			<Intro />

			<Nav />

			<section class={ style.features }>
				<div>feature 1</div>
				<div>feature 2</div>
				<div>feature 3</div>
			</section>
		</div>
	);
}

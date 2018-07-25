import { Link } from 'preact-router';

export default function (props) {
	return (
		<nav>
			<Link href="/">Home</Link>
			<Link href="/about">About</Link>
		</nav>
	);
}

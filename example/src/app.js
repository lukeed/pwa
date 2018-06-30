import { h } from 'preact';
import Button from './btn';

export default function(props) {
	return h('div', { id:'app' }, [
		h('h1', null, 'Howdy, Partner!'),
		h(Button)
	]);
}

import { h } from 'preact';

export default function(props) {
	return h('div', { id:'app' }, [
		h('h1', null, 'Howdy, Partner!')
	]);
}

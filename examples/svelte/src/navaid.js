let sep = '/';

function convert (str) {
	let c, o, l, arr=str.split(sep);
	(arr[0] === '') && arr.shift();

	let i=0, tmp, keys=[], pattern='';
	for (; i < arr.length; i++) {
		l = (tmp=arr[i]).length;
		if (l === 0) continue;
		c = tmp.charCodeAt(0);
		if (c === 42) {
			keys.push('wild');
			pattern += sep + '(.*)';
		} else if (c === 58) {
			o = tmp.charCodeAt(l-1) === 63; // optional?
			keys.push( tmp.substring(1, o ? l-1 : l) );
			pattern += o ? '(?:/([^/]+?))?' : sep + '([^/]+?)';
		} else {
			pattern += sep + tmp;
		}
	}
	keys.length && (pattern += '(?:/)?');
	pattern = new RegExp('^' + pattern + '\/?$', 'i');
	return { keys, pattern };
}

function Navaid(opts) {
	opts = opts || {};
	let base = opts.base || '';
	let routes=[], handlers={}, $=this, PAT='route';

	let fmt = $.format = uri => {
		uri = uri.indexOf(base) == 0 ? uri.substring(base.length) : uri;
		return (uri.charCodeAt(0) == 47) ? uri : '/' + uri;
	};

	$.route = (uri, replace) => {
		uri = fmt(uri);
		history[(replace ? 'replace' : 'push') + 'State'](uri, null, base + uri);
	};

	$.on = (pat, fn) => {
		handlers[pat] = fn;
		let o = convert(pat);
		o[PAT] = pat;
		routes.push(o);
		return $;
	};

	$.run = uri => {
		uri = fmt(uri || location.pathname);
		let obj = routes.find(x => x.pattern.test(uri));
		if (obj) {
			let i=0, params={}, arr=obj.pattern.exec(uri);
			while (i < obj.keys.length) params[obj.keys[i]]=arr[++i] || null;
			handlers[obj[PAT]](params); // todo loop?
		}

		return $;
	};

	$.listen = () => {
		wrap('push');
		wrap('replace');

		function run(e) {
			$.run(e.uri);
		}

		function click(e) {
			let x = e.target.closest('a');
			if (!x || !x.href || !!x.target) return;
			if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button) return;
			$.route(x.getAttribute('href'));
			e.preventDefault();
		}

		let off = removeEventListener;
		addEventListener('popstate', run);
		addEventListener('replacestate', run);
		addEventListener('pushstate', run);
		addEventListener('click', click);

		$.unlisten = () => {
			off('popstate', run);
			off('replacestate', run);
			off('pushstate', run);
			off('click', click);
		};

		return $.run();
	};

	return $;
}

function wrap(type) {
	type += 'State';
	let fn = history[type];
	history[type] = function (uri) {
		let ev = new Event(type.toLowerCase());
		ev.uri = uri;
		fn.apply(this, arguments);
		return dispatchEvent(ev);
	};
}

export default Navaid;

const test = require('tape');
const util = require('@/core/util');

test('(core) util/merge', t => {
	t.plan(13);
	let fn = util.merge;

	let foo = { a:1, b:2 };
	t.is(fn(foo), undefined, 'returns no output');

	let out = fn(foo, { b:3, d:4 });
	t.is(out, undefined, '~> never returns output');
	t.same(foo, { a:1, b:3, d:4 });

	let args = 'foobar';
	foo = { a:[1], b:2, c:{ a:1 } };
	fn(foo, {
		a(x, y) {
			t.is(x, foo.a, '~> when `nxt` key is function, receives `old` value for same key as 1st param');
			t.is(y, args, '~> when `nxt` key is function, receives all `args` as 2nd param');
			x.push(2, 3);
			t.same(foo.a, [1,2,3], '~> original value is directly mutable');
			return 'hello';
		},
		b: 999,
		c(x, y) {
			x.a += 3;
			x.foo = y;
			t.is(foo.c.a, 4, '~> original value is directly mutable');
			t.is(foo.c.foo, y, '~> original value is directly mutable');
			return 'ignored';
		}
	}, args);

	t.same(foo, { a:[1,2,3], b:999, c:{ a:4, foo:args } });

	t.not(foo.a, 'hello', '~> return values from functions are ignored');
	t.not(foo.c, 'ignored', '~> return values from functions are ignored');

	foo = { a:1, b:2, c:3 };
	fn(foo, { a:7, b:8, c:9, webpack:123 });
	f.is(foo.webpack, undefined, 'ignores `webpack` key on `nxt` (at this stage)');
	t.same(foo, { a:7, b:8, c:9 });
});

test('(core) util/isEmpty', t => {
	let fn = util.isEmpty;

	t.throws(() => fn(), TypeError);
	t.throws(() => fn(null), TypeError);
	t.throws(() => fn(undefined), TypeError);

	t.is(fn(''), true);
	t.is(fn({}), true);
	t.is(fn([]), true);
	t.is(fn(0), true);

	t.is(fn([1]), false);
	t.is(fn({ a:0 }), false);
	t.is(fn({ a:null }), false);
	t.is(fn('Hello'), false);
	t.is(fn(' '), false);

	t.end();
});

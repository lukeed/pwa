const test = require('tape');
const pretty = require('@/cli/lib/util/pretty');

test('(cli) util/pretty.size', t => {
	let fn = pretty.size;
	t.is(fn(), '0.00 kB');
	t.is(fn(0), '0.00 kB');
	t.is(fn(100), '0.10 kB');
	t.is(fn(568), '0.56 kB');
	t.is(fn(1337), '1.34 kB');
	t.is(fn(1568), '1.57 kB');
	t.is(fn(1998), '2.00 kB');
	t.is(fn(10528), '10.50 kB');
	t.end();
});

test('(cli) util/pretty.time', t => {
	let fn = pretty.time;
	t.is(fn(), '0.00s');
	t.is(fn(0), '0.00s');
	t.is(fn(120), '0.12s');
	t.is(fn(128), '0.13s');
	t.is(fn(999), '1.00s');
	t.is(fn(9999), '10.00s');
	t.is(fn(18289), '18.29s');
	t.is(fn(5e6), '5000.00s');
	t.end();
});

/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import htm from '../src/index.mjs';

const h = (tag, props, ...children) => ({ tag, props, children });
const html = htm.bind(h);

describe('htm', () => {
	test('should cache static subtrees', () => {
		const x = () => html`<div>a</div>`;
		const a = x();
		const b = x();
		expect(a).toEqual({ tag: 'div', props: null, children: ['a'] });
		expect(b).toEqual({ tag: 'div', props: null, children: ['a'] });
		expect(a).toBe(b);
	});

	test('should have a different cache for each h', () => {
		let tmp = htm.bind(() => 1);
		const x = () => tmp`<div>a</div>`;
		const a = x();
		tmp = htm.bind(() => 2);
		const b = x();

		expect(a).toBe(1);
		expect(b).toBe(2);
	});
});

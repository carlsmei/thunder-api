/**
 * Thunder Class
 * 1.0.2 - 10 03 2022
 * https://thunder.durka.xyz/
 * A JavaScript wrapper around the https://thunder.durka.xyz API.
 * https://github.com/carlsmei/thunder-api
 */
import fetch, {Headers} from 'node-fetch'
import {stringify} from 'query-string'

export default class Wrapper
{
	constructor() {
		/** @private */
		this.base_url = 'https://thunder.durka.xyz';
	}

	async search_user(params = {offset: 0}) {
		return this._send('/api/users/search?' + stringify(params))
	}

	async get_user_by_id(id) {
		return this._send('/api/users/' + id)
	}

	/** @private */
	async _send(path = '', method = 'GET', body) {
		const headers = new Headers();
		const options = {
			method,
			headers: headers
		};

		headers.set('accept', 'application/json');

		if (method === 'POST') {
			headers.set('content-type', 'application/json');
			options.body = JSON.stringify(body);
		}

		const res = await fetch(this.base_url + path, options);
		let data;

		const contentType = res.headers.get('content-type');

		if (contentType && contentType.startsWith('application/json'))
			data = await res.json();
		else
			data = await res.text();

		return data;
	}
}

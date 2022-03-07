/**
 * Thunder Class
 * 1.0.0 - ** ** 2022
 * https://thunder.durka.xyz/
 * A JavaScript wrapper around the https://thunder.durka.xyz API.
 * https://github.com/carlsmei/thunder-api
 */
import fetch, {RequestInit, Headers} from 'node-fetch'
import {stringify} from 'query-string'

interface SearchParams {
	['vk.id']?: number,
	username?: string,
	['ip.value']?: string,
	['existence.project']?: string,
	offset?: number
}

export default class ThunderWrapper
{
	base_url: string;

	constructor() {
		/** @private */
		this.base_url = 'https://thunder.durka.xyz';
	}

	async search(params: SearchParams = {offset: 0}) {
		return this._send('/api/users/search?' + stringify(params))
	}

	async get_by_id(id: string) {
		return this._send('/api/users/' + id)
	}

	/** @private */
	private async _send(path: string = '', method: string = 'GET', body?: any) {
		const headers = new Headers();
		const options: RequestInit = {
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

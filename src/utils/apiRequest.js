/** @format */

import axios from 'axios';
axios.defaults.baseURL = 'https://lamiapp.site/';

export const apiRequest = async (url, method, body, headers) => {
	var config = {
		method,
		url,
		headers: {
			...headers,
		},
		data: body,
	};

	const response = await axios(config);
	return response.data;
};

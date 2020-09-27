import * as jwtDecode from 'jwt-decode';
/* eslint-disable no-return-await  */
/* eslint-disable no-underscore-dangle  */

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const PATCH = 'PATCH';
const DELETE = 'DELETE';
const CONTENT_TYPE_JSON = { 'Content-Type': 'application/json' };

export const getInfoFromToken = key => {
  try {
    const token = localStorage.getItem('token');

    const decodedToken = jwtDecode(token);
    return decodedToken[key];
  } catch (error) {
    return {};
  }
};

function isTokenExp() {
  const exp = getInfoFromToken('exp');
  const date = new Date();
  const timestamp = Math.floor(date.getTime() / 1000);
  return exp < timestamp;
}

function objectToQueryString(obj) {
  return Object.keys(obj)
    .map(key => `${key}=${obj[key]}`)
    .join('&');
}

async function request(
  url,
  params,
  method = GET,
  headers = CONTENT_TYPE_JSON,
  tokenPre = 'Bearer'
) {
  const token = localStorage.getItem('token');
  if (token) {
    headers.Authorization = `${tokenPre} ${token.replace(/^"(.*)"$/, '$1')}`;
  }
  const options = {
    method,
    headers
  };

  // if params exists and method is GET, add query string to url
  // otherwise, just add params as a "body" property to the options object
  if (params) {
    if (method === GET) {
      url += `?${objectToQueryString(params)}`;
    } else {
      options.body = JSON.stringify(params); // body should match Content-Type in headers option
    }
  }
  let status = null;
  let data = null;
  let body = null;

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      let result;
      try {
        result = await response.json();
      } catch (e) {
        status = response.status;
        data = response.statusText;
        body = response.body;
      }
      status = response.status;
      data = result;
    }
    // if ([404, 500].includes(response.status)) {
    //   window.location.href = '/errorPage';
    // }
    if ([400, 403].includes(response.status)) {
      let result;
      try {
        result = await response.json();
      } catch (e) {
        status = response.status;
        data = response.statusText;
        body = response.body;
      }
      status = response.status;
      data = result;
    }
  } catch (e) {
    console.log(`FETCH ERROR: ${e}`);
  }
  console.log({ status, data, body });
  return { status, data, body };
}

export default class ServiceAPI {
  constructor() {
    this.server = process.env.VUE_APP_SERVER;
    this.api = process.env.VUE_APP_API;
    this.apiUrl = `${this.server}${this.api}`;
  }

  async _refresh() {
    localStorage.removeItem('token');
    return await request(
      `${this.apiUrl}/refresh/`,
      {
        refresh: JSON.parse(localStorage.getItem('tokenRefresh'))
      },
      POST
    );
  }

  async _request(url, params, METHOD, headers) {
    if (isTokenExp()) {
      const token = await this._refresh();
      if (token.status === 400) {
        localStorage.removeItem('token');
        window.location.href = '/';
        return false;
      }

      try {
        localStorage.setItem('token', JSON.stringify(token.data.access));
      } catch (e) {
        localStorage.clear();
      }
    }

    return await request(url, params, METHOD, headers);
  }

  async login(params) {
    return await this._request(`${this.server}/login/`, params, POST);
  }

  async getAllUserChatRooms(userId) {
    return await this._request(
      `${this.apiUrl}/users/${userId}/chat_rooms`,
      null,
      GET
    );
  }

  async createChatRoom(params) {
    return await this._request(`${this.apiUrl}/chat_rooms`, params, POST);
  }

  async getSingleChatRoom(roomId) {
    return await this._request(
      `${this.apiUrl}/chat_rooms/${roomId}`,
      null,
      GET
    );
  }

  async getAllUsers() {
    return await this._request(`${this.apiUrl}/users`, null, GET);
  }

  async appendUserToRoom(roomId, params) {
    return await this._request(
      `${this.apiUrl}/chat_rooms/${roomId}/append_user_room`,
      params,
      POST
    );
  }

  async getUsersInChat(chatId) {
    return await this._request(
      `${this.apiUrl}/chat_rooms/${chatId}/users_rooms`,
      null,
      GET
    );
  }

  async getUsersNotInChat(chatId) {
    return await this._request(
      `${this.apiUrl}/chat_rooms/${chatId}/users_not_in_room`,
      null,
      GET
    );
  }

  async createMessage(params) {
    return await this._request(`${this.apiUrl}/messages`, params, POST);
  }

  async getAllReportMessages(chatId) {
    return await this._request(
      `${this.apiUrl}/chat_rooms/${chatId}/get_messages`,
      null,
      GET
    );
  }

  async getAllUsersConnections() {
    return await this._request(
      `${this.apiUrl}/users/users_connections`,
      null,
      GET
    );
  }
}

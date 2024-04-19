
export default class BlogService {
  url = 'https://blog.kata.academy/api/';

  // 5 articles
  async getArticles (page, lim=5) {
    const offset = page * lim;
    const res = await fetch(`${this.url}articles?favorited&offset=${offset}&limit=${lim}`)
      .then((body) => body.json());
    return res;
  }

  // 1 article
  async getOneArticles (slug) {
    const res = await fetch(`${this.url}/articles/${slug}`)
      .then((body) => body.json())
      .catch((e) => {
        console.log(e);
        throw new Error('OHAE');
      });
    if (res.status === 404) throw new Error('не найдено');
      
    return res;
  }

  // register

  async register(data) {
    const { username, email, password } = data;
    const postOptions = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        user: {
          username,
          email,
          password
        }
      }),
    };

    fetch(`${this.url}users`, postOptions)
      .then((response) => response.json())
      .then((res) => console.log(res))
      .catch((err) => console.error(err.message)); // Log error messages for better understanding.
  }

  // login
  async login(data) {
    const { email, password } = data;
    const postOptions = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        user: {
          email,
          password
        }
      }),
    };

    const out = fetch(`${this.url}users/login`, postOptions)
      .then((response) => response.json())
      .then((res) => res)
      .catch((err) => console.error(err.message)); // Log error messages for better understanding.

    return out;
  }

  // info about Person
  async getLoged(token) {
    const getOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,
      },
    };
  
    const out = fetch(`${this.url}user`, getOptions)
      .then((response) => response.json())
      .then((res) => res)
      .catch((err) => console.error(err.message)); // Log error messages for better understanding.

    return out;
  }

  // upd user testing@mail.ru 123456
  async updUser(data, token) {
    const { email, password, username, image } = data;
    const postOptions = {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${token}`,
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
          image
        }
      }),
    };

    const out = fetch(`${this.url}user`, postOptions)
      .then((response) => response.json())
      .then((res) => res)
      .catch((err) => console.error(err.message)); // Log error messages for better understanding.

    return out;
  }
};



export default class BlogService {
  url = 'https://blog.kata.academy/api/';

  // 5 articles
  async getArticles(page, lim = 5) {
    const getOptions = {
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage.logedToken}`,
      },
    };
    const offset = page * lim;
    const res = await fetch(`${this.url}articles?favorited&offset=${offset}&limit=${lim}`, getOptions).then((body) =>
      body.json()
    );
    return res;
  }

  // 1 article
  async getOneArticles(slug) {
    const getOptions = {
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage.logedToken}`,
      },
    };
    const res = await fetch(`${this.url}/articles/${slug}`, getOptions)
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
          password,
        },
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
          password,
        },
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
        Authorization: `Token ${token}`,
      },
    };

    const out = fetch(`${this.url}user`, getOptions)
      .then((response) => response.json())
      .then((res) => res)
      .catch((err) => console.error(err.message)); // Log error messages for better understanding.

    return out;
  }

  // upd user test@ya.ru 123456
  async updUser(data, token) {
    const { email, password, username, image } = data;
    const user = {};
    if (email) user.email = email;
    if (password) user.password = password;
    if (username) user.username = username;
    if (image) user.image = image;
    const putOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        user,
      }),
    };

    const out = fetch(`${this.url}user`, putOptions)
      .then((response) => response.json())
      .then((res) => console.log(res))
      .catch((err) => console.error(err.message)); // Log error messages for better understanding.

    return out;
  }

  // создание поста
  async createArticle(data, token) {
    const { title, description, body, tags } = data;
    const article = { title, description, body };
    if (tags.length > 0) article.tagList = tags;
    const putOptions = {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        article,
      }),
    };

    const out = fetch(`${this.url}articles`, putOptions)
      .then((response) => response.json())
      .then((res) => console.log(res))
      .catch((err) => console.error(err.message)); // Log error messages for better understanding.

    return out;
  }

  // редактирование поста
  async updArticle(data, token, slug) {
    const { title, description, body, tags } = data;
    const article = { title, description, body };
    if (tags.length > 0) article.tagList = tags;
    const putOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        article,
      }),
    };

    const out = fetch(`${this.url}articles/${slug}`, putOptions)
      .then((response) => response.json())
      .then((res) => console.log(res))
      .catch((err) => console.error(err.message)); // Log error messages for better understanding.

    return out;
  }

  // удаление поста
  async deletePost(token, slug) {
    const putOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: '',
    };

    fetch(`${this.url}articles/${slug}`, putOptions)
      .then((response) => {
        if (response.ok) console.log('успешно удалено');
      })
      .catch((err) => console.error(err.message));
  }

  // LIKE
  async unlikeLikePost(liked, token, slug) {
    console.log(liked);
    let method = 'POST';
    if (liked) method = 'DELETE';
    console.log(method);
    const postOptions = {
      method,
      headers: {
        Authorization: `Token ${token}`,
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
    };


    const out = fetch(`${this.url}articles/${slug}/favorite`, postOptions)
      .then((response) => response.json())
      .catch((err) => console.error(err.message)); // Log error messages for better understanding.
    return out;
  }
}

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
        throw new Error(e.message);
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
      .then((res) => res)
      .catch((e) => {
        throw new Error(e.message);
      });
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
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        return res;
      })
      .catch((e) => {
        throw new Error(e.message);
      });

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
      .catch((e) => {
        throw new Error(e.message);
      });
    return out;
  }

  // upd user
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
      .then((res) => res)
      .catch((e) => {
        throw new Error(e.message);
      });
    return out;
  }

  // создание поста
  async createArticle(data, token) {
    const { title, description, body, tags } = data;
    const article = { title, description, body };
    article.title = title.trim();
    article.description = description.trim();
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
      .then((response) => {
        if (!response.ok) throw new Error('не отправилось');
        return response.json();
      })
      .then((res) => res)
      .catch((err) => {
        throw new Error(err.message);
      });

    return out;
  }

  // редактирование поста
  async updArticle(data, token, slug) {
    const { title, description, body, tags } = data;
    const article = { title, description, body };
    article.title = title.trim();
    article.description = description.trim();
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
      .then((response) => {
        return response.json();
      })
      .then((res) => res)
      .catch((e) => new Error(e.message)); // Log error messages for better understanding.

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
        if (!response.ok) throw new Error('не удалилось');
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  }

  // LIKE
  async unlikeLikePost(liked, token, slug) {
    let method = 'POST';
    if (liked) method = 'DELETE';
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
      .catch((e) => {
        throw new Error(e.message);
      });
    return out;
  }
}

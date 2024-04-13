
export default class BlogService {
  url = 'https://blog.kata.academy/api/';
  // articles page
  async getArticles (page, lim=5) {
    const offset = page * lim;
    const res = await fetch(`${this.url}articles?favorited&offset=${offset}&limit=${lim}`)
      .then((body) => body.json());
    return res;
  }
  // one Artic
  async getOneArticles (slug) {
    const res = await fetch(`${this.url}/articles/${slug}`)
      .then((body) => body.json());
    return res;
  }
}
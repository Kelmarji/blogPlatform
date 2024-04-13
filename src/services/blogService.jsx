
export default class BlogService {
  url = 'https://blog.kata.academy/api/';
  
  async getArticles (page, lim=5) {
    const offset = page * lim;
    const res = await fetch(`${this.url}articles?favorited&offset=${offset}&limit=${lim}`)
      .then((body) => body.json());
    return res;
  }

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
}
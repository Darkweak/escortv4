import {routes} from "../routes";
const url = 'https://escort-me.online';

export class Sitemap {
  constructor() {
    this.routes = routes;
  }

  getRoutes() {
    return this.routes;
  }

  generateXML() {
    let xml = '<?xml version="1.0" encoding="ISO-8859-1"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    this.getRoutes().map(route => xml += `${new Route(route).toString()}`);
    xml += '</urlset>';

    return xml;
  }
}

class Route {
  constructor(route) {
    this.path = route.path;
  }

  getPath() {
    return this.path;
  }

  toString() {
    return `<url><loc>${url}/${this.getPath()}</loc><lastmod>${`${new Date().getFullYear()}/${("0" + (new Date().getMonth() + 1)).slice(-2)}/${new Date().getDate()}`}</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>`
  }
}

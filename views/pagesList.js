const html = require('html-template-tag');
const layout = require('./layout');

module.exports = (pages, title='Pages', search='') => layout(html`
  <h3>${title}</h3>
  <hr>
  $${search !== false ? html`
    <form method="GET" action="/wiki/search">
      <input type="text" name="search" value="${search}"/>
      <button type="submit">Search</button>
    </form>
    `: ''}
  <hr>
  <ul class="list-unstyled">
    <ul>
      $${pages.length > 0 ? (pages.map(page => {
        return html`<li><a href="/wiki/${page.slug}">${page.title}</a></li>`;
      }).join('')) : '<h3>No Pages Found</h3>'}
    </ul>
  </ul>
`);

import View from './view';
import icons from '../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _message = '';
  _errorMessage = 'No bookmarks yet! 🤷‍♂️ Find a recipe to add to bookmarks 😊';

  // addHandlerClick(handler) {
  //   this._parentElement.addEventListener('click', function (e) {
  //     const btn = e.target.closest('.btn--inline');
  //     if (!btn) return;
  //     handler(+btn.dataset.goto);
  //   });
  // }

  _generateMarkup() {
    console.log(this._data);
    const id = window.location.hash.slice(1);
    return this._data
      .map(
        bookmark => `<li class="preview">
          <a
            class="preview__link ${
              bookmark.id === id ? 'preview__link--active' : ''
            }"
            href="#${bookmark.id}"
          >
            <figure class="preview__fig">
              <img src="${bookmark.image}" alt="${bookmark.title}" />
            </figure>
            <div class="preview__bookmark">
              <h4 class="preview__title">${bookmark.title} ...</h4>
              <p class="preview__publisher">${bookmark.publisher}</p>
            </div>
          </a>
        </li>`
      )
      .join('');
  }
}

export default new BookmarksView();

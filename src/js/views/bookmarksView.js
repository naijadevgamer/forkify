import View from './view';
import previewView from './previewView';
import icons from '../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _message = '';
  _errorMessage = 'No bookmarks yet! 🤷‍♂️ Find a recipe to add to bookmarks 😊';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return previewView._generateMarkupPreview(this._data);
  }
}

export default new BookmarksView();

import View from './view';
import previewView from './previewView';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet! 🤷‍♂️ Find a recipe to add to bookmarks 😊';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return previewView._generateMarkupPreview(this._data);
  }
}

export default new BookmarksView();

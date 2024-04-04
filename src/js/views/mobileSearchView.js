import View from './view';

class AddRecipeView extends View {
  _searchResults = document.querySelector('.search-results');
  _searchField = document.querySelector('.search__field');
  _recipe = document.querySelector('.recipe');
  _copy = document.querySelector('.copyrecipe');

  constructor() {
    super();
    this._addHandlerShowResults();
    this._addHandlerHideResults();
    this._addHandlerResizeResults();
  }

  _addHandlerShowResults() {
    this._searchField.addEventListener(
      'focus',
      this._showSearchResult.bind(this)
    );
  }

  _addHandlerHideResults() {
    this._recipe.addEventListener('click', this._hideSearchResult.bind(this));
    this._copy.addEventListener('click', this._hideSearchResult.bind(this));
  }

  _addHandlerResizeResults() {
    window.addEventListener('resize', this._resizeSearchResult.bind(this));
  }

  _showSearchResult() {
    this._searchResults.style.transform = 'translateX(0)';
  }

  _hideSearchResult() {
    if (window.innerWidth <= 600)
      this._searchResults.style.transform = 'translateX(-100%)';
  }

  _resizeSearchResult() {
    if (window.innerWidth > 600) {
      this._showSearchResult();
    }
  }
}

export default new AddRecipeView();

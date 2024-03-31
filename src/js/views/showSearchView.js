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

  _showSearchResult() {
    this._searchResults.style.transform = 'translateX(0)';
  }

  _hideSearchResult() {
    this._searchResults.style.transform = 'translateX(-100%)';
  }
}

export default new AddRecipeView();

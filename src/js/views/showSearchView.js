import View from './view';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.search');
  _searchResults = document.querySelector('.search__field');

  constructor() {
    super();
    this._addHandlerShowResults();
  }

  _addHandlerShowResults() {
    this._searchResults.addEventListener(
      'focus',
      this._showSearchResult.bind(this)
    );
  }

  _showSearchResult() {
    // this._parentElement.querySelector('.search__field').style.width = "80%"
    console.log('hey focus');
  }
}

export default new AddRecipeView();

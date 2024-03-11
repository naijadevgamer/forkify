import View from './view';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    console.log(numPages, this._data.page);

    // Page 1, and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return 'page 1 , others';
    }

    // Page 1, and there are no other pages
    if (this._data.page === 1 && numPages === 1) {
      return 'page 1 , no others';
    }

    // Last page
    if (this._data.page === numPages && numPages > 1) {
      return 'last page';
    }

    // Other page
    return 'other page';
  }
}

export default new PaginationView();

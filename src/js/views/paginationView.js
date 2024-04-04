import View from './view';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      handler(+btn.dataset.goto);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currPage = this._data.page;

    // Page 1, and there are other pages
    if (currPage === 1 && numPages > 1) {
      return `${this._generateButtonMarkup('next', currPage)}`;
    }

    // Last page
    if (currPage === numPages && numPages > 1) {
      return `${this._generateButtonMarkup('prev', currPage)}`;
    }

    // Other pages
    if (currPage > 1 && currPage < numPages) {
      return `${this._generateButtonMarkup('prev', currPage)}
      ${this._generateButtonMarkup('next', currPage)}`;
    }

    // Page 1, and there are no other pages
    return '';
  }

  _generateButtonMarkup(pos, currPage) {
    const position = pos === 'next' ? currPage + 1 : currPage - 1;
    return `
      <button
        data-goto="${position}"
        class="btn--inline pagination__btn--${pos}"
      >
        ${
          pos === 'next'
            ? `<span class="pagination__span">Page</span> <span>${position}</span>
              <svg class="search__icon">
                <use
                  href="${icons}#icon-arrow-${
                pos === 'next' ? 'right' : 'left'
              }"
                ></use>
              </svg>`
            : `<svg class="search__icon">
                <use
                  href="${icons}#icon-arrow-${
                pos === 'next' ? 'right' : 'left'
              }"
                ></use>
              </svg>
              <span class="pagination__span">Page</span> <span> ${position}</span>`
        }
      </button>
    `;
  }
}

export default new PaginationView();

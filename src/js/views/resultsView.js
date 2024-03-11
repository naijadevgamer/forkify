import View from './view';
import icons from '../../img/icons.svg';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _message = '';
  _errorMessage =
    'Could not find what you are looking for!🤷‍♂️ Make sure to check if the spelling of the recipe you entered is correct 😊';

  _generateMarkup() {
    return `
    ${this._data
      .map(
        result => `<li class="preview">
          <a
            class="preview__link"
            href="#${result.id}"
          >
            <figure class="preview__fig">
              <img src="${result.image}" alt="${result.title}" />
            </figure>
            <div class="preview__result">
              <h4 class="preview__title">${result.title} ...</h4>
              <p class="preview__publisher">${result.publisher}</p>
            </div>
          </a>
        </li>`
      )
      .join('')}
      
    `;
  }
}

export default new ResultView();

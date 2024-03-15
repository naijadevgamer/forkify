import View from './view';
import icons from '../../img/icons.svg';
import previewView from './previewView';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _message = '';
  _errorMessage =
    'Could not find what you are looking for!🤷‍♂️ Make sure to check if the spelling of the recipe you entered is correct 😊';

  _generateMarkup() {
    return previewView._generateMarkupPreview(this._data);
  }
}

export default new ResultView();

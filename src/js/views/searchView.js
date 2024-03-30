class SearchView {
  #parentElement = document.querySelector('.search');

  getQuery() {
    const query = this.#parentElement.querySelector('.search__field').value;
    this.#clearInput();
    if (!query) throw new Error('Search field is empty 🤦‍♂️');
    return query;
  }

  #clearInput() {
    this.#parentElement.querySelector('.search__field').value = '';
  }

  // #showSearchResult() {
  //   const hey = this.#parentElement.querySelector('.search__field').focus();
  //   console.log('hey focus');
  // }

  // MVC: Publisher
  addHandlerSubmit(handler) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();

import * as model from './model';
import { MODAL_CLOSE_SEC } from './config';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';
import showSearchView from './views/showSearchView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    showSearchView._hideSearchResult();
    recipeView.renderSpinner();

    // 0) Update results and bookmarks view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // 1) Loading Recipe
    await model.loadRecipe(id);

    // 2) Rendering recipes
    recipeView.render(model.state.recipe);

    // controlServings(4);
  } catch (err) {
    recipeView.renderError(err.message);
  }
};

const controlSearchResults = async function () {
  try {
    // 1) Get search query
    resultsView.renderSpinner();
    const query = searchView.getQuery();

    // 2) Load search result
    await model.loadSearchResults(query);

    // 3) Render search result with pagination
    resultsView.render(model.getSearchResultsPage());

    // 3) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError(err.message);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render New results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //  2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // 1) Update the recipe servings (in state)
  model.updateServings(newServings);

  // 2) Render recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Display success message
    addRecipeView.renderSuccess();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // Close modal
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};
// const fractionConverter = function (deci) {
//   const splet = deci.split('.');
//   const [whole, fraction] = splet;
//   const fractNum = +fraction;
//   const result = fractNum / 10;
//   let answer;

//   for (let i = 10, j = fractNum; 10 % fractNum === 0; i++) {
//     if (i % j) {
//       answer = `${j}/${i}`;
//     } else {
//       answer = `${1}/${i / j}`;
//     }
//   }

//   console.log(splet);
// };

// fractionConverter('1.5');

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSubmit(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};

init();

// localStorage.clear();

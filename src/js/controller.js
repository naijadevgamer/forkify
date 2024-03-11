import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading Recipe
    await model.loadRecipe(id);

    // 2) Rendering recipes
    recipeView.render(model.state.recipe);
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

    // 3) Render search result
    // resultsView.render(model.state.search.results);

    // 3) Render search result with pagination
    resultsView.render(model.getSearchResultsPage(3));

    // 3) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError(err.message);
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
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSubmit(controlSearchResults);
};

init();

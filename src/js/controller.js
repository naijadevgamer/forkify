import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

const searchButton = document.querySelector('.search__btn');
///////////////////////////////////////

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
    const query = searchView.getQuery();

    console.log(query);

    recipeView.renderSearchSpinner();
    if (!query) throw new Error('Search field is empty 🤦‍♂️');

    // 1) Loading search result
    await model.loadSearchResults(query);

    // 2) Rendering search result
    recipeView.renderSearch(model.state.search.results);
  } catch (err) {
    recipeView.renderSearchError(err.message);
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

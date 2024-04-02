import { API_URL, RES_PER_PAGE, API_KEY } from './config';
import { AJAX } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || [],
};

const createRecipeObject = function (data) {
  let { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${API_KEY}`);
    state.recipe = createRecipeObject(data);
    console.log(state.recipe);
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = !state.recipe.bookmarked;
    //   state.recipe.bookmarked = true;
    // else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  // Remove bookmark
  state.bookmarks.splice(index, 1);

  // Unmark current recipe as bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

export const uploadRecipe = async function (newRecipe) {
  try {
    console.log(newRecipe);
    // const ingredients = [];

    // const ing = Object.entries(newRecipe).filter(
    //   entry => entry[0].startsWith('ingredient') && entry[1] !== ''
    // );
    // ing1 = ing.filter(
    //   entry => entry[0].startsWith('ingredient-1') && entry[1] !== ''
    // );

    // const [quantity, unit, description] = ing1

    // const ingArr =
    // console.log(ing);

    // ing.map(ing => {
    //   const ingArr = ing.map(ingIn => ingIn[1]);
    //   const [quantity, unit, description] = ingArr;
    //   return { quantity: +quantity || null, unit, description };
    // });

    // console.log(ingredients);

    // const ingredients = Object.entries(newRecipe)
    //   .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
    //   .map(ing => {
    //     const ingArr = ing[1].split(',').map(el => el.trim());
    //     if (ingArr.length !== 3)
    //       throw new Error(
    //         'Wrong ingredient format! Please use the correct format 😊'
    //       );
    //     const [quantity, unit, description] = ingArr;
    //     return { quantity: +quantity || null, unit, description };
    //   });
    // console.log(ingredients);
    // const recipe = {
    //   title: newRecipe.title,
    //   source_url: newRecipe.sourceUrl,
    //   image_url: newRecipe.image,
    //   publisher: newRecipe.publisher,
    //   cooking_time: newRecipe.cookingTime,
    //   servings: newRecipe.servings,
    //   ingredients,
    // };
    // const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);

    // state.recipe = createRecipeObject(data);
    // addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

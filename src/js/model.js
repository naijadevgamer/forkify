import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = !state.recipe.bookmarked;

    console.log(state.recipe);
  } catch (err) {
    throw err;
  }
  // const {
  //   id,
  //   title,
  //   publisher,
  //   source_url: sourceUrl,
  //   image_url: image,
  //   servings,
  //   cooking_time: cookingTime,
  //   ingredients,
  // } = data.data.recipe;
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    console.log(state.search.results);
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

export const addBookmark = function (recipe) {
  if (recipe.bookmarked === undefined || !recipe.bookmarked) {
    // Add bookmark
    state.bookmarks.push(recipe);
    // Mark current recipe as bookmarked
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    console.log(state.bookmarks);
  } else {
    // Remove bookmark
    state.bookmarks = state.bookmarks.filter(rec => rec.id !== recipe.id);

    // Unmark current recipe as bookmarked
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = false;
    console.log(state.bookmarks);
  }
};

export const removeBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  // Remove bookmark
  state.bookmarks.splice(index, 1);

  // Unmark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = false;
};

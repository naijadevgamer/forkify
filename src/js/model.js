import { API_URL, RES_PER_PAGE, API_KEY, RES_PER_PAGE_MOBILE } from './config';
import { AJAX, AJAXDEL } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    // resultsPerPage: RES_PER_PAGE,
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
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = !state.recipe.bookmarked;
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

export const resizeResultsPerPage = function () {
  if (window.innerWidth > 600) {
    state.search.resultsPerPage = RES_PER_PAGE;
  } else {
    state.search.resultsPerPage = RES_PER_PAGE_MOBILE;
  }
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
    // Initialize an array to store ingredients
    const ingredients = [];

    // Loop through each possible ingredient (1 to 6)
    for (let i = 1; i <= 6; i++) {
      const quantityInput = newRecipe[`ingredient-${i}-q`];
      const unitInput = newRecipe[`ingredient-${i}-u`];
      const descriptionInput = newRecipe[`ingredient-${i}-d`];

      // Check if all input fields of an igredient are empty, skip if they are
      if (!quantityInput && !unitInput && !descriptionInput) {
        continue; // Skip this iteration if any input is missing
      }

      // Check if any of the inputs of an igredient are empty  (assuming they are all required)
      if (!quantityInput || !unitInput || !descriptionInput) {
        throw new Error(`Missing or invalid input for ingredient ${i}`);
      }

      // Construct an object representing the current ingredient
      const ingObject = {
        quantity: quantityInput,
        unit: unitInput,
        description: descriptionInput,
      };

      // Push the ingredient object into the ingredients array
      ingredients.push(ingObject);
    }

    // Create a recipe object containing all relevant data, including the list of ingredients
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: newRecipe.cookingTime,
      servings: newRecipe.servings,
      ingredients,
    };

    // Send the recipe data to the server using an AJAX request
    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);

    // Update the application state with the newly created recipe
    state.recipe = createRecipeObject(data);

    // Add the new recipe to the bookmark list
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

export const deleteRecipe = async function (recipeId) {
  try {
    // Send a DELETE request to the server's API endpoint for deleting recipes
    const response = await AJAXDEL(`${API_URL}/${recipeId}?key=${API_KEY}`);

    // If the deletion was successful, remove the recipe from the bookmark list or any other relevant state
    deleteBookmark(recipeId);
  } catch (err) {
    throw err;
  }
};

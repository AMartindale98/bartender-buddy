"use strict";

import searchView from "./searchView.js";
import recipeView from "./recipeView.js";
import signupView from "./signupView.js";
import myCocktailView from "./cocktailView.js";
import homeView from "./homeView.js";
import * as model from "./model.js";
import * as helpers from "./helpers.js";

const controlSearchResults = async function () {
  try {
    const search = searchView.getSearchQuery();
    if (!search) return;
    const result = await model.loadRecipe(search);
    result.forEach((res) => searchView.displaySearchResults(res, search));
    console.log(result);
    searchView.addSearchClose();
    searchView.goToRecipe(
      result,
      controlBookmarks,
      controlBookmarks2,
      model.state.bookmarks
    );
  } catch (error) {
    searchView.displayErrorMessage();
    searchView.addSearchClose();
  }
};

const controlFeaturedRecipe = async function (recipe) {
  const result = await model.loadSingleRecipe(recipe);
  console.log(result);
  helpers.makeElsHiddenRecipe();
  recipeView.displayRecipe(result);
  recipeView.maintainBookmark(
    controlBookmarks,
    controlBookmarks2,
    result,
    model.state.bookmarks
  );
};

const controlMyCocktails = function () {
  helpers.makeElsHiddenMyCocktails();
  console.log(model.state.bookmarks);
  myCocktailView.displayMarkup(model.state.bookmarks);
  myCocktailView.deleteBookmark(controlBookmarks2, model.state.bookmarks);
  myCocktailView.createOwnRecipe(model.createMyRecipeObj);
};

const controlBookmarks = function (recipe) {
  model.saveBookmark(recipe);
};

const controlBookmarks2 = function (recipe) {
  console.log(recipe);
  model.removeBookmark(recipe);
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerRecipe(controlFeaturedRecipe);
  signupView.addHandlerSignup();
  myCocktailView.addHandlerLogin(controlMyCocktails);
  model.initBookmark();
  homeView.unhide(helpers.removeHidden);
};
init();

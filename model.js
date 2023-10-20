"use strict";
export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
  },
  bookmarks: [],
};

export const AJAX = async function (searchKey) {
  const url = `https://the-cocktail-db.p.rapidapi.com/search.php?s=${searchKey}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9453781a33mshc53c2ec93c39342p103fbajsn407173257ec9",
      "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    const parsedData = JSON.parse(result);
    const data = parsedData.drinks;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createCocktailObj = function (recipes) {
  const arrRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    let ingredients = [];
    let amount = [];
    for (let key in recipes[i]) {
      let str = new RegExp("strIngredient");
      if (str.test(key) && recipes[i][key] !== null) {
        ingredients.push(recipes[i][key]);
      }
      let str2 = new RegExp("strMeasure");
      if (str2.test(key) && recipes[i][key] !== null) {
        amount.push(recipes[i][key]);
      }
    }

    arrRecipes.push({
      id: recipes[i]["idDrink"],
      name: recipes[i]["strDrink"],
      ingredient: ingredients,
      amount: amount,
      directions: recipes[i]["strInstructions"],
      tag: recipes[i]["strTags"]
        ? [recipes[i]["strCategory"], recipes[i]["strTags"].split(",")].flat()
        : [recipes[i]["strCategory"]],
    });
  }
  return arrRecipes;
};

export const loadRecipe = async function (searchKey) {
  try {
    const data = await AJAX(searchKey);
    state.search.results = createCocktailObj(data);
    console.log(state.search.results);
    return state.search.results;
  } catch (error) {
    console.log(error);
  }
};

export const loadSingleRecipe = async function (searchKey) {
  try {
    const data = await AJAX(searchKey);
    [state.recipe] = createCocktailObj(data);
    console.log(state.recipe);
    return state.recipe;
  } catch (error) {
    console.log(error);
  }
};

export const initBookmark = function () {
  if (localStorage.getItem("bookmarks")) {
    JSON.parse(localStorage.getItem("bookmarks")).forEach((el) => {
      state.bookmarks.push(el);
    });
  }
};

export const saveBookmark = function (recipe) {
  console.log(recipe);
  state.bookmarks.push(recipe);
  persistBookmarks();
};

const persistBookmarks = function () {
  console.log(state.bookmarks);
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
  if (localStorage.getItem("bookmarks").length <= 2) {
    localStorage.clear();
  }
};

export const removeBookmark = function (recipe) {
  console.log(recipe);
  deleteBookmark(recipe);
  persistBookmarks();
};

const deleteBookmark = function (recipe) {
  const index = state.bookmarks.findIndex((el) => el.id === recipe.id);
  state.bookmarks.splice(index, 1);
};

export const createMyRecipeObj = function () {
  const valuesObj = {
    name: document.querySelector(".title").value,
    ingredient: [
      document.querySelector(".ingredient-1").value,
      document.querySelector(".ingredient-2").value,
      document.querySelector(".ingredient-3").value,
      document.querySelector(".ingredient-4").value,
    ],
    amount: [
      document.querySelector(".amount-1").value,
      document.querySelector(".amount-2").value,
      document.querySelector(".amount-3").value,
      document.querySelector(".amount-4").value,
    ],
    directions: document.querySelector("#directions").value,
  };
  console.log(valuesObj, state.bookmarks);
  saveBookmark(valuesObj);
};

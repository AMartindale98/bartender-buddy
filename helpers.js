"use strict";

export const addHidden = function (el) {
  el.classList.add("hidden");
};

export const makeElsHiddenRecipe = function () {
  const header = document.querySelector(".bg-image");
  const featuredRecipes = document.querySelector(".featured-recipes");
  const signUp = document.querySelector(".sign-up-form");
  const results = document.querySelector(".results");
  const myCocktails = document.querySelector(".my-cocktails");
  addHidden(header);
  addHidden(featuredRecipes);
  addHidden(signUp);
  addHidden(results);
  addHidden(myCocktails);
};

export const makeElsHiddenMyCocktails = function () {
  const header = document.querySelector(".bg-image");
  const featuredRecipes = document.querySelector(".featured-recipes");
  const signUp = document.querySelector(".sign-up-form");
  const results = document.querySelector(".results");
  const container = document.querySelector(".container");
  addHidden(header);
  addHidden(featuredRecipes);
  addHidden(signUp);
  addHidden(results);
  addHidden(container);
};

export const removeHidden = function (el, el2, el3, el4, el5) {
  el.classList.remove("hidden");
  el2.classList.remove("hidden");
  el3.classList.remove("hidden");
  el4.classList.add("hidden");
  el5.classList.add("hidden");
};

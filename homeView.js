"use strict";

class HomeView {
  unhide = function (handler) {
    const header = document.querySelector(".bg-image");
    const featuredRecipes = document.querySelector(".featured-recipes");
    const signUp = document.querySelector(".sign-up-form");
    const homeBtn1 = document.querySelector(".home-btn-1");
    const homeBtn2 = document.querySelector(".home-btn-2");
    const containerRecipe = document.querySelector(".container");
    const myCocktail = document.querySelector(".my-cocktails");
    const searchInput = document.querySelector(".search-input");
    homeBtn1.addEventListener("click", function () {
      handler(header, featuredRecipes, signUp, containerRecipe, myCocktail);
      searchInput.placeholder = "Search for a cocktail";
      searchInput.disabled = false;
    });
    homeBtn2.addEventListener("click", function () {
      handler(header, featuredRecipes, signUp, containerRecipe, myCocktail);
      searchInput.placeholder = "Search for a cocktail";
      searchInput.disabled = false;
    });
  };
}

export default new HomeView();

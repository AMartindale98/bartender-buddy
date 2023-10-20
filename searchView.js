"use strict";
import recipeView from "./recipeView.js";
import * as helpers from "./helpers.js";

class SearchView {
  resultsDiv = document.querySelector(".results-accordion");
  parentDiv = document.querySelector(".results");

  displaySearchResults = function (obj, query) {
    if (this.parentDiv.classList.contains("hidden")) {
      this.parentDiv.classList.remove("hidden");
      this.resultsDiv.innerHTML = "";
    }

    this.resultsDiv.insertAdjacentHTML(
      "beforeend",
      `
              <div
                class="card mx-2"
                style="max-height: 400px; max-width: 400px; display: inline-block"
              >
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img
                      src="Images/recipe-img.jpg"
                      class="search-img"
                      alt="..."
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${obj.name}</h5>
                      <p class="card-text">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Est ipsa dolores fugit aliquid exercitationem...
                      </p>
                      <p class="card-text">
                        <small class="text-muted"
                          >Tags:
                          ${obj.tag
                            .map((tag) => {
                              return `
                              <span class="badge bg-info">${tag}</span>
                              `;
                            })
                            .join("")}
                        </small>
                      </p>
                      <small>
                        <button type="button" class="btn btn-sm btn-success btn-search-view btn-${
                          obj.id
                        }" style="font-size: .75rem">Read more</button>
                      </small>
                    </div>
                  </div>
                </div>
              </div>`
    );
    document.querySelector(
      ".search-text"
    ).innerHTML = `Search Results for '${query}'`;
  };

  displayErrorMessage() {
    this.parentDiv.classList.remove("hidden");
    this.resultsDiv.innerHTML = "";
    this.resultsDiv.insertAdjacentHTML(
      "afterbegin",
      `
    <p>No results for your query :( Try again with another ingredient or drink!</p>
    `
    );
  }

  clear() {
    document.querySelector(".search-input").value = "";
  }

  getSearchQuery() {
    const search = document.querySelector(".search-input").value;
    this.clear();
    return search;
  }

  addHandlerSearch(handler) {
    const searchForm = document.querySelector(".search");
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
      const searchInput = document.querySelector(".search-input");
      searchInput.disabled = true;
    });
  }

  addSearchClose() {
    const accordionBtn = document.querySelector(".btn-close");
    accordionBtn.addEventListener("click", function () {
      const searchInput = document.querySelector(".search-input");
      const parentDiv = document.querySelector(".results");
      parentDiv.classList.add("hidden");
      const resultsDiv = document.querySelector(".results-accordion");
      resultsDiv.innerHTML = "";
      searchInput.disabled = false;
    });
  }

  goToRecipe(obj, handler, handler2, bookmarks) {
    const readMore = document.querySelectorAll(".btn-search-view");
    console.log(readMore);
    for (let i = 0; i < readMore.length; i++) {
      const objLoop = obj[i];
      readMore[i].addEventListener("click", function () {
        helpers.makeElsHiddenRecipe();
        recipeView.displayRecipe(objLoop);
        console.log(objLoop);
        const searchInput = document.querySelector(".search-input");
        searchInput.placeholder = "Click home to search";
        recipeView.maintainBookmark(handler, handler2, objLoop, bookmarks);
      });
    }
  }
}

export default new SearchView();

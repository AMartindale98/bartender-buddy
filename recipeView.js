"use strict";

class RecipeView {
  parentDiv = document.querySelector(".container");

  displayRecipe = function (obj) {
    if (this.parentDiv.classList.contains("hidden")) {
      this.parentDiv.classList.remove("hidden");
    }
    const markup = `
    <div
        class="card recipe-card d-flex justify-content-center align-content-center text-center mt-5"
        style="max-width: 500px"
      >
        <div class="card-title d-flex justify-content-between">
          <div></div>
          <h2 class="text-center">${obj.name}</h2>
          <button class="star-btn align-self-center" type="button">
            <img src="images/star-blank-icon.png" class="star align-self-center"/>
          </button>
        </div>
        <img src="Images/recipe-img.jpg" class="card-img-top" alt="" />

        <div class="card-body">
          <h6>Ingredients:</h6>
          <div class="row d-flex justify-content-center">
          ${obj.ingredient
            .map((ing, i) => {
              const number = obj["amount"][i];
              return `
              <div class="col-md-5">
                <p><span>${number ? number : ""}</span> ${ing}</p>
              </div>`;
            })
            .join("")}
          </div>
          <div class="row">
            <h6>Directions:</h6>
            <p>
              ${obj.directions}
            </p>
          </div>
          <div class="row">
          </div>
        </div>
      </div>`;
    this.parentDiv.innerHTML = "";
    this.parentDiv.insertAdjacentHTML("afterbegin", markup);
  };

  addHandlerRecipe(handler) {
    const carouselArr = [
      document.querySelector(".carousel-btn-1"),
      document.querySelector(".carousel-btn-2"),
      document.querySelector(".carousel-btn-3"),
      document.querySelector(".carousel-btn-4"),
      document.querySelector(".carousel-btn-5"),
    ];

    const featuredArr = [
      document.querySelector(".recipe-name-1").textContent,
      document.querySelector(".recipe-name-2").textContent,
      document.querySelector(".recipe-name-3").textContent,
      document.querySelector(".recipe-name-4").textContent,
      document.querySelector(".recipe-name-5").textContent,
    ];

    const container = document.querySelector(".container");

    for (let i = 0; i < carouselArr.length; i++) {
      const featuredLoop = featuredArr[i];
      carouselArr[i].addEventListener("click", function () {
        container.innerHTML = "";
        container.classList.remove("hidden");
        handler(featuredLoop.trim());
      });
    }
  }

  addBookmark(handler1, handler2, recipe) {
    const bookmark = document.querySelector(".star");
    const bookmarkBtn = document.querySelector(".star-btn");

    bookmarkBtn.addEventListener("click", function () {
      if (!this.dataset.clicked) {
        this.setAttribute("data-clicked", "true");
        bookmark.src = "images/star-fill-icon.png";
        handler1(recipe);
      } else {
        this.removeAttribute("data-clicked");
        bookmark.src = "images/star-blank-icon.png";
        handler2(recipe);
      }
    });
  }

  maintainBookmark(handler1, handler2, recipe, bookmarks) {
    const bookmark = document.querySelector(".star");
    const bookmarkBtn = document.querySelector(".star-btn");

    if (bookmarks.some((element) => element.id === recipe.id)) {
      console.log("this is happening");
      bookmark.src = "images/star-fill-icon.png";
      bookmarkBtn.addEventListener("click", function () {
        if (!this.dataset.clicked) {
          this.setAttribute("data-clicked", "true");
          bookmark.src = "images/star-blank-icon.png";
          handler2(recipe);
        } else {
          this.removeAttribute("data-clicked");
          bookmark.src = "images/star-fill-icon.png";
          handler1(recipe);
        }
      });
    } else {
      console.log("that is happening");
      this.addBookmark(handler1, handler2, recipe);
    }
  }
}

export default new RecipeView();

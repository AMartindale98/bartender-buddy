"use strict";

//could: make it so that the welcome 'username' actually gets the username. good idea there.
//eventually: MODAL FUNCTIONALITY.
class MyCocktailView {
  parentDiv = document.querySelector(".my-cocktails");
  displayMarkup = function (obj) {
    const username = document.querySelector("#username");
    if (this.parentDiv.classList.contains("hidden")) {
      this.parentDiv.classList.remove("hidden");
    }

    const markup = `
        <div class="welcome px-2">
            <h1>Welcome, ${username ? username.value : "Username"}</h1>
            <p>
                Looking for something new? Check out our
                <a class="featured-btn">featured recipes of the month.</a>
            </p>
            <button
            type="button"
            class="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#create-modal"
            >
            Create a recipe
            </button>
        </div>
        <div>
            <h2 class="text-center cocktail-header py-3">My Cocktails</h2>
            <p class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate odio,
            dignissimos sunt temporibus</p>
        </div>
        <div class="d-flex justify-content-around flex-wrap">
            ${
              obj.length > 0
                ? obj.map((item) => this.displayBookmarkMarkup(item)).join("")
                : this.displayErrorMessage()
            }
        </div>
        <div class="modal fade" id="create-modal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-md modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header m-style text-white">
                        <h3 class="modal-title">Create Your Own Cocktail</h3>
                        <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body m-header">
                        <div class="row">
                            <div class="col-md-6">
                                <input type="text" placeholder="Title" class="title" required />
                            </div>
                        </div>
                        <div class="row py-2">
                            <div class="col-md-6">
                                <input type="text" placeholder="Ingredient 1" class="ingredient-1" required />
                            </div>
                            <div class="col-md-6">
                              <input type="text" placeholder="Amount" class="amount-1" required />
                            </div>
                        </div>
                        <div class="row py-2">
                            <div class="col-md-6">
                                <input type="text" placeholder="Ingredient 2" class="ingredient-2" />
                            </div>
                            <div class="col-md-6">
                                <input type="text" placeholder="Amount" class="amount-2" />
                            </div>
                        </div>
                        <div class="row py-2">
                            <div class="col-md-6">
                                <input type="text" placeholder="Ingredient 3" class="ingredient-3" />
                            </div>
                            <div class="col-md-6">
                                <input type="text" placeholder="Amount" class="amount-3" />
                            </div>
                        </div>
                        <div class="row py-2">
                            <div class="col-md-6">
                                <input type="text" placeholder="Ingredient 4" class="ingredient-4" />
                            </div>
                            <div class="col-md-6">
                                <input type="text" placeholder="Amount" class="amount-4" />
                            </div>
                        </div>
                        <div class="row py-2">
                            <div class="col-md-6">
                                <textarea
                                name="directions"
                                id="directions"
                                cols="23"
                                rows="5"
                                placeholder="Directions"
                                required
                                ></textarea>
                            </div>
                        </div>
                      </div>
                    <div class="modal-footer m-style">
                        <button type="button" class="btn btn-dark" data-bs-dismiss="modal">
                        Close
                        </button>
                        <button type="button" class="btn btn-success create-modal-save" data-bs-dismiss="modal">Save</button>
                    </div>
                </div>
            </div>
        </div>
        `;
    this.parentDiv.innerHTML = "";
    this.parentDiv.insertAdjacentHTML("afterbegin", markup);
  };

  displayBookmarkMarkup = function (obj) {
    const markup = `
    <div
        class="card recipe-card d-flex justify-content-center align-content-center text-center mt-5"
        style="max-width: 500px"
      >
        <div class="card-title d-flex justify-content-between">
          <button class="trash-btn align-self-center" type="button">
            <img src="images/trash-icon.png" class="trash-icon align-self-center" />
          </button>
          <h2 class="text-center">${obj.name}</h2>
          <button class="star-btn align-self-center" type="button">
            <img src="images/star-fill-icon.png" class="star align-self-center"/>
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
    return markup;
  };

  displayErrorMessage = function () {
    return `
    <p class="text-center text-muted">No recipes saved yet :( Search for a cocktail and bookmark it!</p>
    `;
  };

  deleteBookmark(handler, recipe) {
    console.log("working");
    const bookmark = document.querySelectorAll(".trash-btn");

    for (let i = 0; i < bookmark.length; i++) {
      bookmark[i].addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this recipe?") === true) {
          const currentRec = recipe[i];
          console.log(currentRec);
          handler(currentRec);
          bookmark[i].closest(".recipe-card").remove();
          return recipe;
        } else return;
      });
    }
  }

  addHandlerLogin = function (handler) {
    const myCocktailBtn = document.querySelector(".my-cocktail-btn");
    const loginform = document.querySelector(".login-form");
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    myCocktailBtn.addEventListener("click", function () {
      handler();
    });
    loginform.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
      username.value = "";
      password.value = "";
    });
  };

  addHandlerFeatureTravel = function (handler) {
    const featuredBtn = document.querySelector(".featured-btn");
    featuredBtn.addEventListener("click", function () {
      handler();
    });
  };

  createOwnRecipe = function (handler) {
    const modal = document.querySelector("#create-modal");
    const modalSave = document.querySelector(".create-modal-save");
    modalSave.addEventListener("click", function () {
      handler();
      alert("Recipe saved!");
      location.reload();
    });
  };
}

export default new MyCocktailView();

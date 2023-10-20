"use strict";

class signupView {
  parentDiv = document.querySelector(".sign-up-form");

  addHandlerSignup() {
    this.parentDiv.addEventListener("submit", function () {
      alert(
        "You have successfully signed up! Please check your email to get started."
      );
      document.querySelector("#username-signup").value = "";
      document.querySelector("#password-signup").value = "";
      document.querySelector("#email").value = "";
    });
  }
}

export default new signupView();

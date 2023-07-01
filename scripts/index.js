const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector('.popup');

const closeProfileButton = editProfilePopup.querySelector(".popup__button-close");
const formElementProfile = editProfilePopup.querySelector(".popup__form");

const titleElement = document.querySelector(".profile__title");
const subtitleElement = document.querySelector(".profile__subtitle");

const userNameInput = editProfilePopup.querySelector(".popup__input_name");
const userAboutInput = editProfilePopup.querySelector(".popup__input_user_about");


function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

function openProfilePopup() {
    openPopup(editProfilePopup);
    userNameInput.value = titleElement.textContent;
    userAboutInput.value = subtitleElement.textContent;
}

function formSubmitProfile(evt) {
    evt.preventDefault();
    titleElement.textContent = userNameInput.value;
    subtitleElement.textContent = userAboutInput.value;
    closePopup(editProfilePopup);
  }
  
  
  editProfileButton.addEventListener("click", function () {
    openProfilePopup();
  });
  
  
  closeProfileButton.addEventListener("click", function () {
    closePopup(editProfilePopup);
  });
  
  
  formElementProfile.addEventListener("submit", formSubmitProfile);  
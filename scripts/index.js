// Темплейт
const itemTemplate = document.getElementById("item__template").content

// Попапы
// новое место
const placePopup = document.getElementById("popup_place")
// редактирование профиля
const profilePopup = document.getElementById("popup_profile")
// большой картинки
const picturePopup = document.getElementById("popup_picture")

// Кнопки открытия попапов
const editButtonProfile = document.querySelector(".profile__edit-button")
const openPlacePopupButton = document.querySelector(".profile__button")

// Все кнопки закрытия попапов
const closePopupButtonProfile = profilePopup.querySelector(".popup__close")
const closePopupButtonPlace = placePopup.querySelector(".popup__close")
const closePopupButtonBigImage = picturePopup.querySelector(".popup__close")

// Все попапы сохранены в одной
// переменной popups(множественное число)
const popups = document.querySelectorAll(".popup")

// Формы
const profileForm = document.querySelector(".popup__form_form")
const placeForm = document.getElementById("place__form")

// Поля форм по их name в конкретной форме html разметки
// поля редактирования попапа
const nameValue = profileForm.elements.name
const jobValue = profileForm.elements.job

// поля попапа новое место
const titleplaceValue = placeForm.elements.name
const linkPlaceValue = placeForm.elements.link

// Константы
const nameInputContent = document.querySelector(".profile__title")
const jobInputContent = document.querySelector(".profile__subtitle")
const cardsAddContainer = document.querySelector(".elements__list")
const titlePicturePopup = document.querySelector(".popup__title-picture")
const elementTitle = document.querySelector(".element__title")
const imgPicturePopup = document.querySelector(".popup__image-picture")

/////////////////////
///     ФУНКЦИИ   ///
/////////////////////

function openPopup(popup) {
  popup.classList.add("popup_opened")
}

function closePopup(popup) {
  popup.classList.remove("popup_opened")
}

// попап открытия редактирования профиля и присвоение полей с данными
function openPopupFormProfile() {
  openPopup(profilePopup)
  nameValue.value = nameInputContent.textContent
  jobValue.value = jobInputContent.textContent
}

// отправка формы редактирования данных профиля
function handleProfileFormSubmit(event) {
  event.preventDefault()
  nameInputContent.textContent = nameValue.value
  jobInputContent.textContent = jobValue.value
  closePopup(profilePopup)
}

// открываю попап с местами (добавление карточек)
function openPopupPlace() {
  openPopup(placePopup)
}

/////////////////////////////////
///     ОБРАБОТЧИКИ КЛИКОВ   ///
///////////////////////////////

editButtonProfile.addEventListener("click", openPopupFormProfile)

openPlacePopupButton.addEventListener("click", openPopupPlace)

profileForm.addEventListener("submit", handleProfileFormSubmit)

placeForm.addEventListener("submit", handlePlaceFormSubmit)

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) closePopup(popup)
  })
})

//закрытие попапа при клике на крестик для имени и о себе
closePopupButtonProfile.addEventListener("click", () => {
  closePopup(profilePopup)
})

//закрытия попапа добавления карточки
closePopupButtonPlace.addEventListener("click", () => {
  closePopup(placePopup)
})

//закрытие попапа большой картинки
closePopupButtonBigImage.addEventListener("click", () => {
  closePopup(picturePopup)
})

/////////////////////
///     ФУНКЦИИ   ///
/////////////////////

function openPicturePopup(name, link) {
  picturePopup.classList.add("popup_opened")
  imgPicturePopup.src = link
  imgPicturePopup.alt = name
  titlePicturePopup.textContent = name
  openPopup(picturePopup)
}

function generateCard(value) {
  //клонирую карточку
  const card = itemTemplate.querySelector(".element").cloneNode(true)
  if (card) {
    const title = card.querySelector(".element__title")
    const img = card.querySelector(".element__img")
    const trash = card.querySelector(".element__trash")
    const like = card.querySelector(".element__like")

    if (title && img && trash && like) {
      //заполняю контентом
      title.textContent = value.name
      img.src = value.link
      img.alt = value.name

      like.addEventListener("click", toggleLike)

      trash.addEventListener("click", () => {
        card.remove()
      })

      img.addEventListener("click", () => {
        openPicturePopup(value.name, value.link)
      })
    }
  }
  return card
}

function renderCard(card, container) {
  container.prepend(card)
}

function render() {
  initialCards.forEach((value) => {
    const newCard = generateCard(value)
    if (newCard) renderCard(newCard, cardsAddContainer)
  })
}

render()

function toggleLike(event) {
  event.target.classList.toggle("element__like_active")
}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault()
  const name = titleplaceValue.value
  const link = linkPlaceValue.value
  const newCard = generateCard({ name, link })
  if (newCard) renderCard(newCard, cardsAddContainer)
  closePopup(placePopup)
  placeForm.reset()
}

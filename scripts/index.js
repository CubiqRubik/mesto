const itemTemplate = document.getElementById('item__template').content;
const openPlace = document.getElementById('popup_place');
const openForm = document.getElementById('popup_form');
const openPicture = document.getElementById('popup_picture');
const editbutton = document.querySelector('.profile__edit-button');
const popup = document.querySelectorAll('.popup');
const сlosePopupButton = document.querySelectorAll('.popup__close');
const formElement = document.querySelector('.popup__form');
const nameInputContent = document.querySelector('.profile__title')
const jobInputContent = document.querySelector('.profile__subtitle')
const nameValue = document.getElementById('name')
const jobValue = document.getElementById('job')
const cardsAdd = document.querySelector('.elements__list');
const openPlacePopup = document.querySelector('.profile__button');
const imgPicturePopup = document.querySelector('.popup__image-picture');
const titlePicturePopup = document.querySelector('.popup__title-picture');
const elementImg = document.querySelectorAll('.element__img');
const elementTitle = document.querySelector('.element__title');
const titleplaceValue = document.getElementById('place')
const linkPlaceValue = document.getElementById('url')
const placeForm = document.getElementById('place__form')

generateCards()
editbutton.addEventListener('click', openPopupForm)
openPlacePopup.addEventListener('click', openPopupPlace)
openPlace.addEventListener('click', openPopupPlace)
formElement.addEventListener('submit', formSubmitHandler);
placeForm.addEventListener('submit', placeSubmitHandler);


function closePopupHandle(event) {
    if (!event.target.closest('.popup__container') || event.target.closest('.popup__close')) {
        closePopup(event.target.closest('.popup'));
    }
}
popup.forEach(function (popup) {
    popup.addEventListener('click', closePopupHandle);
})
function openPopup(popup) {
    popup.classList.add('popup_opened');
}
function closePopup(popup) {
    popup.classList.remove('popup_opened');
};
// попап формы для открытия 
function openPopupForm() {
    openPopup(openForm)
    nameValue.value = nameInputContent.textContent
    jobValue.value = jobInputContent.textContent
}
// попап формы для изменений 
function formSubmitHandler(event) {
    event.preventDefault()
    nameInputContent.textContent = nameValue.value
    jobInputContent.textContent = jobValue.value
    closePopup(openForm)
}
// открываю попап с местами (добавление карточек)
function openPopupPlace() {
    openPopup(openPlace)
}
// добавление карточек
function placeSubmitHandler(evt) {
    evt.preventDefault();  
    const card = createCard({
        name: titleplaceValue.value, 
        link: linkPlaceValue.value
    })
    cardsAdd.append(card); // добавл контент в html
    closePopup(openPlace);
    addlike()
    removeCard()
    openPicturePlace()
}
function generateCards() {
    initialCards.forEach((item, index) => {
        let card = createCard(item)
        cardsAdd.append(card)
    })
    addlike()
    removeCard()
    openPicturePlace()
}
function createCard(cardData) {
    //клонирую карточку 
    const template = itemTemplate.cloneNode(true);
    //заполняю контентом
    template.querySelector("img").setAttribute("src", cardData.link);
    template.querySelector("img").setAttribute("alt", cardData.name);
    template.querySelector(".element__title").textContent = cardData.name;
    return template
}
// начало лайка
function addlike() {
    const likeButtons = document.querySelectorAll('.element__like');
    likeButtons.forEach((button) => {
        button.addEventListener('click', addLikeHandle)
    })
}
function addLikeHandle(event) {
    event.target.classList.toggle('element__like_active');
};
// конец лайка

// начало удаления
function removeCard() {
    const trashButtons = document.querySelectorAll('.element__trash');
    trashButtons.forEach((button) => {
        button.addEventListener('click', removeCardHandle)
    })
}
function removeCardHandle(event) {
    event.target.closest('.element').remove();
};

// конец удаления

// открываем персонально каждую карточку
function openPicturePlace() {
    const elementImg = document.querySelectorAll('.element__img');
    elementImg.forEach((button) => {
        button.addEventListener('click', openPlacePicturuPopup)
    })
}
function openPlacePicturuPopup(event) {
    imgPicturePopup.src = event.target.src;
    imgPicturePopup.alt = event.target.alt;
    titlePicturePopup.textContent = event.target.alt;
    openPopup(openPicture);
}

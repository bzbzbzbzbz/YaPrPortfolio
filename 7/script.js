const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Нургуш',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
  },
  {
    name: 'Тулиновка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
  },
  {
    name: 'Остров Желтухина',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
  },
  {
    name: 'Владивосток',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
  }
];

// Создание карточки
function addNewCard(name, link) {
  const placesList = document.querySelector('.places-list');

  // place-card
  const placeCard = document.createElement('div');
  placesList.appendChild(placeCard);
  placeCard.classList.add('place-card');

  // place-card__image
  const placeImage = document.createElement('div');
  placeCard.appendChild(placeImage);
  placeImage.classList.add('place-card__image');
  placeImage.setAttribute('style', `background-image: url(${link})`);

  // place-card__delete-icon
  const placeButtonDel = document.createElement('button');
  placeImage.appendChild(placeButtonDel);
  placeButtonDel.classList.add('place-card__delete-icon');

  // place-card__description
  const placeDescription = document.createElement('div');
  placeCard.appendChild(placeDescription);
  placeDescription.classList.add('place-card__description');

  // place-card__name
  const placeHeader = document.createElement('h3');
  placeDescription.appendChild(placeHeader);
  placeHeader.classList.add('place-card__name');
  placeHeader.textContent = name;

  // place-card__like-icon
  const placeButtonLike = document.createElement('button');
  placeDescription.appendChild(placeButtonLike);
  placeButtonLike.classList.add('place-card__like-icon');

  // Удалить карточку
  // Поставить лайк
  // Окрыть карточку
  setCardButtons(placeButtonLike, placeButtonDel, placeImage, placeCard, link);
}

// Добавление стоковых карточек
function addStockCards(initialCards) {
  initialCards.forEach((item) => addNewCard(item.name, item.link))
}

addStockCards(initialCards);

// Попап с картинкой
const popupPlaceImage = document.querySelector('.popup__image');
const popupPlace = document.querySelector('.popup_card-image');
const cardImageClose = document.querySelector('.popup__close_card-image');
cardImageClose.addEventListener('click', () => closePopup(popupPlace));



// EDITINFO

// Попап с editInfo
const editInfoButton = document.querySelector('.user-info__edit');
const editInfoPopup = document.querySelector('.popup_edit-info');
const editInfoClose = document.querySelector('.popup__close_edit-info');
const editInfoForm = document.forms.info;
const initials = document.querySelector('.user-info__name');
const about = document.querySelector('.user-info__job');
const emptyErrorMessages = document.querySelectorAll('span');

// Открытие-закрытие editInfo
editInfoButton.addEventListener('click', function (event) {
  // Надо исправить -- дублирование кода
  // Чистку ошибок вынести в отдельный метод
  emptyErrorMessages.forEach((input) => input.textContent = '');
  editInfoForm.initials.value = initials.textContent;
  editInfoForm.about.value = about.textContent;
  openPopup(editInfoPopup);
});

editInfoClose.addEventListener('click', () => closePopup(editInfoPopup));

// submit editInfoForm
editInfoForm.addEventListener('submit', submitEditInfoForm)

// Ввод с проверкой editInfo
editInfoForm.addEventListener('input', inputValidation)



// ADDCARD

// Попап с addCard
const addCardButton = document.querySelector('.user-info__button');
const addCardPopup = document.querySelector('.popup_add-card');
const addCardClose = document.querySelector('.popup__close_add-card')
const addCardForm = document.forms.new;

// Открытие-закрытие addCard
addCardButton.addEventListener('click', function (event) {
  // Надо исправить -- дублирование кода
  // Чистку ошибок вынести в отдельный метод
  emptyErrorMessages.forEach((input) => input.textContent = '');
  openPopup(addCardPopup);
  addCardForm.reset();
});
addCardClose.addEventListener('click', () => closePopup(addCardPopup));

// submit addCard
addCardForm.addEventListener('submit', submitAddCardForm);

// Ввод с проверкой addCard
addCardForm.addEventListener('input', inputValidation);



// ПРОВЕРКА

// Проверка input
function inputValidation(event) {
  const currentInput = event.target;
  const currentForm = event.currentTarget;
  const currentButton = currentForm.querySelector('button');

  inputInnerCheck(currentInput, currentForm);
  setSubmitButtonState(currentForm, currentButton);
}

// Проверка каждого поля и выдача значения
function inputInnerCheck(input, form) {
  const inputFieldCheck = input.validity;

  const errorMessages = {
    valueMissing: 'Это обязательное поле',
    tooShort: 'Должно быть от 2 до 30 символов',
    typeMismatch: 'Здесь должна быть ссылка',
  }

  if (inputFieldCheck.tooShort) {
    input.setCustomValidity(errorMessages.tooShort)
    errorMessage(input, form);
    return false
  }

  if (inputFieldCheck.valueMissing) {
    input.setCustomValidity(errorMessages.valueMissing);
    errorMessage(input, form);
    return false
  }

  if (inputFieldCheck.typeMismatch) {
    input.setCustomValidity(errorMessages.typeMismatch);
    errorMessage(input, form);
    return false
  }

  input.setCustomValidity('');
  errorMessage(input, form);
  return true
}

// Изменение текста
function errorMessage(input, form) {
  const currentID = input.id;
  const currentSpan = form.querySelector(`#${currentID}-error`);
  currentSpan.textContent = input.validationMessage;
}

//Изменение кнопки

// Можно лучше
// Передавать не инпут а заначение input.checkValidity(), чтобы получить логический флаг на входе
function setSubmitButtonState(input, button) {
  if (input.checkValidity()) {
    button.removeAttribute('disabled')
    button.classList.add('button_is-verified')
  } else {
    button.setAttribute('disabled', 'disabled')
    button.classList.remove('button_is-verified')
  }
}

// МЕТОДЫ

// Submit формы
function submitAddCardForm(event) {
  event.preventDefault();
  const name = addCardForm.elements.name.value;
  const link = addCardForm.elements.link.value;
  addNewCard(name, link);
  closePopup(addCardPopup);
  addCardForm.reset();
}

function submitEditInfoForm(event) {
  event.preventDefault();
  initials.textContent = editInfoForm.initials.value;
  about.textContent = editInfoForm.about.value;
  closePopup(editInfoPopup);
}

// Открытие попапа
function openPopup(modalWindow) {
  modalWindow.classList.add('popup_is-opened');
}

// Закрытие попапа
function closePopup(modalWindow) {
  modalWindow.classList.remove('popup_is-opened');
}

// Метод удаления карточки
// Метод лайка
// Метод открытия фото
function setCardButtons(likeButton, deleteButton, photoButton, child, photoLink) {
  deleteButton.addEventListener('click', function (event) {
    child.remove();
    event.stopPropagation();
  });

  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('place-card__like-icon_liked');
  });

  photoButton.addEventListener('click', function (event) {
    popupPlaceImage.src = photoLink;
    openPopup(popupPlace);
  });
}

// Добрый день!
// Есть одна ошибка, но я думаю вы ее исправите самостоятельно
//
// ## Итог:

// - Код работает, нет синтаксических и других ошибок
// - Добавлена кнопка Edit, по нажатию она открывает попап редактирования профиля
// - Форма редактирования профиля умеет редактировать соответствующие поля страницы — имя и о себе
// - По клику на картинку карточки, соответствующая фотография открывается в попапе
// - В формах редактирования профиля и добавления новой карточки кнопки сабмита должны заблокированы
//   если хотя бы одно из полей форм пустое
// - В форме редактирования профиля работает лайв-валидация
// - Валидация полей описана одной функцией
// - Форма и ошибки сбрасываются после отправки данных
// - Нарушение DRY (Дублирование больших фрагментов кода) (с одним исключением)
// - Сделано дополнительное задание

// Работа принята
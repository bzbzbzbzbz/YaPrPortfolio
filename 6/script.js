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

const popup = document.querySelector('.popup');
const popupOpen = document.querySelector('.user-info__button');
const popupClose = document.querySelector('.popup__close');
const popupForm = document.forms.new;

function addCard (name, link) {
  const placesList = document.querySelector('.places-list');
  const placeCard = document.createElement('div');
  const placeImage = document.createElement('div');
  const placeImageLink = 'background-image: url(' + link + ')';
  const placeButtonDel = document.createElement('button');
  const placeDescription = document.createElement('div');
  const placeHeader = document.createElement('h3');
  const placeButtonLike =  document.createElement('button');

  placeCard.classList.add('place-card');
  placeImage.classList.add('place-card__image');
  placeButtonDel.classList.add('place-card__delete-icon');
  placeDescription.classList.add('place-card__description');
  placeHeader.classList.add('place-card__name');
  placeButtonLike.classList.add('place-card__like-icon');

  placesList.appendChild(placeCard);
  placeCard.appendChild(placeImage);
  placeImage.appendChild(placeButtonDel);
  placeCard.appendChild(placeDescription);
  placeDescription.appendChild(placeHeader);
  placeDescription.appendChild(placeButtonLike);
//Можно лучше: event не используется внутри функции, лучше его удалить из аргументов
  placeButtonDel.addEventListener('click', function(event) {
    placesList.removeChild(placeCard);
  })
  
  placeButtonLike.addEventListener('click', function(event) {
    placeButtonLike.classList.toggle('place-card__like-icon_liked')
  })

  placeImage.setAttribute('style', placeImageLink);

  placeHeader.textContent = name;
}

function addStockCards(initialCards) {
  initialCards.forEach((item) => {
    addCard(item.name, item.link);
  })
};
//Надо добавить глагол в название
function popupState() {
  popup.classList.toggle('popup_is-opened');
};

popupOpen.addEventListener('click', popupState);
popupClose.addEventListener('click', popupState);

popupForm.addEventListener('submit', function(event) {

  const name = popupForm.elements.name.value;
  const link = popupForm.elements.link.value;

  addCard(name, link);
  popupState();
  popupForm.reset();
  event.preventDefault();
})

addStockCards(initialCards);

//Можно лучше: Стоит очищать форму не только после добавления карточки, но и при закрытии попапа на крестик. Это своего рода кнопка отмены изменений. При повторном открытии форма должна быть пуста.
//Можно лучше: Сброс формы стоит вынести в отдельную функцию, принимающую на вход форму. Так можно сбрасывать одной функцией неограниченное количество форм.

/*Отлично:
Код хорошо структурирован и стилизован
Код краток и лаконичен
Пользовательские данные безопасно вставляются на страницу.
Функционал полностью соответствует заданию
Отсутствуют неиспользуемые переменные и функции*/

//Отличная работа. Задание принято. Спасибо за проработку всех комментариев.
//Просьба не оставлять без внимания не критичные комментарии. Рефакторинг - неотъемлемая часть работы программиста. Всегда нужно стараться делать код лучше.
//Перед отправкой на проверку следующего спринта необходимо очистить код от комментариев предыдущего спринта. Спасибо.
//Успехов в дальнейшем обучении.

(function () {
    const addCardPopup = document.querySelector('.popup_add-card');
    const editInfoPopup = document.querySelector('.popup_edit-info');
    const cardImagePopup = document.querySelector('.popup_card-image');

    const cardPopup = new Popup(addCardPopup);
    const editPopup = new Popup(editInfoPopup);
    const imagePopup = new Popup(cardImagePopup);

    const domElement = document.querySelector('.places-list');
    const errorMessages = {
        valueMissing: 'Это обязательное поле',
        tooShort: 'Должно быть от 2 до 30 символов',
        typeMismatch: 'Здесь должна быть ссылка',
    }

    const openAddCardPopupButton = document.querySelector('.user-info__button');
    const addCardForm = document.forms.new;
    const verifyAddCardForm = new FormValidator(addCardForm, errorMessages);
    verifyAddCardForm.setEventListeners();
    openAddCardPopupButton.addEventListener('click', function () {
        cardPopup.open();
    })
    addCardForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const newData = {
            name: addCardForm.name.value,
            link: addCardForm.link.value,
        }
        const newCardBlank = new Card(newData).create();
        /*
            Можно лучше: не создавать экземпляр при каждом вызове функции, а 
            создать один раз, как это сделано с попапми
        */
        const attachNewCardBlank = new CardList(domElement);
        attachNewCardBlank.addCard(newCardBlank);

        /*
        Можно лучше: обработчик на картинку навешивать в классе Card, иначе
        нарушается принцип единственной ответсвенности
        А в конструктор Card передавать колбэк который умеет открывать попап

        Пример кода:
        //функция которая принимает картинку и открывает попап
        function openImagePopup(link) {
            document.querySelector('.popup__image').src = link;
            imagePopup.open();
        }

        const newCard = new Card(cardData, openImagePopup); //передаем карточке колбэк openImagePopup 

        //в класс карточки передается колбэк, она вызывает переданный ей колбэк передавая в него url картинки
        class Card {
            constructor(cardData, openImageCallback) {
                ......
                this.openImageCallback = openImageCallback;
            }

            openImage() {   //обработчик клика по картинке
                this.openImageCallback(this.link);
            }
        }

    */
        newCardBlank.querySelector('.place-card__image').addEventListener('click', function (event) {
            /*
                Можно лучше: элемент .popup__image можно найти один раз, а не искать при каждом вызове функции
            */
            document.querySelector('.popup__image').src = event.currentTarget.style.backgroundImage.slice(5, -2);
            imagePopup.open();
        })
        addCardForm.reset();
        addCardPopup.classList.remove('popup_is-opened');
    })

    const openEditInfoPopupButton = document.querySelector('.user-info__edit');
    const editInfoForm = document.forms.info;
    const verifyEditInfoForm = new FormValidator(editInfoForm, errorMessages);
    verifyEditInfoForm.setEventListeners();
    openEditInfoPopupButton.addEventListener('click', function (event) {
        editInfoForm.initials.value = nameInfo.textContent;
        editInfoForm.about.value = jobInfo.textContent;
        editPopup.open();
    })
    const nameInfo = document.querySelector('.user-info__name');
    const jobInfo = document.querySelector('.user-info__job');
    editInfoForm.addEventListener('submit', function (event) {
        const newNameInfo = editInfoForm.initials.value;
        const newJobInfo = editInfoForm.about.value;
        event.preventDefault();
        const newInfo = new UserInfo(nameInfo, jobInfo);
        newInfo.setUserInfo(newNameInfo, newJobInfo);
        newInfo.updateUserInfo();
        editInfoPopup.classList.remove('popup_is-opened');
    })

    const stockCards = initialCards.map(cardData => {
        const newCard = new Card(cardData);
        return newCard.create();
    })

    const newCard = new CardList(domElement);
    newCard.render(stockCards);

    const openCardImageButton = document.querySelectorAll('.place-card__image');
    openCardImageButton.forEach(function (item) {
        item.addEventListener('click', function (event) {
            document.querySelector('.popup__image').src = event.currentTarget.style.backgroundImage.slice(5, -2);
            imagePopup.open();
        })
    });
}())

/*
  Отлично, критические замечания исправлены
  Советую поработать ещё над замечаниями "Можно лучше", особенно над передачей 
  колбэка на открытие попапа в класс Card

  Если захотите углубиться в тему ООП и рефакторинга оставлю пару ссылок:
  https://ota-solid.now.sh/ - принципы проектирования SOLID применяемые для проектирования ООП программ  
  https://refactoring.guru/ru/design-patterns - паттерны проектирования
  https://refactoring.guru/ru/refactoring - рефакторинг

  Успехов в дальнейшем обучении!
*/
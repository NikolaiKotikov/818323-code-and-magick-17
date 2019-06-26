'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userDialog = document.querySelector('.setup');
var openUserDialog = document.querySelector('.setup-open');
var closeUserDialog = userDialog.querySelector('.setup-close');
var setupPlayer = document.querySelector('.setup-player');
var wizardCoat = setupPlayer.querySelector('.wizard-coat');
var wizardEyes = setupPlayer.querySelector('.wizard-eyes');
var setupFireballWrap = setupPlayer.querySelector('.setup-fireball-wrap');
var fireballInput = setupPlayer.querySelector('input[name="fireball-color"]');
var wizardCoatInput = setupPlayer.querySelector('input[name="coat-color"]');
var wizardEyesInput = setupPlayer.querySelector('input[name="eyes-color"]');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

/**
 * Функция, которая возвращает случайное число в заданном диапазоне,
 * ВКЛЮЧАЯ нижнее и верхнее значения.
 * @param {Number} minNumber - нижняя граница диапазона;
 * @param {number} maxNumber - верхняя граница диапазона;
 * @return {number} - возвращает случайное число;
 */
var getRandomNumber = function (minNumber, maxNumber) {
  return Math.floor(Math.random() * (maxNumber + 1 - minNumber) + minNumber);
};

/**
 * Функция для получения случайного элемента массива;
 * @param {Array} arr - принимает в качестве аргумента массив;
 * @return {Number} - возвращает случайный элемент;
 */
var getRandomElement = function (arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
};

var getWizardFullName = function (names, surnames) {
  return getRandomElement(names) + ' ' + getRandomElement(surnames);
};

/**
 * Функция генерирует массив с заданным количеством волшебников;
 * @param {Number} amount - количество волшебников;
 * @return {Array} возвращает сгенерированный массив;
 */
var generateWizards = function (amount) {
  var wizards = [];

  for (var i = 0; i < amount; i++) {
    var wizardDescription = {};
    var wizardFullName = getWizardFullName(WIZARD_NAMES, WIZARD_SURNAMES);
    var wizardCoatColor = getRandomElement(WIZARD_COAT_COLORS);
    var wizardEyesColor = getRandomElement(WIZARD_EYES_COLORS);

    wizardDescription.name = wizardFullName;
    wizardDescription.coatColor = wizardCoatColor;
    wizardDescription.eyesColor = wizardEyesColor;
    wizards.push(wizardDescription);
  }

  return wizards;
};

/**
 * Функция клонирует элемент из шаблона и настраивает его в соответствии с переданными
 * в нее данными об этом элементе;
 * @param {Object} wizard - принимает объект с данными для настройки;
 * @return {*} - возвращает ноду, готовую для добавления в DOM;
 */
var createWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

/**
 * функция для заполнения блока DOM-элементами на основе массива JS-объектов
 * @param {array} wizards - принимает массив JS-объектов
 */
var renderWizard = function (wizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(createWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var openPopup = function () {
  userDialog.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);

  closeUserDialog.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });
};

var changeElementColor = function (colors, element, elementInput) {
  var color = getRandomElement(colors);

  if (elementInput.name === 'fireball-color') {
    element.style.background = color;
  } else {
    element.style.fill = color;
  }
  elementInput.value = color;
};

wizardCoat.addEventListener('click', function () {
  changeElementColor(WIZARD_COAT_COLORS, wizardCoat, wizardCoatInput);
});

wizardEyes.addEventListener('click', function () {
  changeElementColor(WIZARD_EYES_COLORS, wizardEyes, wizardEyesInput);
});

setupFireballWrap.addEventListener('click', function () {
  changeElementColor(FIREBALL_COLORS, setupFireballWrap, fireballInput);
});

renderWizard(generateWizards(4));
userDialog.querySelector('.setup-similar').classList.remove('hidden');

openUserDialog.addEventListener('click', function () {
  openPopup();
});

openUserDialog.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

closeUserDialog.addEventListener('click', function () {
  closePopup();
});

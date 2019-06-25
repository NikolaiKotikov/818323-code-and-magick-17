'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};
var getWizardFullName = function (names, surnames) {
  return getRandomElement(names) + ' ' + getRandomElement(surnames);
};

var createWizards = function (amount) {
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

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var createFragment = function () {
  var fragment = document.createDocumentFragment();
  var wizards = createWizards(4);
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};
createFragment();
userDialog.querySelector('.setup-similar').classList.remove('hidden');

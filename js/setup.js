'use strict';

(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var userDialog = document.querySelector('.setup');
  var form = userDialog.querySelector('.setup-wizard-form');
  var openUserDialog = document.querySelector('.setup-open');
  var closeUserDialog = userDialog.querySelector('.setup-close');
  var setupPlayer = document.querySelector('.setup-player');
  var wizardCoat = setupPlayer.querySelector('.wizard-coat');
  var wizardEyes = setupPlayer.querySelector('.wizard-eyes');
  var setupFireballWrap = setupPlayer.querySelector('.setup-fireball-wrap');
  var fireballInput = setupPlayer.querySelector('input[name="fireball-color"]');
  var wizardCoatInput = setupPlayer.querySelector('input[name="coat-color"]');
  var wizardEyesInput = setupPlayer.querySelector('input[name="eyes-color"]');

  /**
   * Функция для получения случайного элемента массива;
   * @param {Array} arr - принимает в качестве аргумента массив;
   * @return {Number} - возвращает случайный элемент;
   */
  var getRandomElement = function (arr) {
    return arr[window.getRandomNumber(0, arr.length - 1)];
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var onCloseUserDialogEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.save(new FormData(form), closePopup(), onErrorLoad());
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    document.removeEventListener('keydown', onCloseUserDialogEnterPress);
    form.removeEventListener('submit', onFormSubmit);
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress);

    closeUserDialog.addEventListener('keydown', onCloseUserDialogEnterPress);

    form.addEventListener('submit', onFormSubmit);

    userDialog.style.left = '50%';
    userDialog.style.top = '80px';
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
  var coatColor;
  wizardCoat.addEventListener('click', function () {
    changeElementColor(WIZARD_COAT_COLORS, wizardCoat, wizardCoatInput);
    coatColor = wizardCoat.style.fill;

    window.debounce(updateWizards, 500);
  });
  var eyesColor;
  wizardEyes.addEventListener('click', function () {
    changeElementColor(WIZARD_EYES_COLORS, wizardEyes, wizardEyesInput);
    eyesColor = wizardEyes.style.fill;

    window.debounce(updateWizards, 500);
  });

  setupFireballWrap.addEventListener('click', function () {
    changeElementColor(FIREBALL_COLORS, setupFireballWrap, fireballInput);
  });

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

  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    }

    if (left < right) {
      return -1;
    }

    return 0;
  };

  var updateWizards = function () {
    window.render(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var onSuccessLoad = function (data) {
    wizards = data;
    updateWizards();
  };

  var renderError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onErrorLoad = function (errorMessage) {
    renderError(errorMessage);
  };

  window.backend.load(onSuccessLoad, onErrorLoad);

})();

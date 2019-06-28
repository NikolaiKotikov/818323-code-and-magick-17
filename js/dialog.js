'use strict';

var setup = document.querySelector('.setup');
var upload = setup.querySelector('.upload');
var shopElement = document.querySelector('.setup-artifacts-shop');
var draggedItem = null;

upload.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var dragged = false;

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: moveEvt.clientX - startCoords.x,
      y: moveEvt.clientY - startCoords.y
    };

    if ((shift.x !== 0) || (shift.y !== 0)) {
      dragged = true;
    }

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setup.style.left = (setup.offsetLeft + shift.x) + 'px';
    setup.style.top = (setup.offsetTop + shift.y) + 'px';
  };

  var onMouseUp = function (upEvt) {

    if (dragged) {
      var onMouseClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        upload.removeEventListener('click', onMouseClickPreventDefault);
      };
      upload.addEventListener('click', onMouseClickPreventDefault);
    }
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

shopElement.addEventListener('dragstart', function (evt) {
  if (evt.target.tagName.toLowerCase() === 'img') {
    draggedItem = evt.target;
    evt.dataTransfer.setData('text/plain', evt.target.alt);
  }
});

var artifactsElement = document.querySelector('.setup-artifacts');

artifactsElement.addEventListener('dragover', function (evt) {
  evt.preventDefault();
  return false;
});

artifactsElement.addEventListener('drop', function (evt) {
  evt.target.style.backgroundColor = '';
  evt.target.appendChild(draggedItem);
});


artifactsElement.addEventListener('dragenter', function (evt) {
  evt.target.style.backgroundColor = 'yellow';
  evt.preventDefault();
});

artifactsElement.addEventListener('dragleave', function (evt) {
  evt.target.style.backgroundColor = '';
  evt.preventDefault();
});

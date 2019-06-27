'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var COLUMN_WIDTH = 40;
var COLUMN_HEIGHT = 150;
var COLUMN_GAP = 50;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TEXT_GAP = 20;
var SUCCESS_MESSAGES = ['Ура вы победили!', 'Список результатов:'];

var playerNameY = CLOUD_Y + CLOUD_HEIGHT - TEXT_GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var printText = function (ctx, strings) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';

  for (var i = 0; i < strings.length; i++) {
    ctx.fillText(strings[i], CLOUD_X + GAP * 2, CLOUD_Y + GAP + TEXT_GAP + TEXT_GAP * i);
  }
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

/**
 * Вспомогательная функция для рассчета координаты X во избежание дублирования кода
 * @param {Number} number - порядковый номер игрока (отсчёт ведётся от нуля);
 * @return {Number}
 */
var getX = function (number) {
  return CLOUD_X + TEXT_GAP * 2 + (COLUMN_WIDTH + COLUMN_GAP) * number;
};

/**
 * Функция для вывода данных имени и времени игрока в текстовом виде.
 * @param {*} ctx
 * @param {Number} timeText - время игрока;
 * @param {Number} timeY - координата 'Y' сообщения о времени;
 * @param {String} nameText - имя игрока;
 * @param {Number} nameY - координата 'Y' сообщения об имени;
 * @param {Number} number - порядковый номер игрока (отсчёт ведётся от нуля);
 */
var renderStatsText = function (ctx, timeText, timeY, nameText, nameY, number) {
  ctx.fillText(Math.round(timeText), getX(number), timeY);
  ctx.fillText(nameText, getX(number), nameY);
};

/**
 *  Функция для отрисовки колонны.
 * @param {*} ctx
 * @param {Number} nameY - координата 'Y' сообщения об имени;
 * @param {Number} height  - высота колонны;
 * @param {Number} number  - порядковый номер колонны (соответствует номеру игрока, отсчёт ведётся от нуля);
 */
var renderStatsColumn = function (ctx, nameY, height, number) {
  ctx.fillRect(getX(number), nameY - TEXT_GAP - height, COLUMN_WIDTH, height);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  printText(ctx, SUCCESS_MESSAGES);
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {

    ctx.fillStyle = '#000';

    var columnHeight = Math.round(COLUMN_HEIGHT * times[i] / maxTime);
    var playerTimeY = playerNameY - TEXT_GAP - GAP - columnHeight;

    renderStatsText(ctx, times[i], playerTimeY, names[i], playerNameY, i);

    ctx.fillStyle = names[i] === 'Вы' ? 'rgb(255, 0, 0)' : 'rgb(0, 0,' + window.getRandomNumber(100, 255) + ')';

    renderStatsColumn(ctx, playerNameY, columnHeight, i);
  }
};

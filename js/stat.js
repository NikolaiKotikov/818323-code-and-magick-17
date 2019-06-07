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

var playerNameY = CLOUD_Y + CLOUD_HEIGHT - TEXT_GAP;

var successMessages = ['Ура вы победили!', 'Список результатов:'];

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

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  printText(ctx, successMessages);
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {

    ctx.fillStyle = '#000';

    var columnHeight = Math.round(COLUMN_HEIGHT * times[i] / maxTime);
    var playerTimeY = playerNameY - TEXT_GAP - GAP - columnHeight;

    ctx.fillText(Math.round(times[i]), CLOUD_X + TEXT_GAP * 2 + (COLUMN_WIDTH + COLUMN_GAP) * i, playerTimeY);
    ctx.fillText(names[i], CLOUD_X + TEXT_GAP * 2 + (COLUMN_WIDTH + COLUMN_GAP) * i, playerNameY);

    ctx.fillStyle = 'rgb(0, 0,' + Math.floor(Math.random() * 255) + ')';
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgb(255, 0, 0)';
    }

    ctx.fillRect(CLOUD_X + TEXT_GAP * 2 + (COLUMN_WIDTH + COLUMN_GAP) * i, playerNameY - TEXT_GAP - columnHeight, COLUMN_WIDTH, columnHeight);
  }
};

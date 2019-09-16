"use strict"

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var GAP = 10;
var FONT_GAP = 20;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var BAR_HEIGHT = 150;
var columnOriginX = CLOUD_X + COLUMN_GAP;
var columnOriginY = CLOUD_Y + CLOUD_HEIGHT - GAP * 2;

var renderCloud = function renderCloud(ctx, color, x, y) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT)
}

var maxElement = function getMaxElement(arr) {
  maxElement = arr[0];
  for (var i=1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement
}


window.renderStatistics = function renderStatistics(ctx, names, times) {
  var maxTime = maxElement(times);

  renderCloud(ctx, "rgba(0, 0, 0, 0.7)", CLOUD_X + GAP, CLOUD_Y + GAP);
  renderCloud(ctx, "#ffffff", CLOUD_X, CLOUD_Y);

  ctx.fillStyle = "black";
  ctx.font = "16px PT Mono";
  ctx.fillText("Ура вы победили!", CLOUD_X + GAP * 2, CLOUD_Y + GAP + FONT_GAP);
  ctx.fillText("Список результатов:", CLOUD_X + GAP * 2, CLOUD_Y + GAP + FONT_GAP * 2);


  for (var i = 0; i < names.length; i++) {
    var opacity = Number(Math.random().toFixed(2));

    ctx.fillStyle = "black";
    ctx.fillText(names[i], columnOriginX + (COLUMN_WIDTH + COLUMN_GAP) * i, columnOriginY);
    ctx.fillText(times[i].toFixed(0), columnOriginX + (COLUMN_WIDTH + COLUMN_GAP) * i, columnOriginY - FONT_GAP - BAR_HEIGHT * times[i] / maxTime - GAP);
    ctx.fillStyle = ((names[i] == "Вы") ? "rgba(255, 0, 0, 1)" : "hsla(252, 100%, 50%, " + opacity + ")");
    ctx.fillRect(columnOriginX + (COLUMN_WIDTH + COLUMN_GAP) * i, columnOriginY - FONT_GAP, COLUMN_WIDTH, -BAR_HEIGHT * times[i] / maxTime);
  }
}

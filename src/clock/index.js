const size = 400;
const centerX = size / 2;
const centerY = size / 2;
const radius = size / 2 * 0.9;
const canvas = document.querySelector('#bg');
canvas.width = size;
canvas.height = size;
const ctx = canvas.getContext('2d');

/**
 * 背景绘制
 */

function drawBackground() {
  ctx.save();
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = "#FFF";
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  const grad = ctx.createRadialGradient(centerX, centerY, radius * 0.95, 200, 200, radius * 1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius * 0.1;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.07, 0, 2 * Math.PI);
  ctx.fillStyle = '#682';
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/**
 * 数字绘制
 */
function drawNumber() {
  let ang;
  let num;
  ctx.save();
  ctx.font = radius * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.translate(centerX, centerY);
  for (num = 1; num < 13; num++) {
    ang = num * Math.PI / 6;
    ctx.save();
    ctx.fillStyle = `hsl(${30 * num}, 70%, 70%)`
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.restore();
  }
  for (num = 0; num < 60; num++) {
    if (num % 5 ===0) continue;
    ang = num * Math.PI / 30;
    ctx.save();
    ctx.strokeStyle = `hsl(${6 * num}, 70%, 70%)`
    ctx.rotate(ang);
    ctx.beginPath();
    ctx.moveTo(0, -radius * 0.84);
    ctx.lineTo(0, -radius * 0.88);
    ctx.stroke()
    ctx.restore();
  }
  ctx.restore();
}

/**
 * 时间计算
 */
function drawTime() {
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();

  hour = hour % 12;
  hour = (Math.PI / 6) * hour + (Math.PI / 6 / 60) * minute + (Math.PI / 6 / 60 / 60) * second;
  drawCursor(hour, radius * 0.5, radius * 0.07);
  minute = (Math.PI / 30) * minute + (Math.PI / 30 / 60) * second;
  drawCursor(minute, radius * 0.8, radius * 0.05);
  second = (Math.PI / 30) * second;
  drawCursor(second, radius * 0.9, radius * 0.02);
}
/**
 * 绘制指针
 * @param {number} angle 
 * @param {number} width 
 * @param {number} height 
 */
function drawCursor(angle, length, width) {
  ctx.save();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.strokeStyle = `hsl(${angle* 180 / Math.PI}, 70%, 70%)`;
  ctx.translate(centerX, centerY);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(0, -length)
  ctx.stroke();
  ctx.restore();
}

function draw() {
  ctx.clearRect(0, 0, size, size);
  drawBackground();
  drawNumber();
  drawTime();
  window.requestAnimationFrame(draw);
}

draw();
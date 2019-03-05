const canvas = document.querySelector('#c'),
      ctx = canvas.getContext('2d');

const ARROW_GRID = 40;
let arrows = [];

let Mouse = function(el) {
  this.el = el || window;
  this.x = 0;
  this.y = 0;

  const _getPointerEvent = function(e) {
    return e.targetTouches ? e.targetTouches[0] : e;
  };

  const _setMouseCoordinates = function(e) {
    e.preventDefault();
    const pointer = _getPointerEvent(e),
          x = pointer.pageX,
          y = pointer.pageY;

    this.x = x;
    this.y = y;
  };

  const events = ['mouseenter', 'mousemove', 'touchstart', 'touchenter', 'touchmove'];
  events.forEach(function(eventName) {
    this.el.addEventListener(eventName, _setMouseCoordinates.bind(this))
  })

  return this;
}();

let Arrow = function(obj) {
  this.x = obj.x | 0;
  this.y = obj.y | 0;
  this.color = obj.color || '#FFF';
  this.rotation = obj.rotation | 0;
  this.draw = function() {
    ctx.save();
    
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    ctx.lineWidth = 1;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(5, 10);
		ctx.lineTo(15, 10);
		ctx.lineTo(15, 5);
		ctx.lineTo(25, 15);
		ctx.lineTo(15, 25);
		ctx.lineTo(15, 20);
		ctx.lineTo(5, 20);
    ctx.lineTo(5, 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

function createParticles() {
  arrows = [];
  const ROWS = canvas.width / ARROW_GRID,
        COLS = canvas.height / ARROW_GRID;
  for(let x = 0; x < ROWS; x++) {
    for(let y = 0; y < COLS; y++) {
      arrows.push(new Arrow({
        x: x * ARROW_GRID,
        y: y * ARROW_GRID
      }))
    }
  }
}

function setViewport() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createParticles();
}

function renderArrow(arrow){
  arrow.rotation = Math.atan2(Mouse.y - arrow.y, Mouse.x - arrow.x);
  arrow.draw()
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  arrows.forEach(renderArrow);
}

function loop() {
  render();
  window.requestAnimationFrame(loop);
}

// 初始化
setViewport();
createParticles();
loop();

// 监听resize事件
window.addEventListener('resize',setViewport,false);
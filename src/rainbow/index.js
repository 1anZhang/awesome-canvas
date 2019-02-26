const c = document.querySelector('#c');
// 得到浏览器的宽和高
let w = c.width = window.innerWidth;
let h = c.height = window.innerHeight;
// 拿到画布
let ctx = c.getContext('2d');

// 参数，下雨的数目， 加速度
let total = w / 4;
let accelleration = 0.05;

// 雨的宽度
let size = w / total;
let repaintColor = 'rgba(0, 0, 0, 0.04)'

let colors = [],
    rainY = [],
    rainVel = [];

// 设置色轮颜色，设置点的位置，这里设置到最下面，因为要产生随机的🌧，都统一设置到底部，
// 从底部随机选取雨滴重新回归顶部，随便设置一个比较大的速度。
const portion = 360 / total;
for(let i = 0; i < total; ++i) {
  colors[i] = portion * i;

  rainY[i] = h;
  rainVel[i] = 10;
}

function anim() {
  window.requestAnimationFrame(anim);

  // 很关键，实现拖尾效果，用个透明度极低的遮罩，进行叠加
  ctx.fillStyle = repaintColor;
  ctx.fillRect(0, 0, w, h);

  // 计算每个雨滴的位置及长度，速度就是在单位时间走过的长度
  for(let i = 0; i < total; ++i) {
    let currentY = rainY[i] - 1;
    // 实时速度
    rainVel[i] += accelleration;
    // 实时位置
    rainY[i] += rainVel[i];
    ctx.fillStyle = `hsl(${colors[i]}, 80%, 50%)`;
    ctx.fillRect(size * i, currentY, size, rainVel[i] + 1);

    // 这里随机产生，越小🌧越稀疏。
    if(rainY[i] > h && Math.random() < 0.001) {
      rainY[i] = rainVel[i] = 0;
    }
  }
}

anim();
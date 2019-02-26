const c = document.querySelector('#c');
const ctx = c.getContext("2d");

c.width = 800;
c.height = 800;

const tangram = [
  {
    v:[{x: 0, y: 0}, {x:800, y: 0}, {x: 400, y: 400}],
    color:'#cffa80'
  },
  {
    v:[{x: 0, y: 0}, {x:400, y: 400}, {x: 0, y: 800}],
    color:'#85ebff'
  },
  {
    v:[{x: 800, y: 0}, {x:800, y: 400}, {x: 600, y: 600}, {x: 600, y: 200}],
    color:'#fa7892'
  },
  {
    v:[{x: 600, y: 200}, {x:600, y: 600}, {x: 400, y: 400}],
    color:'#f8f688'
  },
  {
    v:[{x: 400, y: 400}, {x:600, y: 600}, {x: 400, y: 800}, {x: 200, y: 600}],
    color:'#b991fa'
  },
  {
    v:[{x: 200, y: 600}, {x:400, y: 800}, {x: 0, y: 800}],
    color:'#ff89cc'
  },
  {
    v:[{x: 800, y: 400}, {x:800, y: 800}, {x: 400, y: 800}],
    color:'#8981ff'
  }
];

for (let i = 0; i < tangram.length; ++i) {
  draw(tangram[i]);
}

function draw(piece) {
  ctx.beginPath();
  ctx.moveTo(piece.v[0].x, piece.v[0].y);
  for(let i = 1; i< piece.v.length; i++) {
    ctx.lineTo(piece.v[i].x, piece.v[i].y);
  }
  ctx.closePath()
  ctx.fillStyle = piece.color;
  ctx.fill();
}
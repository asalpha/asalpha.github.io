

starCol = '#5cdb95';
bkgrdCol = '#001021';
speed = 33;


canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.outerHeight;
// canvas.style.background = bkgrdCol;


ctx = canvas.getContext('2d');
ctx.fillStyle = starCol;
ctx.lineWidth = 0.3;
ctx.strokeStyle = starCol;

scrollPos = {
  x: window.pageXOffset ,
  y: window.pageYOffset
};

mousePos = {
  x: window.innerWidth ,
  y: window.innerHeight / 2
};


stars = {
  nstars: (window.innerWidth * window.innerHeight) / 2000,
  dist: (window.innerWidth / window.innerHeight) * 30,
  rad: 80,
  allstars: []
};


function Star() {
  this.x = Math.random() * window.innerWidth;
  this.y = Math.random() * window.innerHeight;
  this.vx =  Math.random() - Math.random();
  this.vy =  Math.random() - Math.random();
  this.radius = Math.random() + 0.3;

  this.make = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  ctx.fill();
  };
  
  this.move = function () {
    for (i = 0; i < stars.nstars; i++) {
      star = stars.allstars[i];
      if (star.y < 0 || star.y > canvas.height) {
        star.vy = -star.vy;
      } 
      if (star.x < 0 || star.x > canvas.width) {
        star.vx = -star.vx;
      }
      star.x += star.vx;
      star.y += star.vy;
    }
  };

  this.connect = function () {
    for (i = 0; i < stars.nstars; i++) {
      for (j = 0; j < stars.nstars; j++) {
        istar = stars.allstars[i];
        jstar = stars.allstars[j];
        if (istar.x - jstar.x < stars.dist && istar.y - jstar.y < stars.dist && istar.x - jstar.x > -stars.dist && istar.y - jstar.y > -stars.dist) {
          if (istar.x - mousePos.x < stars.rad && istar.y - mousePos.y < stars.rad && istar.x - mousePos.x > -stars.rad && istar.y - mousePos.y > -stars.rad) {
            ctx.beginPath();
            ctx.moveTo(istar.x, istar.y);
            ctx.lineTo(jstar.x, jstar.y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }
  };
}


var start = function () {
  function makestars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (i = 0; i < stars.nstars; i++) {
      stars.allstars.push(new Star());
      star = stars.allstars[i];
      star.make();
    }
    star.connect();
    star.move();
  }
  setInterval(makestars, speed); 
};




document.addEventListener('mousemove', function (parameter) {
    mousePos.x = parameter.pageX - scrollPos.x;
    mousePos.y = parameter.pageY - scrollPos.y;
});


document.addEventListener('scroll', function (parameter) {
    scrollPos.x = window.pageXOffset;
    scrollPos.y = window.pageYOffset;
});



window.addEventListener('resize',() => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = starCol;
  ctx.lineWidth = .2;
  ctx.strokeStyle = starCol;
  stars.nstars = (window.innerWidth * window.innerHeight) / 2000;
  stars.dist = (window.innerWidth / window.innerHeight) * 30; 
  stars.allstars = [];
});  


window.onload = start();




TweenMax.staggerFromTo('#lightBlueNumbers path',1,{alpha:1},{alpha:0,repeat:-1,y:"-=20"},0.3);
TweenMax.staggerFromTo('#darkBlueNumbers path',1,{alpha:1},{alpha:0,repeat:-1},0.2);



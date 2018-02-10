




var mousePosition = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};


var dots = {
  nb: (window.innerWidth * window.innerHeight) / 2000,
  distance: (window.innerWidth / window.innerHeight) * 30,
  d_radius: 100,
  array: []
};
    

function Dot() {
  this.x = Math.random() * window.innerWidth;
  this.y = Math.random() * window.innerHeight;

  this.vx = -.5 + Math.random();
  this.vy = -.5 + Math.random();

  this.radius = Math.random();
}



var canvasDots = function (colorOfNetwork = '#5cdb95', backgroundColor = '#05386b') {

  let body = document.querySelector('body');
  // body.style.color = textColor;

  // if (document.getElementById('wrap')) {
  //   // If the div with dots exists
  //   // Get the div with dots
  //   var colorfulDiv = document.getElementById('wrap');

  //   // Delete div with dots
  //   document.querySelector('body').removeChild(colorfulDiv);
  // }

  // If the element canvas#canvas does not already exist
  if (!document.getElementById('canvas')) {
    var canvas = document.createElement('canvas'),
        // Creates a new canvas element
    ctx = canvas.getContext('2d');

    // Define details for the canvas element
    canvas.id = 'canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'inline';
    canvas.style.background = backgroundColor;

    // Add the canvas element to the DOM
    document.querySelector('body').appendChild(canvas);
  }

    // Detail for the look of the dots and lines
    ctx.fillStyle = colorOfNetwork;
    ctx.lineWidth = 0.2;
    ctx.strokeStyle = colorOfNetwork;
    // ctx.shadowColor = '#fff';

// function Dot() {
//   this.x = Math.random() * window.innerWidth;
//   this.y = Math.random() * window.innerHeight;

//   this.vx = -.5 + Math.random();
//   this.vy = -.5 + Math.random();

//   this.radius = Math.random();
// }


    Dot.prototype = {
      create: function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
      },

      animate: function () {
        for (i = 0; i < dots.nb; i++) {

          var dot = dots.array[i];

          if (dot.y < 0 || dot.y > canvas.height) {
            dot.vx = dot.vx;
            dot.vy = -dot.vy;
          } else if (dot.x < 0 || dot.x > canvas.width) {
            dot.vx = -dot.vx;
            dot.vy = dot.vy;
          }
          dot.x += dot.vx;
          dot.y += dot.vy;
        }
      },

      line: function () {
        for (i = 0; i < dots.nb; i++) {
          for (j = 0; j < dots.nb; j++) {
            i_dot = dots.array[i];
            j_dot = dots.array[j];

            if (i_dot.x - j_dot.x < dots.distance && i_dot.y - j_dot.y < dots.distance && i_dot.x - j_dot.x > -dots.distance && i_dot.y - j_dot.y > -dots.distance) {
              if (i_dot.x - mousePosition.x < dots.d_radius && i_dot.y - mousePosition.y < dots.d_radius && i_dot.x - mousePosition.x > -dots.d_radius && i_dot.y - mousePosition.y > -dots.d_radius) {
                ctx.beginPath();
                ctx.moveTo(i_dot.x, i_dot.y);
                ctx.lineTo(j_dot.x, j_dot.y);
                ctx.stroke();
                ctx.closePath();
              }
            }
          }
        }
      }
    };

    function createDots() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (i = 0; i < dots.nb; i++) {
        dots.array.push(new Dot());
        dot = dots.array[i];

        dot.create();
      }

      dot.line();
      dot.animate();
    }

    document.addEventListener('mousemove', function (parameter) {
      mousePosition.x = parameter.pageX;
      mousePosition.y = parameter.pageY;
    });

    //mousePosition.x = window.innerWidth / 2;
    //mousePosition.y = window.innerHeight / 2;

    setInterval(createDots, 33.3333 );

    window.addEventListener('resize',() => {
      // re-define details for the canvas element on resive
      let canvas = document.getElementById('canvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      colorDot = color = colorOfNetwork;

      // Detail for the look of the dots and lines
      ctx.fillStyle = colorDot;
      ctx.lineWidth = .1;
      ctx.strokeStyle = color;
      createDots;
    });
  
};




// let applyTheme = () => {
//   // settingGearColorInvert(true);
//     //   let style = document.createElement('style');
//     // style.id = 'style';

//     // // WebKit hack :(
//     // style.appendChild(document.createTextNode(''));

//     // // Add the <style> element to the page
//     // document.head.appendChild(style);

//     // let sheet = style.sheet;

//     // sheet.insertRule("img.settings { filter: invert(100%); }");
//   canvasDots('#5cdb95', '#05386b', '#edf5e1');
//   };
function rs() {
  canvasDots();
}

var dorezise = function() {
    // window.alert("sometext");
    // w = window.innerWidth;
    // h = window.innerHeight;
    // window.alert(w);
    // window.alert(h);
    ld();
};

var ld = function() {
    w = window.innerWidth;
    h = window.innerHeight;
    //Dot();
    canvasDots();
};

window.addEventListener('resize', dorezise);

window.onload = ld();


$(window).onresize = dorezise;
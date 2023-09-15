import { deg2rad, rad2deg } from './maths.js'

export const drawSegment = (ctx, c, r, numSegments, startAngle, segAngle, color) => {
    ctx.save();

    ctx.beginPath();

    ctx.moveTo(c, c);
    ctx.arc(c, c, r, startAngle - deg2rad(360/numSegments), startAngle + segAngle - deg2rad(360/numSegments));

    ctx.stroke();

    ctx.fillStyle = color;
    ctx.fill();

    ctx.closePath();
    ctx.restore();
  };

  export const drawSegmentText = (ctx, c, r, numSegments, angle, text) => {
    ctx.save();
    ctx.translate(c, c);
    ctx.rotate(angle - deg2rad(360/numSegments)); 
 
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.font = "12px sans-serif";
    ctx.fillText(text, r / 1.75, 0);

    ctx.restore();
  };

  export const drawArrow = (ctx, c, r) => {
    ctx.save();

    ctx.beginPath()

    ctx.moveTo(c + r + 30, c + 20)
    ctx.lineTo(c + r - 20, c);
    ctx.lineTo(c + r + 30, c - 20);

    ctx.closePath()

    ctx.fillStyle = '#0000ff'
    ctx.fill()

    ctx.strokeStyle = '#00ff00' 
    ctx.lineWidth = 4
    ctx.stroke()

    ctx.restore();
  }

  export const drawPlaceholderText = (ctx, c,  text) => {
    ctx.save();

    ctx.translate(c + 40, c);
 
    ctx.font = "30px sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(text, 0, 0);

    ctx.restore();
  };

  export const clear = (ctx,) => ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
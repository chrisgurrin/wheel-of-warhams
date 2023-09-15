import { setAlertMsg, showAlert } from './alert.js';
import { getShuffledColors } from './colors.js';
import { clear, drawArrow, drawSegment, drawSegmentText, drawPlaceholderText } from './drawing.js'
import { deg2rad, rad2deg } from '/maths.js'

import { getBacklogItems } from './backlog.js'
import { easeInOutCirc, getScaledValue } from './maths.js';

// refs
  const btnSpin = document.getElementById("btn-spin");
  const txtBacklog = document.getElementById("txt-backlog");


  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
//

let segments;
let segAngle, shuffledColors = 0;
let animAngle = 0


// Main
  const r = 275;

  canvas.width = (2 * r) + 100
  canvas.height = (2 * r)

  const c = canvas.height/2;

  const duration = 8000
  const rotations = 30
  const fps = 60

  const drawFrame = () => 
  {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.save()
  
    let segOffsetAngle = segAngle / 2;

    for (var i = 0; i < segments.length; i++) {
      drawSegment(ctx, c, r, segments.length, segOffsetAngle + animAngle, segAngle, shuffledColors[i]);
      drawSegmentText(ctx, c, r, segments.length, (segAngle / 2) + segOffsetAngle + animAngle, segments[i]);
      drawArrow(ctx,c,r)

      segOffsetAngle += segAngle;
    }
    ctx.restore()
  }

  const update = () => {
    segments = getBacklogItems(txtBacklog)
    segAngle = deg2rad(360 / segments.length);
    shuffledColors = getShuffledColors(segments.length);

    window.requestAnimationFrame(drawFrame)
  }

  let stepCount = 0;

  const spin = () => {
    if(!segments.length){
      window.requestAnimationFrame(() => {
        clear(ctx)
        drawPlaceholderText(ctx,c,'Fill in your backlog wall of shame first dummy')
      })
      return
    }

    const frameStep = 1000/fps
    
    const amount = Math.floor(getScaledValue(Math.random(), 0, 1, 0, segments.length))

    const totalRotation = (rotations * 360) +  rad2deg(segAngle * amount)

   // console.log('amount',amount)
    //console.log('totalRotation:', totalRotation,  'numSteps:', duration/frameStep)

    const pick = segments[amount === 0 ? 0 : segments.length - amount]

    console.log('you will pick ', pick)


    const tickSpin = () => {
      const elapsed = Date.now() - start
      const deg = easeInOutCirc(elapsed, 0, totalRotation, duration)
      animAngle = deg2rad(deg)

      //console.log('stepCount:', stepCount, 'deg:', deg, 'elapsed:', elapsed)
      stepCount += 1

      if(elapsed < duration){
        window.requestAnimationFrame(drawFrame)   
      }
        
      setTimeout(() => {
        if(elapsed < duration){
        tickSpin()
       }else {
          console.log('Total time:',Date.now() - start)
          setAlertMsg(pick)
          setTimeout(() => showAlert(), 1000)

          stepCount = 0
          animAngle = 0
        }
      }, frameStep)
    }
 
    let start = Date.now()
    tickSpin()        
  }

  btnSpin.onclick = spin
  txtBacklog.onchange = update

  update()




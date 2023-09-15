import { pickAlert, pickAlertMsg, helpAlert, hideAlert, setAlertMsg , showAlert } from './alert.js';
import { formatBacklogString, loadBacklogFromStorage, setBacklogItems } from './backlog.js'
import { getShuffledColors } from './colors.js';
import { clear, drawArrow, drawSegment, drawSegmentText, drawPlaceholderText } from './drawing.js'
import { deg2rad, rad2deg, easeInOutCirc, getScaledValue  } from './maths.js'


// refs
  const btnSpin = document.getElementById("btn-spin");
  const btnClearProject = document.getElementById("btn-clear-project");
  const lblCurrentProject = document.getElementById("lbl-current-project");
  const lblNoProject = document.getElementById("lbl-no-project");
  const txtBacklog = document.getElementById("txt-backlog");
  const lnkHelp = document.getElementById("lnk-help");
  
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
//

// Main
  const r = 275;

  canvas.width = (2 * r) + 100
  canvas.height = (2 * r)

  const c = canvas.height/2;

  const duration = 8000
  const rotations = 30
  const fps = 60
  const frameStep = 1000/fps

  let backlogItems;
  let segAngle, shuffledColors = 0;
  let spinAngle = 0

  //draw the wheel
  const drawWheel = () => 
  {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.save()
  
    let segOffsetAngle = segAngle / 2;

    for (var i = 0; i < backlogItems.length; i++) {
      drawSegment(ctx, c, r, backlogItems.length, segOffsetAngle + spinAngle, segAngle, shuffledColors[i].segment);
      drawSegmentText(ctx, c, r, backlogItems.length, (segAngle / 2) + segOffsetAngle + spinAngle, backlogItems[i], shuffledColors[i].text);
      drawArrow(ctx,c,r)

      segOffsetAngle += segAngle;
    }
    ctx.restore()
  }

  // update the wheel and redraw
  const redraw = () => {
    segAngle = deg2rad(360 / backlogItems.length);
    shuffledColors = getShuffledColors(backlogItems.length);

    window.requestAnimationFrame(drawWheel)
  }

  //  spin the wheel. Returns the index of the picked item.
  const spin = () => {
    if(!backlogItems.length){
      window.requestAnimationFrame(() => {
        clear(ctx)
        drawPlaceholderText(ctx,c,'Fill in your backlog wall of shame first dummy')
      })
      return
    }
    
    // choose how many segments to offset the final rotation by (anticlockwise)
    const pickOffset =  Math.floor(getScaledValue(Math.random(), 0, 1, 0, backlogItems.length))

    // total amount of rotation to spin by in degrees
    const totalRotation = (rotations * 360) +  rad2deg(segAngle *  pickOffset)

    // get the picked item
    const pickIndex =  pickOffset === 0 ? 0 : backlogItems.length -  pickOffset
    const pick = backlogItems[pickIndex]

    //console.log('you wil pick: ', pick)

    // callback to animate the spin
    const tickSpin = () => {
      const elapsed = Date.now() - start
      spinAngle = deg2rad(easeInOutCirc(elapsed, 0, totalRotation, duration))
  
      window.requestAnimationFrame(drawWheel)         
        
      setTimeout(() => {
        if(elapsed < duration){
          tickSpin()
        }else {
          setAlertMsg(pickAlertMsg, pick)
          setTimeout(() => showAlert(pickAlert), 1000)

          spinAngle = 0
        }
      }, frameStep)
    }
 
    let start = Date.now()
    tickSpin()    

    return pickIndex
  }

  const onAlertClose = (pickIndex, backlogItems) => {
    hideAlert(pickAlert)

    // update current project
    localStorage.setItem('current_project', backlogItems[pickIndex])
    lblCurrentProject.innerHTML = backlogItems[pickIndex]
    lblNoProject.classList.remove('visible');

    // remove item from backlog
    backlogItems.splice(pickIndex,1)
    setBacklogItems(backlogItems) 
    txtBacklog.value = formatBacklogString(backlogItems)

    redraw()
  }

  // add event handlers
  btnSpin.onclick = () => {
    const pickIndex = spin()
    
    pickAlert.onclick = () => onAlertClose(pickIndex, backlogItems)
    pickAlertMsg.onclick = () => onAlertClose(pickIndex, backlogItems)
  }

  btnClearProject.onclick = () => {
    localStorage.removeItem("current_project");
    lblNoProject.classList.add('visible');
    lblCurrentProject.innerHTML = null
  }

  txtBacklog.onchange = (e) => {
    backlogItems = setBacklogItems(e.target.value.split(','))
    redraw()
  }

  helpAlert.onclick = () => hideAlert(helpAlert)

  lnkHelp.onclick = () => {
    showAlert(helpAlert)
  }

  // load backlog
  backlogItems = loadBacklogFromStorage()
  txtBacklog.value = formatBacklogString(backlogItems)

  // load current project
  localStorage.getItem('current_project')
  const currentProject = localStorage.getItem('current_project')
  if(currentProject){
    lblCurrentProject.innerHTML = currentProject
  }
  else{
    lblNoProject.classList.add('visible');
  }

  redraw()



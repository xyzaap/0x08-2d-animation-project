function main() {
  const sel = '#myCanvas'
  canvasSetup(sel)
  const {canvas, ctx, bb} = getCanvas(sel)

  console.log({canvas, ctx, bb})

  // Steppers
  // --------------------------------------------------
  const stepperOneRaf
	= window.requestAnimationFrame(stepperOne)

  const stepperTwoRaf
	= window.requestAnimationFrame(stepperTwo)

  const stepperThree = new StepperThree(
    '#valueFromStepperThree', 15
  )
  const stepperThreeFn = (ts) => {
    if (!stepperThree.isActive) stepperThree.start()
    stepperThree.step(ts)
    window.requestAnimationFrame(stepperThreeFn)
  }
  const stepperThreeRaf
	= window.requestAnimationFrame(stepperThreeFn)
  // --------------------------------------------------

  // Clock
  // --------------------------------------------------
  const clock = new Clock(sel)
  // const ms = document.timeline.currentTime
  // clock.draw(ms)
  // clock.draw(ms+25000)
  const clockRafFn = (ts) => {
    clock.draw(ts)
    window.requestAnimationFrame(clockRafFn)
  }
  const clockRaf = window.requestAnimationFrame(clockRafFn)
}

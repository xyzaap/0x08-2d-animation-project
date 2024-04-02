function main() {
  const experiment = new Experiment()

  // Update Candidate Details
  updateCandidateDetails(Experiment)

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

  experiment.run()
}

// FIXME: Relax the validators for multiple names
function updateCandidateDetails({rollNo,name}) {
  let isValidRollNo, isValidName
  isValidRollNo = (isValidName = false)

  // Validate RollNo
  rollNo = Number(rollNo)
  isValidRollNo = !isNaN(rollNo) && 9999999 < rollNo
  if (!isValidRollNo) {
    console.warn({invalidRollNo: rollNo})
  }

  // Validate Name
  const titleCasePat = /^[A-Z][a-z]+( [A-Z][a-z]+)*$/
  name = String(name).trim()
  isValidName = titleCasePat.test(name)
  if (!isValidName) {
    console.warn({invalidName: name})
  }
  
  if (isValidRollNo && isValidName) {
    document.querySelector('#by')
      .textContent = `By: ${name} (${rollNo})`
  }
}

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
function updateCandidateDetails({rollNos,names}) {
  let isValidRollNo, isValidName, act, byMessage, n
  isValidRollNo = (isValidName = false)

  // Validate RollNo
  
  rollNos = rollNos.split(',')
    .map(
      s => Number(s.trim())
    )
    .filter(
      n => {
	isValidRollNo = !isNaN(n) && 9999999 < n
	if (!isValidRollNo) {
	  console.warn({invalidRollNo: n,
			message: "Roll No should be Integer."})
	}
	return isValidRollNo
      }
    )

  // Validate Name
  const titleCasePat = /^[A-Z][a-z]+( [A-Z][a-z]+)*$/
  names = String(names).trim()

  act = names.split('(').shift().trim()
  isValidName = titleCasePat.test(act)
  if (!isValidName) {
    console.warn({invalidAct: act,
		  message: "Act should be in Title Case."})
    act = ''
  }

  names = names.split('(').pop().split(')').shift()
    .split(',').map(s=>s.trim())
    .filter(name => {
      isValidName = titleCasePat.test(name)
      if (!isValidName) {
	console.warn({invalidName: name,
		      message: "Name should be a Title Case."})
      }
      return isValidName
    })
  
  byMessage = ''

  n = Math.min(names.length, rollNos.length)
  for (const i of Array(n).keys()) {
    if (0 < i)
      byMessage = `${byMessage}, `

    byMessage = `${byMessage}${rollNos[i]}:${names[i]}`
  }

  if (0 < byMessage.length) {
    byMessage = `(${byMessage})`
  }

  if (0 < act.length) {
    byMessage = `${act} ${byMessage}`
  }

  if (0 < byMessage.length) {
    byMessage = `By: ${byMessage}`
  } else {
    byMessage
      = 'Error parsing candidate details. Check console.'
  }

  document.querySelector('#by')
    .textContent = byMessage
}

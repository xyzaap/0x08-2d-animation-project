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
  let isValidRollNo, isValidName, act, byHtml, n
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
  
  byHtml = ''

  n = Math.min(names.length, rollNos.length)
  for (const i of Array(n).keys()) {
    if (0 < i)
      byHtml = `${byHtml}<span class="p-2">|</span>`

    byHtml = `${byHtml}<code>${rollNos[i]}</code> : ${names[i]}`
  }

  if (0 < act.length) {
    byHtml = `<strong>${act}</strong><br class="hidden md:inline"/><span class="p-4 md:hidden">&mdash;</span>${byHtml}`
  }

  if (0 < byHtml.length) {
    byHtml = `Created by ${byHtml}`
  } else {
    byHtml
      = 'Error parsing candidate details. Check console.'
  }

  document.querySelector('#by')
    .innerHTML = byHtml
}

class Experiment {
  // Group Details
  static rollNo = '10983437,10983743'
  static name = 'The Tutors(Akhtar Banga, Phul Tekchand)'

  canvasSel = '#myCanvas'

  run() {

    // Clock
    // --------------------------------------------------
    const clock = new Clock(this.canvasSel)
    // const ms = document.timeline.currentTime
    // clock.draw(ms)
    // clock.draw(ms+25000)
    const clockRafFn = (ts) => {
      clock.draw(ts)
      window.requestAnimationFrame(clockRafFn)
    }
    const clockRaf = window.requestAnimationFrame(clockRafFn)
    
  }
}

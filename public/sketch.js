function setup () {
  createCanvas(windowWidth, 400)
  drawData()

  const button = select('#submit')
  button.mousePressed(() => {
    const word = select('#word')
    const score = select('#score')

    word.mousePressed(() => {
      word.removeClass('error')
    })
    score.mousePressed(() => {
      score.removeClass('error')
    })

    if (!word.value().length) {
      word.addClass('error')
    }
    if (!score.value().length) {
      score.addClass('error')
    }

    if (word.value().length && score.value().length) {
      word.removeClass('error')
      score.removeClass('error')
      loadJSON('/add/' + word.value() + '/' + score.value(), (data) => {
        word.value('')
        score.value('')
        drawData()
      })
    }
  })
}

function drawData () {
  loadJSON('/all', gotData)
}

function gotData (data) {
  background(51)
  const keys = Object.keys(data)
  const threshold = 48

  for (let i = 0; i < keys.length; i++) {
    let word = keys[i]
    let score = data[word]
    let x = random(threshold, width - threshold)
    let y = random(threshold, height - threshold)
    fill(255)
    textFont('monospace')
    textSize(score * 7)
    text(word, x, y)
  }
}

// function draw () {}

function setup () {
  createCanvas(windowWidth, 400)
  drawData()
  handleOnSubmit()
  handleOnAnalize()
}

function handleOnSubmit () {
  const submitButton = select('#submit')

  submitButton.mousePressed(() => {
    const word = select('#word')
    const score = select('#score')

    handleInteraction(word)
    handleInteraction(score)

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

function handleOnAnalize () {
  const analyzeButton = select('#analyze')
  analyzeButton.mousePressed(() => {
    const txt = select('#textareainput')
    handleInteraction(txt)

    if (txt.value().length) {
      const data = { text: txt.value() }
      httpPost('/analyze', data, 'json', dataPosted, postError)
    }
  })
}

function dataPosted (result) {
  console.log(result)
}

function postError (error) {
  console.log(error)
}

function handleInteraction (ele) {
  ele.mousePressed(() => {
    ele.removeClass('error')
  })
  if (!ele.value().length) {
    ele.addClass('error')
  }
}

function drawData () {
  loadJSON('/all', data => {
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
  })
}

(function () {
  let audio = null
  let button = null
  let urls = {}

  async function playAudio (url) {
    audio = new Audio(url)
    await audio.play()
    addPauseButton()
    onEndAudio()

    file = document.getElementById('downloadFile')
    if (file) file.remove()
  };

  function loop (counter = 0) {
    file = document.getElementById('downloadFile')
    if (counter >= 10) {
      loadButtons()
      button.classList.remove('fa-spin')
      button.classList.replace('fa-spinner', 'fa-play')
      return
    }

    if (!file || !file.src) {
      setTimeout(() => {
        loop(counter)
      }, 500);
      counter++
      return
    }

    btnClass = getButtonClass(button)
    urls[btnClass] = file.src
    playAudio(file.src)
  }

  function disableAllPlayers() {
    document.querySelectorAll('.download-file>a').forEach(e => {
      e.firstElementChild.style.color = 'gray'
      button.style.color = '#0053bf'
      e.removeEventListener('click', loadFile)
      e.addEventListener('click', blockDownload)
    })
  }

  // bloquei o download dos arquivos enquando algum áudio está rolando
  function blockDownload(event) {
    event.stopPropagation()
  }

  function loadFile (event) {
    if (button && audio) {
      event.stopPropagation()
      return
    }

    button = event.target
    btnClass = getButtonClass(button)
    button.classList.replace('fa-play', 'fa-spinner')
    button.classList.add('fa-spin')
    disableAllPlayers()

    if (urls[btnClass]) {
      event.stopPropagation()
      playAudio(urls[btnClass])
      return
    }

    loop()
  }

  function addPauseButton () {
    button.classList.remove('fa-spin')
    button.classList.replace('fa-spinner', 'fa-pause')
    button.addEventListener('click', pauseAudio)
  }

  function pauseAudio (event) {
    if (!audio) return
    event.stopPropagation()
    audio.pause()
    button.removeEventListener('click', pauseAudio)
    button.classList.replace('fa-pause', 'fa-play')
    button.classList.remove('fa-spin')
    button = null
    audio = null
    loadButtons()
  }

  function onEndAudio() {
    audio.onended = () => {
      button.classList.replace('fa-pause', 'fa-play')
      button = null
      audio = null
      loadButtons()
    }
  }

  function getButtonClass(button) {
    const buttonClasses = []
    button.classList.forEach(c => buttonClasses.push(c))
    btnClass = buttonClasses.find(c => /pfa-btn-[\d]/.test(c))
    return btnClass
  }

  // Busca áudios na conversa e adiciona botão de 'play'
  function loadButtons() {
    document.querySelectorAll('.download-file>a').forEach((e, i) => {
      e.firstElementChild.classList.add(`pfa-btn-${i}`)
      e.firstElementChild.classList.replace('fa-arrow-circle-o-down', 'fa-play')
      e.firstElementChild.style.color = '#0053bf'
      e.addEventListener('click', loadFile)
      e.removeEventListener('click', blockDownload)
    });
  }

  loadButtons()
})();
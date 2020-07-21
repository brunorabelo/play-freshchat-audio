(function () {
  async function playAudio (url, playButton) {
    console.log('Play no áudio: ' + url)
    await new Audio(url).play()
    playButton.classList.replace('fa-spinner', 'fa-play')
    playButton.classList.remove('fa-spin')
    document.getElementById("downloadFile").remove()
    loadButtons()
  };

  function loop (playButton, counter = 0) {
    file = document.getElementById("downloadFile")
    console.log(counter)
    if (counter >= 10) {
      loadButtons()
      return
    }

    if (!file || !file.src) {
      setTimeout(() => {
        loop(playButton, counter)
      }, 500);
      counter++
      return
    }

    playAudio(file.src, playButton)
  }

  function disableAllPlayers() {
    document.querySelectorAll(".download-file>a").forEach(e => {
      e.firstElementChild.style.color = "gray"
      e.removeEventListener("click", addPlayButton)
    })
  }

  function addPlayButton(event) {
    e = event.target
    console.log(event)
    e.classList.replace('fa-play', 'fa-spinner')
    e.classList.add('fa-spin')

    disableAllPlayers()
    loop(e)
  }

  function loadButtons() {
    document.querySelectorAll(".download-file>a").forEach(e => {
      e.firstElementChild.classList.replace('fa-arrow-circle-o-down', 'fa-play')
      e.firstElementChild.style.color = "#0053bf"
      e.addEventListener("click", addPlayButton)
    });
  }

  loadButtons()
})();
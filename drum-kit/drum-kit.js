function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  }

  function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (!audio) return;

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
  }

  const key = Array.from(document.querySelectorAll('.key'));
  key.forEach(key => key.addEventListener('transitionend', removeTransition));
  window.addEventListener('keydown', playSound);

  function clickSound(keyCode) {
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`div[data-key="${keyCode}"]`);
    if (!audio) return;

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
}

// Add event listeners
const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);

// Make the keys clickable
keys.forEach(key => {
    key.addEventListener('click', () => {
        const keyCode = key.getAttribute('data-key');
        clickSound(keyCode);
    });
});

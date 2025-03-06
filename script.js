const bubbleContainer = document.querySelector('.bubble-container');
const startButton = document.querySelector(".startButton");
const originalColors = ['#a10202', '#ff0000', '#ff3300', '#ff4800', '#ff6600', '#ff4800', '#ff3300', '#ff0000', '#a10202', '#ffd900', 'rgb(4, 156, 156)'];
const uniqueColors = ['#000000', '#001229', '#001c41', '#012452', '#002e69', '#012452', '#001c41', '#001229', '#000000', '#d3d3d3', 'rgb(1, 97, 97)'];
const holdDuration = 30000;
let normalBubbleColor = "rgba(255, 255, 255, 0.7)";
let newBubbleColor = "rgba(151, 151, 151, 0.7)";
let colorPhase = true;

// Start method to make bubbles.
function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  const size = Math.random() * 80 + 20;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.animationDuration = `${Math.random() * 5 + 5}s`;
  bubble.style.backgroundColor = colorPhase ? normalBubbleColor : newBubbleColor;
  bubbleContainer.appendChild(bubble);
  setTimeout(() => {
    bubble.remove();
  }, 10000);
}
// End method.
// Start method to make button link functional.
// console.log(document.querySelector(".startButton")) // Debugging tool made to ensure button even exists.
startButton.addEventListener("click", function() {
  // console.log("🎯 Button clicked!"); // Debugging tool made to notify you if the button registers the clicks its given.
  window.location.href = "start_Game/index.html";
});
// End method.
// Start method to simulate night and day by changing sky colors every 30 seconds.
function applyUniqueColors() {
  document.getElementById('wavemaker').style.backgroundColor = uniqueColors[0];
  document.getElementById('wavemaker1').style.backgroundColor = uniqueColors[1];
  document.getElementById('wavemaker2').style.backgroundColor = uniqueColors[2];
  document.getElementById('wavemaker3').style.backgroundColor = uniqueColors[3];
  document.getElementById('wavemaker4').style.backgroundColor = uniqueColors[4];
  document.getElementById('wavemaker5').style.backgroundColor = uniqueColors[5];
  document.getElementById('wavemaker6').style.backgroundColor = uniqueColors[6];
  document.getElementById('wavemaker7').style.backgroundColor = uniqueColors[7];
  document.getElementById('wavemaker8').style.backgroundColor = uniqueColors[8];
  document.getElementById('sun').style.backgroundColor = uniqueColors[9];
  document.getElementById('body').style.backgroundColor = uniqueColors[10];
  document.getElementById('wavemaker').style.boxShadow = "0px 0px 20px rgba(0,0,0,0.5)";
  document.getElementById('wavemaker1').style.boxShadow = "0 0 20px rgba(0, 14, 58, 0.404)";
  document.getElementById('wavemaker2').style.boxShadow = "0 0 20px rgba(0, 29, 109, 0.404)";
  document.getElementById('wavemaker3').style.boxShadow = "0 0 20px rgba(0, 44, 109, 0.404)";
  document.getElementById('wavemaker4').style.boxShadow = "0 0 20px rgba(0, 65, 161, 0.404)";
  document.getElementById('wavemaker5').style.boxShadow = "0 0 20px rgba(0, 44, 109, 0.404)";
  document.getElementById('wavemaker6').style.boxShadow = "0 0 20px rgba(0, 29, 109, 0.404)";
  document.getElementById('wavemaker7').style.boxShadow = "0 0 20px rgba(0, 14, 58, 0.404)";
  document.getElementById('wavemaker8').style.boxShadow = "0px 0px 20px rgba(0,0,0,0.5)";
  document.getElementById('sun').style.boxShadow = "0 0 20px rgba(211, 211, 211, 0.404)";
}
function revertToOriginalColors() {
  document.getElementById('wavemaker').style.backgroundColor = originalColors[0];
  document.getElementById('wavemaker1').style.backgroundColor = originalColors[1];
  document.getElementById('wavemaker2').style.backgroundColor = originalColors[2];
  document.getElementById('wavemaker3').style.backgroundColor = originalColors[3];
  document.getElementById('wavemaker4').style.backgroundColor = originalColors[4];
  document.getElementById('wavemaker5').style.backgroundColor = originalColors[5];
  document.getElementById('wavemaker6').style.backgroundColor = originalColors[6];
  document.getElementById('wavemaker7').style.backgroundColor = originalColors[7];
  document.getElementById('wavemaker8').style.backgroundColor = originalColors[8];
  document.getElementById('sun').style.backgroundColor = originalColors[9];
  document.getElementById('body').style.backgroundColor = originalColors[10];
  document.getElementById('wavemaker').style.boxShadow = "0 0 20px rgba(218, 52, 23, 0.425)";
  document.getElementById('wavemaker1').style.boxShadow = "0 0 20px rgba(255, 48, 11, 0.493)";
  document.getElementById('wavemaker2').style.boxShadow = "0 0 20px rgba(255, 94, 0, 0.384)";
  document.getElementById('wavemaker3').style.boxShadow = "0 0 20px rgba(230, 105, 4, 0.404)";
  document.getElementById('wavemaker4').style.boxShadow = "0 0 20px rgba(235, 109, 6, 0.411)";
  document.getElementById('wavemaker5').style.boxShadow = "0 0 20px rgba(230, 105, 4, 0.404)";
  document.getElementById('wavemaker6').style.boxShadow = "0 0 20px rgba(255, 94, 0, 0.384)";
  document.getElementById('wavemaker7').style.boxShadow = "0 0 20px rgba(255, 48, 11, 0.493)";
  document.getElementById('wavemaker8').style.boxShadow = "0 0 20px rgba(218, 52, 23, 0.51)";
  document.getElementById('sun').style.boxShadow = "0 0 20px rgba(255, 187, 0, 0.418)";
}
function startColorLoop() {
  setInterval(() => {
    colorPhase = !colorPhase;
    if (colorPhase) {
      revertToOriginalColors();
    } else {
      applyUniqueColors();
    }
  }, 30000);
}
window.onload = function() {
  const elements = document.querySelectorAll("#wavemaker, #wavemaker1, #wavemaker2, #wavemaker3, #wavemaker4, #wavemaker5, #wavemaker6, #wavemaker7, #wavemaker8, #sun, #body");
  elements.forEach(element => {
    element.style.transition = "background-color 3s ease, box-shadow 3s ease";
  });
  startColorLoop(); // Remove to shut off day/night cycle.
};
// End method.

const audio = document.getElementById("audioPlayer");
const muteButton = document.getElementById("muteButton");

  // Ensure the audio starts playing
audio.volume = 1; // Default to unmuted
muteButton.addEventListener("click", function () {
    if (audio.muted) {
        audio.muted = false;
        muteButton.textContent = "🔊 Unmute";
    } else {
        audio.muted = true;
        muteButton.textContent = "🔇 Mute";
    }
});

setInterval(createBubble, 1000);
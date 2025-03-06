let fish = document.getElementById('fish');
let score = 0;
let isColliding = false;
let isMoving = false;
let gravityInterval;
let isGameOver = false;
let shark = document.getElementById('shark');
let gameOver = false;
let shark_for_this_only = document.querySelector('.shark');
let animationDuration = 10;
let delayDuration = 100;
let terrain = document.querySelector('.terrain');
let outer_rings = document.querySelector('.outer_rings');
let ring3 = document.querySelector('#ring3');
let normalBubbleColor = "rgba(255, 255, 255, 0.7)";
let newBubbleColor = "rgba(151, 151, 151, 0.7)";
let colorPhase = true;
let distance = 0
const originalColors = ['#a10202', '#ff0000', '#ff3300', '#ff4800', '#ff6600', '#ff4800', '#ff3300', '#ff0000', '#a10202', '#ffd900', 'rgb(4, 156, 156)'];
const uniqueColors = ['#000000', '#001229', '#001c41', '#012452', '#002e69', '#012452', '#001c41', '#001229', '#000000', '#d3d3d3', 'rgb(1, 97, 97)'];
const holdDuration = 30000;
const bubbleContainer = document.querySelector('.bubble-container');
const outer_ringsRect = outer_rings.getBoundingClientRect();
const pointSound = document.getElementById('pointSound');

// Start method to allow random movement to the ring.
function getRandomPosition() {
    if (isGameOver) return;
    const x = Math.random() * (outer_ringsRect.width - ring3.offsetWidth);
    const y = Math.random() * (outer_ringsRect.height - ring3.offsetHeight);
    return { x, y };
}
function randomRingMovement() {
    if (isGameOver) return;
    const { x, y } = getRandomPosition();
    ring3.style.transform = `translate(${x}px, ${y}px)`;
}
// End method.
// Start method to update the score if collision is true.
function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;
}
// End method.
// Start method to check for a collision between the fish and the ring(s) every 100 milliseconds.
function checkCollision() {
    const ring1 = document.querySelector('#ring0');
    const ring2 = document.querySelector('#ring1');
    const ring3 = document.querySelector('#ring2');
    const ring4 = document.querySelector('#ring3');
    const fishRect = fish.getBoundingClientRect();
    const ring1Rect = ring1.getBoundingClientRect();
    const ring2Rect = ring2.getBoundingClientRect();
    const ring3Rect = ring3.getBoundingClientRect();
    const ring4Rect = ring4.getBoundingClientRect();
    if (isGameOver) return;
    if (
        fishRect.left < ring1Rect.right &&
        fishRect.right > ring1Rect.left &&
        fishRect.top < ring1Rect.bottom &&
        fishRect.bottom > ring1Rect.top
    ) {
        if (!isColliding) {
            score += 10;
            updateScore();
            if (pointSound) {
                pointSound.play().catch(error => {
                    console.warn("Sound could not play. User interaction might be required.", error);
                });
            }
            isColliding = true;
        }
    } else {
        isColliding = false;
    }
    if (
        fishRect.left < ring2Rect.right &&
        fishRect.right > ring2Rect.left &&
        fishRect.top < ring2Rect.bottom &&
        fishRect.bottom > ring2Rect.top
    ) {
        if (!isColliding) {
            score += 20;
            updateScore();
            if (pointSound) {
                pointSound.play().catch(error => {
                    console.warn("Sound could not play. User interaction might be required.", error);
                });
            }
            isColliding = true;
        }
    } else {
        isColliding = false;
    }
    if (
        fishRect.left < ring3Rect.right &&
        fishRect.right > ring3Rect.left &&
        fishRect.top < ring3Rect.bottom &&
        fishRect.bottom > ring3Rect.top
    ) {
        if (!isColliding) {
            score += 40;
            updateScore();
            if (pointSound) {
                pointSound.play().catch(error => {
                    console.warn("Sound could not play. User interaction might be required.", error);
                });
            }
            isColliding = true;
        }
    } else {
        isColliding = false;
    }
    if (
        fishRect.left < ring4Rect.right &&
        fishRect.right > ring4Rect.left &&
        fishRect.top < ring4Rect.bottom &&
        fishRect.bottom > ring4Rect.top
    ) {
        if (!isColliding) {
            score += 100;
            updateScore();
            if (pointSound) {
                pointSound.play().catch(error => {
                    console.warn("Sound could not play. User interaction might be required.", error);
                });
            }
            isColliding = true;
        }
    } else {
        isColliding = false;
    }
}
// End method.
// Start method to check if the fish is in the same space as the shark.
function sharkBiteCheck() {
    const fishRect = fish.getBoundingClientRect();
    const shark = document.querySelector('#shark');
    const sharkRect = shark.getBoundingClientRect();
    if (
        fishRect.left < sharkRect.left + sharkRect.width &&
        fishRect.left + fishRect.width > sharkRect.left &&
        fishRect.top < sharkRect.top + sharkRect.height &&
        fishRect.top + fishRect.height > sharkRect.top
    ) {
        if (!gameOver) {
            endGame();
            gameOver = true;
        }
    } else {
        isColliding = false;
    }
}
// End method.
// Start function to simulate gravity.
function applyGravity() {
    if (!gravityInterval && !isMoving && !isGameOver) {
        gravityInterval = setInterval(function() {
            let currentTop = parseInt(window.getComputedStyle(fish).top, 10) || 0;
            const step = 5;
            if (currentTop - step < window.innerHeight - fish.offsetHeight - 837) {
                // The 837 listed is the value of the bottom at top 0. Without it, the fish will stop around 837 px under the screen.
                fish.style.top = `${currentTop + step}px`;
            } else {
                checkGameOver();
            }
        }, 1);
    }
}
function resetGravity() {
    if (gravityInterval) {
        clearInterval(gravityInterval);
        gravityInterval = null;
    }
}
// End function.
// Method to make the game end at a certain Y level. Also ends if fish occupies same space as shark.
function checkGameOver() {
    const currentTop = parseInt(window.getComputedStyle(fish).top, 10) || 10;
    const currentLeft = parseInt(window.getComputedStyle(fish).left, 10) || 10;
    const sharkLeft = parseInt(window.getComputedStyle(shark).left, 10) || 10;
    const sharkTop = parseInt(window.getComputedStyle(shark).top, 10) || 10;
    if (currentLeft < sharkLeft + shark.offsetWidth &&
        currentLeft + fish.offsetWidth > sharkLeft &&
        currentTop < sharkTop + shark.offsetHeight &&
        currentTop + fish.offsetHeight > sharkTop) {
        endGame();
    }
    const bottomLimit = 0 + fish.offsetHeight;
    if (currentTop >= 0 || currentTop >= bottomLimit) {
        endGame();
    }
}
// End method.
// Start end-game message.
function endGame() {
    isGameOver = true;
    resetGravity();
    const gameOverSound = document.getElementById('gameOverSound');
    if (gameOverSound) {
        gameOverSound.play().catch(error => {
            console.warn("Sound could not play. User interaction might be required.", error);
        });
    }
    const gameOverMessage = document.createElement('div');
    gameOverMessage.classList.add('game-over');
    gameOverMessage.textContent = 'Game Over! Your score: ' + score;
    document.body.appendChild(gameOverMessage);
    gameOverMessage.style.position = 'fixed';
    gameOverMessage.style.top = '50%';
    gameOverMessage.style.left = '50%';
    gameOverMessage.style.transform = 'translate(-50%, -50%)';
    gameOverMessage.style.padding = '20px';
    gameOverMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    gameOverMessage.style.color = '#fff';
    gameOverMessage.style.fontSize = '24px';
    gameOverMessage.style.zIndex = '1000';
}
// End end-game message.
// Start resizing stuff.
function updateViewportBounds() {
    let currentTop = parseInt(window.getComputedStyle(fish).top, 10) || 0;
    let currentLeft = parseInt(window.getComputedStyle(fish).left, 10) || 0;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const fishHeight = fish.offsetHeight;
    const fishWidth = fish.offsetWidth;
    currentTop = Math.max(-807, Math.min(currentTop, viewportHeight - fishHeight));
    currentLeft = Math.max(0, Math.min(currentLeft, viewportWidth - fishWidth));
    fish.style.top = `${currentTop}px`;
    fish.style.left = `${currentLeft}px`;
}
// End resizing stuff.
// Start bubbles.
function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    const size = Math.random() * 80 + 20; // set to + 20
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
// End bubbles.
// Start method to simulate night and day by changing sky colors every 30 seconds.
function applyUniqueColors() {
    document.getElementById('wavemaker0').style.backgroundColor = uniqueColors[0];
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
    document.getElementById('wavemaker0').style.boxShadow = "0px 0px 20px rgba(0,0,0,0.5)";
    document.getElementById('wavemaker1').style.boxShadow = "0 0 20px rgba(0, 14, 58, 0.404)";
    document.getElementById('wavemaker2').style.boxShadow = "0 0 20px rgba(0, 29, 109, 0.404)";
    document.getElementById('wavemaker3').style.boxShadow = "0 0 20px rgba(0, 44, 109, 0.404)";
    document.getElementById('wavemaker4').style.boxShadow = "0 0 20px rgba(0, 65, 161, 0.404)";
    document.getElementById('wavemaker5').style.boxShadow = "0 0 20px rgba(0, 44, 109, 0.404)";
    document.getElementById('wavemaker6').style.boxShadow = "0 0 20px rgba(0, 29, 109, 0.404)";
    document.getElementById('wavemaker7').style.boxShadow = "0 0 20px rgba(0, 14, 58, 0.404)";
    document.getElementById('wavemaker8').style.boxShadow = "0px 0px 20px rgba(0,0,0,0.5)";
    document.getElementById('sun').style.boxShadow = "0 0 20px rgba(211, 211, 211, 0.404)"
}
function revertToOriginalColors() {
    document.getElementById('wavemaker0').style.backgroundColor = originalColors[0];
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
    document.getElementById('wavemaker0').style.boxShadow = "0 0 20px rgba(218, 52, 23, 0.425)";
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
    const elements = document.querySelectorAll("#wavemaker0, #wavemaker1, #wavemaker2, #wavemaker3, #wavemaker4, #wavemaker5, #wavemaker6, #wavemaker7, #wavemaker8, #sun, #body");
    elements.forEach(element => {
      element.style.transition = "background-color 3s ease, box-shadow 3s ease";
    });
    startColorLoop(); // Remove to shut off day/night cycle.
  };
// End method.
// Start methods to allow the shark and terrain to increase the speed they move.
function increaseSharkSpeed() {
    if (animationDuration > 0.00000000001) {
        animationDuration -= 0.1;
        shark_for_this_only.style.animationDuration = `${animationDuration}s`
    }
}
function increaseSpeed() {
    if (animationDuration > 0.00000000001) {
        animationDuration -= 0.1;
        terrain.style.animationDuration = `${animationDuration}s`
    }
}
// End method.
// Start method to make the shark and terrain stop moving and freeze into place once game ends.
function stopAnimation(){
    if (isGameOver) {
        setTimeout(() => {
            const sharkPosition = window.getComputedStyle(shark);
            const transform = sharkPosition.getPropertyValue('transform');
            const terrainPosition = window.getComputedStyle(terrain);
            const transform1 = terrainPosition.getPropertyValue('transform');
            const outer_ringsPosition = window.getComputedStyle(outer_rings);
            const transform2 = outer_ringsPosition.getPropertyValue('transform');
            const ring3Position = window.getComputedStyle(ring3);
            const transform3 = ring3Position.getPropertyValue('transform');
            shark_for_this_only.style.animation = 'none';
            shark_for_this_only.style.transform = transform;
            terrain.style.animation = 'none';
            terrain.style.transform = transform1;  
            outer_rings.style.animation = 'none';
            outer_rings.transform = transform2;
            ring3.style.animation = 'none';
            ring3.style.transform = transform3;
        }, delayDuration);
    }
}
// End method.
// Start method to move based on arrow keys.
document.addEventListener('keydown', function(event) {
    if (isGameOver) return;
    const step = 20;
    let currentTop = parseInt(window.getComputedStyle(fish).top, 10) || 0;
    let currentLeft = parseInt(window.getComputedStyle(fish).left, 10) || 0;
    if (event.key === 'ArrowUp') {
        currentTop = Math.max(currentTop - step - 10, -807);
    } else if (event.key === 'ArrowDown') {
        currentTop = Math.min(currentTop + step + 10, window.innerHeight - fish.offsetHeight);
    } else if (event.key === 'ArrowLeft') {
        currentLeft = Math.max(currentLeft - step + 10, 0);
    } else if (event.key === 'ArrowRight') {
        currentLeft = Math.min(currentLeft + step - 10, window.innerWidth - fish.offsetWidth);
    }
    fish.style.top = `${currentTop}px`;
    fish.style.left = `${currentLeft}px`;
    isMoving = true;
    resetGravity();
    checkGameOver();
});
// End method.
// Start method to apply gravity if user is not moving.
document.addEventListener('keyup', function() {
    isMoving = false;
    applyGravity();
});
// End method.
// Start method to wait for resizing.
window.addEventListener('resize', updateViewportBounds);
// End method.

setInterval(increaseSharkSpeed, 10000); // Remove to prevent shark speeding up.
setInterval(increaseSpeed, 10000); // Remove to prevent terrain speeding up.
setInterval(stopAnimation, 10); // Remove to invalidate stopAnimation.
setInterval(checkCollision, 10); // Remove to stop points.
setInterval(sharkBiteCheck, 10); // Remove to stop shark bites doing anything.
setInterval(randomRingMovement, 2000); // Remove to stop the outer rings moving randomly.
setInterval(createBubble, 1000); // Remove to shut off bubbles.
applyGravity(); // Remove to shut off gravity.
updateViewportBounds(); // Remove to prevent dimensions from updating. DO NOT REMOVE!!!
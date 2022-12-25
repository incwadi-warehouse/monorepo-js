import confetti from 'canvas-confetti'
import { ref } from 'vue'

export function useConfetti() {
  const hasSnow = ref(false)
  const hasParty = ref(false)

  const random = (min, max) => {
    return Math.random() * (max - min) + min
  }

  const snow = () => {
    confetti({
      particleCount: 5,
      startVelocity: 0,
      ticks: 300,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2,
      },
      colors: ['#cccccc', '#bbbbbb', '#dddddd'],
      shapes: ['circle'],
      gravity: random(0.4, 0.6),
      scalar: random(0.4, 1),
      drift: random(-0.4, 0.4),
    })
  }

  setInterval(() => {
    if (!hasSnow.value) return
    snow()
  }, 200)

  const party = () => {
    confetti({
      particleCount: 25,
      startVelocity: 60,
      ticks: 200,
      origin: {
        x: 0,
        y: 1,
      },
      shapes: ['circle'],
      gravity: random(0.4, 0.6),
      scalar: random(0.4, 1),
      drift: 0.5,
    })
    confetti({
      particleCount: 25,
      startVelocity: 60,
      ticks: 200,
      origin: {
        x: 1,
        y: 1,
      },
      shapes: ['circle'],
      gravity: random(0.4, 0.6),
      scalar: random(0.4, 1),
      drift: -0.5,
    })
  }

  setInterval(() => {
    if (!hasParty.value) return
    party()
  }, 300)

  return { hasSnow, hasParty }
}

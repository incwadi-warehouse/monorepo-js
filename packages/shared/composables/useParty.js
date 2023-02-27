import confetti from 'canvas-confetti'
import { ref } from 'vue'

export function useParty() {
  const hasParty = ref(false)

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

  const random = (min, max) => {
    return Math.random() * (max - min) + min
  }

  return { hasParty }
}

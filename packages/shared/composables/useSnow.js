import confetti from 'canvas-confetti'
import { ref } from 'vue'

export function useSnow() {
  const hasSnow = ref(false)

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

  const random = (min, max) => {
    return Math.random() * (max - min) + min
  }

  return { hasSnow }
}

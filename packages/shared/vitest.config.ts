import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['unit.setup.js'],
  },
})

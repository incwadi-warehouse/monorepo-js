/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:5050',
  },
  component: {
    setupNodeEvents(on, config) {},
    specPattern: 'src/**/__tests__/*.spec.{js,ts,jsx,tsx}',
  },
})

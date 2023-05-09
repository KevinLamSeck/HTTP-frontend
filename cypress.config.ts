import { defineConfig } from 'cypress'

export default defineConfig({

  e2e: {
    'baseUrl': 'http://localhost:4200',
    supportFile: false,
    viewportHeight: 1000,
    viewportWidth: 1280,
    experimentalStudio: true
  },


  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }

})

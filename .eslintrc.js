module.exports = {
  extends: ['next/core-web-vitals', 'standard', 'plugin:relay/strict'],
  plugins: ['relay'],
  rules: {
    indent: ['error', 2],
    camelcase: 'off', // TODO: figure out how to enable without issues with Relay artifact imports
    'relay/generated-flow-types': 'off' // TODO: figure out how to enable for typescript types in Relay
  }
}

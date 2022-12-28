module.exports = {
  preset: 'jest-expo',
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    './src/__tests__/jestSetup.ts',
  ],
  setupFilesAfterEnv: ['./src/__tests__/resetStore.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@fortawesome/.*|node:http)',
  ],
  modulePathIgnorePatterns: [
    'jestSetup.ts',
    'resetStore.ts',
    '__mocks__/',
  ],

  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
};

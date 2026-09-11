module.exports = {
  "testEnvironment": "jsdom",
  "roots": [
    "<rootDir>/src"
  ],
  "moduleNameMapper": {
    "\\.(css|scss|sass)$": "identity-obj-proxy",
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/test/fileMock.cjs"
  },
  "setupFilesAfterEnv": [
    "<rootDir>/src/setupTests.js"
  ]
};

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

jest.mock("expo-font", () => ({
  ...jest.requireActual("expo-font"),
  isLoaded: jest.fn(() => false),
  loadAsync: jest.fn(() => Promise.resolve()),
}));

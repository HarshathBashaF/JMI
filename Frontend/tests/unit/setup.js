import "@testing-library/jest-dom";

class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = global.IntersectionObserver || IntersectionObserver;

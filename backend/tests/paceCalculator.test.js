const {
  calculatePace,
  getCategory
} = require("../src/paceCalculator");

describe("Pace Calculator", () => {
  test("calculates average pace correctly", () => {
    const pace = calculatePace(10, 60);

    expect(pace).toBe(6);
  });

  test("categorizes a Zone 2 pace", () => {
    const category = getCategory(6.5);

    expect(category).toBe("Zone 2");
  });

  test("categorizes a Threshold pace", () => {
    const category = getCategory(5.5);

    expect(category).toBe("Threshold");
  });

  test("categorizes the lower Threshold boundary correctly", () => {
  const category = getCategory(5.0);

  expect(category).toBe("Threshold");
});

  test("categorizes a Sprint pace", () => {
    const category = getCategory(4.5);

    expect(category).toBe("Sprint");
  });
});
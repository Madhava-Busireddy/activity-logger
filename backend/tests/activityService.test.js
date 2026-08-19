jest.mock("../src/activityRepository", () => ({
  saveActivity: jest.fn((activity) => ({
    id: 1,
    ...activity
  })),
  getActivities: jest.fn()
}));

const {
  createActivity,
  validateActivityInput
} = require("../src/activityService");

describe("Activity Service", () => {
  describe("validateActivityInput", () => {
    test("rejects missing distance", () => {
      expect(() => validateActivityInput(undefined, 60))
        .toThrow("Distance is required");
    });

    test("rejects non-numeric distance", () => {
      expect(() => validateActivityInput("abc", 60))
        .toThrow("Distance must be a number");
    });

    test("rejects zero distance", () => {
      expect(() => validateActivityInput(0, 60))
        .toThrow("Distance must be greater than 0");
    });

    test("rejects negative distance", () => {
      expect(() => validateActivityInput(-5, 60))
        .toThrow("Distance must be greater than 0");
    });

    test("rejects missing total time", () => {
      expect(() => validateActivityInput(10, undefined))
        .toThrow("Total time is required");
    });

    test("rejects non-numeric total time", () => {
      expect(() => validateActivityInput(10, "abc"))
        .toThrow("Total time must be a number");
    });

    test("rejects zero total time", () => {
      expect(() => validateActivityInput(10, 0))
        .toThrow("Total time must be greater than 0");
    });

    test("rejects negative total time", () => {
      expect(() => validateActivityInput(10, -20))
        .toThrow("Total time must be greater than 0");
    });
  });

  describe("createActivity", () => {
    test("creates a valid activity", () => {
      const activity = createActivity(10, 60);

      expect(activity.id).toBe(1);
      expect(activity.distanceKm).toBe(10);
      expect(activity.totalTimeMinutes).toBe(60);
      expect(activity.averagePace).toBe(6);
      expect(activity.category).toBe("Threshold");
      expect(activity.createdAt).toBeDefined();
    });
  });
});
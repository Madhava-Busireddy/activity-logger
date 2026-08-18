process.env.DATABASE_FILE = "test-activity-logger.db";

const request = require("supertest");
const app = require("../src/app");

describe("Activity API", () => {
  test("creates a valid activity", async () => {
    const response = await request(app)
      .post("/api/activities")
      .send({
        distanceKm: 10,
        totalTimeMinutes: 60
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.distanceKm).toBe(10);
    expect(response.body.totalTimeMinutes).toBe(60);
    expect(response.body.averagePace).toBe(6);
    expect(response.body.category).toBe("Threshold");
    expect(response.body.id).toBeDefined();
    expect(response.body.createdAt).toBeDefined();
  });

  test("rejects zero distance", async () => {
    const response = await request(app)
      .post("/api/activities")
      .send({
        distanceKm: 0,
        totalTimeMinutes: 60
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Distance must be greater than 0");
  });

  test("rejects negative distance", async () => {
    const response = await request(app)
      .post("/api/activities")
      .send({
        distanceKm: -5,
        totalTimeMinutes: 60
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Distance must be greater than 0");
  });

  test("rejects non-numeric distance", async () => {
    const response = await request(app)
      .post("/api/activities")
      .send({
        distanceKm: "abc",
        totalTimeMinutes: 60
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Distance must be a number");
  });

  test("rejects zero total time", async () => {
    const response = await request(app)
      .post("/api/activities")
      .send({
        distanceKm: 10,
        totalTimeMinutes: 0
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Total time must be greater than 0");
  });

  test("rejects negative total time", async () => {
    const response = await request(app)
      .post("/api/activities")
      .send({
        distanceKm: 10,
        totalTimeMinutes: -20
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Total time must be greater than 0");
  });

  test("rejects non-numeric total time", async () => {
    const response = await request(app)
      .post("/api/activities")
      .send({
        distanceKm: 10,
        totalTimeMinutes: "abc"
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Total time must be a number");
  });

  test("returns saved activities", async () => {
    const response = await request(app)
      .get("/api/activities");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
const app = require("../src/app.js");
const request = require("supertest");

describe("GET /tasks", () => {
  test("Response with status code 200", async () => {
    const response = await request(app).get("/api/tasks").send();
    expect(response.statusCode).toBe(200);
  });

  test("Entries get response with an array", async () => {
    const response = await request(app).get("/api/tasks").send();
    console.log(response.body, "res");
    expect(response.body.body.entries).toBeInstanceOf(Array);
  });
});

describe("POST, PUT,DEL /tasks and POST, DEL /status", () => {
  //Should respond with status 500
  let taskId;
  let statusId;
  test("Should respond with status 500 for no body info", async () => {
    const response = await request(app).post("/api/task").send();
    expect(response.statusCode).toBe(400);
  });

  //Should rrespond with a json objet containing task id
  test("Should respond with a json objet containing task id", async () => {
    const response = await request(app).post("/api/task").send({
      title: "test title ",
      description: "test description",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.body.entry.id).toBeDefined();
    taskId = response.body.body.entry.id;
  });
  console.log("Task id:", taskId);

  test("Should update the task successfully", async () => {
    const response = await request(app).put(`/api/task/${taskId}`).send({
      title: "updated title",
      description: "updated description",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.body.entry.title).toBe("updated title");
  });

  test("Should respond numbers of task time from created", async () => {
    const response = await request(app).get(`/api/task/times/${taskId}`).send();
    expect(response.statusCode).toBe(200);
    expect(typeof response.body.body.days).toBe("number");
    expect(typeof response.body.body.hours).toBe("number");
    expect(typeof response.body.body.minutes).toBe("number");
  });

  ///POST STATUS

  test("Should respond with a json objet containing status id", async () => {
    const response = await request(app).post("/api/status").send({
      title: "test title status ",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.body.entry.id).toBeDefined();
    statusId = response.body.body.entry.id;
  });

  //// PUT TASK WITH STATUS ID

  console.log('statusId : ', statusId)
  test("Should update the task with status id successfully", async () => {
    const response = await request(app).put(`/api/task/${taskId}/change/${statusId}`).send();
    expect(response.statusCode).toBe(200);
    expect(response.body.body.entry.status_id).toBe(statusId);
  });

  ///// DEL STATUS 
  test("Should delete the status successfully", async () => {
    const response = await request(app).delete(`/api/status/${statusId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Status successfully eliminated");
  });

  ///

  test("Should delete the task successfully", async () => {
    const response = await request(app).delete(`/api/task/${taskId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Task successfully eliminated");
  });

  test("Should return 404 when trying to get the deleted task", async () => {
    const response = await request(app).get(`/api/task/${taskId}`);
    expect(response.statusCode).toBe(404);
  });
});

describe("GET /api/statuses", () => {
  test("Response with status code 200", async () => {
    const response = await request(app).get("/api/statuses").send();
    expect(response.statusCode).toBe(200);
  });

  test("Entries get response with an array", async () => {
    const response = await request(app).get("/api/statuses").send();
    console.log(response.body, "res");
    expect(response.body.body.entries).toBeInstanceOf(Array);
  });
});

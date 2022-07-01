const request = require("supertest");
// import server
const { app } = require("../server");
describe("API server", () => {
  let api;
  jest.mock(
    "path/to/setting.json",
    () => ({
      foo: "bar",
    }),
    {
      virtual: true,
    }
  );
  beforeAll(() => {
    // start the server and store it in the api variable
    api = app.listen(5000, () =>
      console.log("Test server running on port 5000")
    );
  });
  let testPost = {
    PostID: "1",
    Description: "Hello World",
    URL: null,
    Likes: 0,
    EmojiOne: 0,
    EmojiTwo: 0,
    EmojiThree: 0,
    Time: "29/6/2022 12:01 PM",
  };
  let testComment = {
    PostID: "1",
    Description: "Hello",
    Time: "29/6/2022 12:04 PM",
  };
  afterAll((done) => {
    // `done` always gets passed in but if we want to use it, we must name it!
    // close the server, then run done
    console.log("Gracefully stopping test server");
    api.close(done); // `done` will be invoked when the `api.close` function is complete
  });
  it("responds to get / with status 200", (done) => {
    request(api).get("/").expect(200, done);
  });
  it("responds to get /comments with status 200", (done) => {
    request(api).get("/comments").expect(200, done);
  });
  it("responds to post / with status 201", (done) => {
    request(api)
      .post("/")
      .send(testPost)
      .set("Accept", /application\/json/)
      .expect(201, done);
  });
  it("responds to post /comments with status 201", (done) => {
    request(api)
      .post("/comments")
      .send(testComment)
      .set("Accept", /application\/json/)
      .expect(201, done);
  });
  it("updates likes by id", (done) => {
    request(api).patch("/1").send().expect(200, done);
  });
  it("updates emjoi1 by id", (done) => {
    request(api).patch("/emoji1/1").send().expect(200, done);
  });
  it("updates emjoi1 by id", (done) => {
    request(api).patch("/emoji2/1").send().expect(200, done);
  });
  it("updates emjoi3 by id", (done) => {
    request(api).patch("/emoji3/1").send().expect(200, done);
  });
  it("responds to non existing paths with 404", (done) => {
    request(api).get("/no").expect(404, done);
  });
});

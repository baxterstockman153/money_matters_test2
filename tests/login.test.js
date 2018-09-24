const Page = require("./helpers/page");
const variables = require("./helpers/variables");

let page;
const landingPageText = "Landing";
const redirectPageText = "Categories";
const { localhost } = variables;
const currentUserUrl = `${localhost}/api/current_user"`;

beforeEach(async () => {
  page = await Page.build();
  await page.goto(localhost);
});

afterEach(async () => {
  await page.close();
});

describe("When logged in", async () => {
  beforeEach(async () => {
    await page.login();
  });

  test("can see the correct redirect page", async () => {
    const text = await page.$eval("h1", el => el.innerHTML);
    expect(text).toEqual(landingPageText);
  });

  test("can see current user page", async () => {
    // await page.goto("http://localhost:3000/api/current_user");
    await page.goto(`${localhost}/api/current_user`);
    const content = await page.getContentsOf("pre");
    const contentJson = JSON.parse(content);
    const expected = '{"_id":"5b818da8df1e19341fa7b959","__v":0}';
    expect(contentJson["_id"]).not.toBeNull();
  });

  test("can logout again", async () => {
    const text = await page.$eval("h1", el => el.innerHTML);
    const content = await page.getContentsOf("h1");

    expect(content).toEqual(landingPageText);
    await page.waitFor('a[href="/api/logout"]');
    await page.click('a[href="/api/logout"]');
    await page.waitFor('a[href="/auth/google"]');
    expect(content).toEqual(landingPageText);

    await page.goto(`${localhost}/api/current_user`);
    const body = await page.getContentsOf("body");
    expect(body).toEqual("");
  });
});

describe("When User is not logged in", async () => {
  test("current user returns not logged in", async () => {
    await page.goto(`${localhost}/api/current_user`);
    const content = await page.getContentsOf("body");
    expect(content).toEqual("");
  });

  test("can see the correct landing page", async () => {
    const text = await page.$eval("h1", el => el.innerHTML);
    expect(text).toEqual(landingPageText);
    // const label = await page.getContentsOf("form label");
  });
});

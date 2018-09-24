const puppeteer = require("puppeteer");
const Page = require("./helpers/page");
const variables = require("./helpers/variables");

let page;
const { localhost } = variables;

beforeEach(async () => {
  page = await Page.build();
  await page.goto(localhost);
});

afterEach(async () => {
  await page.close();
});

test("The header has the correct logo text", async () => {
  const text = await page.getContentsOf("a.brand-logo");
  expect(text).toEqual("Money Matters");
});

test("When not signed in, shows the correct Landing page", async () => {
  const text = await page.$eval("h1", el => el.innerHTML);
  expect(text).toEqual("Landing");
});

test("clicking login starts oauth flow", async () => {
  await page.waitFor('a[href="/auth/google"]');
  const text = await page.$eval('a[href="/auth/google"]', el => el.innerHTML);
  expect(text).toEqual("Login With Google");

  await page.click(".right a");
  const url = await page.url();
  expect(url).toMatch(/accounts\.google\.com/);
});

test("When signed in, shows logout button", async () => {
  await page.login();
  const text = await page.$eval('a[href="/api/logout"]', el => el.innerHTML);
  expect(text).toEqual("Logout");
});

const Page = require("./helpers/page");
const variables = require("./helpers/variables");

let page;
const { myTitle, localhost, categoriesUrl } = variables;

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
    await page.goto(`${localhost}/${categoriesUrl}`);
    await page.click("a.btn-floating");
  });

  test("can see category create form", async () => {
    const label = await page.getContentsOf("form label");
    expect(label).toEqual("Category Title");
  });

  test("can cancel create form works", async () => {
    const urlEnd = categoriesUrl;
    let label = await page.getContentsOf("form label");

    expect(label).toEqual("Category Title");
    await page.waitFor(`a[href="/${urlEnd}"]`);
    await page.click(`a[href="/${urlEnd}"]`);
    const url = page.url().split("/");

    expect(url[url.length - 1]).toEqual(urlEnd);
    await page.click("a.btn-floating");
    label = await page.getContentsOf("form label");
    expect(label).toEqual("Category Title");
  });

  describe("And using valid inputs", async () => {
    beforeEach(async () => {
      const cardCounts = await page.getLengthsOf(".card");
      expect(cardCounts).toEqual(0);

      await page.type("[name=categoryTitle]", myTitle);
      await page.click("form button");
    });
    test("Submitting takes user to review screen", async () => {
      const url = await page.url();
      const text = url.split("/");

      expect(text[text.length - 1]).toEqual(categoriesUrl);
    });

    test("Submitting then saving adds a new category to index page", async () => {
      await page.waitFor(".card");
      const title = await page.getContentsOf(".card-title");
      const cardCounts = await page.getLengthsOf(".card");

      expect(title).toEqual(myTitle);
      expect(cardCounts).toEqual(1);
    });
  });

  describe("And using invalid inputs", async () => {
    beforeEach(async () => {
      const inputValue = await page.getContentsOf("form input");
      expect(inputValue).toEqual("");
      await page.click("form button");
    });
    test("the form shows an error message", async () => {
      const titleError = await page.getContentsOf(".red-text");
      expect(titleError).toEqual("You must provide a title");
    });
  });
});

describe("When User is not logged in", async () => {
  const actions = [
    {
      method: "get",
      path: "/api/categories"
    },
    {
      method: "post",
      path: "/api/categories",
      data: {
        title: "T",
        content: "C"
      }
    }
  ];

  test("User cannot get or create category posts", async () => {
    const results = await page.execRequests(actions);
    for (let result of results) {
      expect(result).toEqual({ error: "You must log in!" });
    }
  });
});

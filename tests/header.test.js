// const puppeteer = require('puppeteer');

const Page = require('./helpers/page');

// let browser, page;
let page;

beforeEach(async () => {
	// // create a new browser
	// browser = await puppeteer.launch({
	// 	headless: false,
	// });
	// // create a new page
	// page = await browser.newPage();

	// // navigate to localhost
	// await page.goto('localhost:3000');

	// Use Proxy
	page = await Page.build();
	await page.goto('http://localhost:3000');
});

afterEach(async () => {
	// await browser.close();

	// Use Proxy
	await page.close();
});

// test header html
test('We can launch a browser', async () => {
	// const text = await page.$eval('a.brand-logo', el => el.innerHTML);

	const text = await page.getContentsOf('a.brand-logo');

	expect(text).toEqual('Blogster');
});

// test google auth
test('clicking login starts oauth flow', async () => {
	await page.click('.right a');

	const url = await page.url();

	expect(url).toMatch(/accounts\.google\.com/);
});

test('when signed in, shows logout button', async () => {
	await page.login();

	// const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);
	const text = await page.getContentsOf('a[href="/auth/logout"]');

	expect(text).toEqual('Logout');
});

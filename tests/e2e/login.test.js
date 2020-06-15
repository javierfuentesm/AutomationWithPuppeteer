const puppeteer = require('puppeteer')
const {
	click,
	getCount,
	getText,
	waitForText,
	shouldNotExist,
	typeText,
} = require('../../lib/helpers')

describe('Login flow', () => {
	let browser, page, pages
	before(async () => {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			devtools: false,
		})
		page = await browser.newPage()
		pages = await browser.pages()
		await pages[0].close()
		await page.setDefaultNavigationTimeout(20000)
		await page.setDefaultTimeout(10000)
	})
	after(async () => {
		await browser.close()
	})
	it('Login test -Invalid credentials ', async () => {
		await page.goto('http://zero.webappsecurity.com')
		await click(page, '#signin_button')
		await typeText(page, '#user_login', 'javer.fuentesm@hotmail.com')
		await typeText(page, '#user_password', 'hola1234')
		await click(page, '#user_remember_me')
		await click(page, 'input[type="submit"]')
		await page.waitForSelector('.alert-error')
	})
	it('Login test -Valid credentials ', async () => {
		await page.goto('http://zero.webappsecurity.com')
		await click(page, '#signin_button')
		await typeText(page, '#user_login', 'username')
		await typeText(page, '#user_password', 'password')
		await click(page, '#user_remember_me')
		await click(page, 'input[type="submit"]')
		await waitForText(page, 'body', 'Cash Accounts')
	})
})

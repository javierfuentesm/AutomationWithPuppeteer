const puppeteer = require('puppeteer')
const { click, waitForText, typeText } = require('../../lib/helpers')

describe('Payment Test', () => {
	let browser, page, pages
	before(async () => {
		browser = await puppeteer.launch({
			slowMo: 10,
			headless: false,
			devtools: false,
		})
		page = await browser.newPage()
		pages = await browser.pages()
		await pages[0].close()
		await page.setDefaultNavigationTimeout(20000)
		await page.setDefaultTimeout(10000)
		await page.goto('http://zero.webappsecurity.com/login.html')
		await typeText(page, '#user_login', 'username')
		await typeText(page, '#user_password', 'password')
		await click(page, '#user_remember_me')
		await click(page, 'input[type="submit"]')
		await waitForText(page, 'body', 'Cash Accounts')
	})
	after(async () => {
		await browser.close()
	})

	it('should  make a payment', async () => {
		await click(page, '#pay_bills_tab')
		await waitForText(page, 'body', 'your saved payees')
		await page.select('#sp_payee', 'apple')
		await page.select('#sp_account', '3')
		await typeText(page, '#sp_amount', '100')
		await typeText(page, '#sp_date', '2020-06-18')
		await page.keyboard.press('Enter', { delay: 10 })
		await typeText(page, '#sp_description', 'Payment for rent')
		await click(page, '#pay_saved_payees')
		await waitForText(page, 'body', 'successfully submitted')
		await page.waitFor(3000)
	})
})

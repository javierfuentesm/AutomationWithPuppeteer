const puppeteer = require('puppeteer')
const expect = require('chai').expect
const { click, waitForText, typeText } = require('../../lib/helpers')

describe('Feedback Test', () => {
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
	it('should display the feedback form', async () => {
		await page.goto('http://zero.webappsecurity.com')
		await click(page, '#feedback')
		await waitForText(page, 'body', 'IMPORTANT')
	})
	it('should  submit the feedback form', async () => {
		await typeText(page, '#name', 'Javier')
		await typeText(page, '#email', 'javier.fuentesm@hotmail.com')
		await typeText(page, '#subject', 'Test')
		await typeText(page, '#comment', ' comment')
		await click(page, 'input[type="submit"]')
	})
	it('should display the results page', async () => {
		await waitForText(page, 'body', 'Service staff')
		const url = await page.url()
		expect(url).to.include('/sendFeedback.html')
	})
})

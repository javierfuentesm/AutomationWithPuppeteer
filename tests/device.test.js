const puppeteer = require('puppeteer')

describe('Device Emulation', () => {
	let browser, page
	before(async () => {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			devtools: false,
		})
		page = await browser.newPage()
		await page.setDefaultTimeout(10000)
		await page.setDefaultNavigationTimeout(20000)
	})
	after(async () => {
		await browser.close()
	})
	it('Desktop device ', async () => {
		await page.setViewport({ width: 1650, height: 1050 })
		await page.goto('https://google.com')
		await page.waitFor(5000)
	})
	it('Tablet device ', async () => {
		const tablet = puppeteer.devices['iPad landscape']
		await page.emulate(tablet)
		await page.goto('https://google.com')

		await page.waitFor(5000)
	})
	it('Phone device ', async () => {
		const mobile = puppeteer.devices['iPhone X']
		await page.emulate(mobile)
		await page.goto('https://google.com')
		await page.waitFor(5000)
	})
})

const puppeteer = require('puppeteer')

describe('Device Emulation', () => {
	let browser, page
	before(async () => {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			devtools: false,
		})
		page = await puppeteer.newPage()
		await page.setDefaultTimeout(10000)
		await page.setDefaultNavigationTimeout(20000)
	})
})

const puppeteer = require('puppeteer')

describe('My first puppeter test', () => {
	it('Should  launch the browser', async () => {
		const browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			devtools: false,
		})
		const page = await browser.newPage()
		await page.goto('https://google.com')
		await page.waitForSelector('.gb_Fa')
		await page.goto('https://dev.to')
		await page.waitForSelector('#top-bar')
		await page.goBack()
		await page.waitForSelector('.gb_Fa')
		await page.goForward()
		await page.waitForSelector('#top-bar')
		await browser.close()
	})
})

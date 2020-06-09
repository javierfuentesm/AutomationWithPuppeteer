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
		await page.waitFor(3000)
		await page.waitForSelector('.gb_Fa')
		await page.reload()
		await page.waitFor(3000)
		await page.waitForSelector('.gb_Fa')
		await browser.close()
	})
})

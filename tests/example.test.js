const puppeteer = require('puppeteer')

describe('My first puppeter test', () => {
	it('Should  launch the browser', async () => {
		const browser = await puppeteer.launch({ headless: false })
		const page = await browser.newPage()
		await page.goto('https://google.com')
		await page.waitForSelector('.gb_Fa')
		await browser.close()
	})
})

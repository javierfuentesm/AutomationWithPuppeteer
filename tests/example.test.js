const puppeteer = require('puppeteer')

describe('My first puppeter test', () => {
	it('Should  launch the browser', async () => {
			const browser = await puppeteer.launch({
				headless: false,
				slowMo: 10,
				devtools: false,
			})
			const page = await browser.newPage()
		try {
			await page.goto('https://devexpress.github.io/testcafe/example/')
			await page.type('#developer-name', 'Javier', { delay: 0 })
			await page.waitFor(2000)
			await page.click('#tried-test-cafe', { clickCount: 1, delay: 0 })
			await page.waitFor(2000)
			await page.click('#tried-test-cafe', { clickCount: 1, delay: 0 })
			await page.waitFor(5000)
			await page.close()
		} catch (error) {
			console.error(error)
			await page.close()
		}
	})
})

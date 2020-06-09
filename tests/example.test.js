const puppeteer = require('puppeteer')

describe('My first puppeter test', () => {
	it('Should  fill th input and click the checkbox ', async () => {
		const browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			devtools: false,
		})
		const page = await browser.newPage()
		let pages = await browser.pages()
		await pages[0].close()

		try {
			await page.goto('https://devexpress.github.io/testcafe/example/')
			await page.type('#developer-name', 'Javier', { delay: 0 })
			await page.waitFor(2000)
			await page.click('#tried-test-cafe', { clickCount: 1, delay: 0 })
			await page.waitFor(2000)
			await page.click('#tried-test-cafe', { clickCount: 1, delay: 0 })
			await page.waitFor(5000)
		} catch (error) {
			console.error(error)
		} finally {
			await page.close()
		}
	})
	it('Should select an option of the dropdown and write the text in the textarea and  click on the submit', async () => {
		const browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			devtools: false,
		})
		const page = await browser.newPage()
		let pages = await browser.pages()
		await pages[0].close()
		try {
			await page.goto('https://devexpress.github.io/testcafe/example/')
			await page.type('#developer-name', 'Javier', { delay: 0 })
			await page.click('#tried-test-cafe', { clickCount: 1, delay: 0 })
			await page.waitFor(2000)
			await page.select('#preferred-interface', 'JavaScript API')
			await page.type('#comments', 'Un texto de prueba ')
			await page.click('#submit-button')
			await page.waitFor(5000)
		} catch (error) {
			console.error(error)
		} finally {
			await page.close()
		}
	})
	it('Should get the title and the url', async () => {
		const browser = await puppeteer.launch({
			headless: true,
			slowMo: 10,
			devtools: false,
		})
		const page = await browser.newPage()
		let pages = await browser.pages()
		await pages[0].close()
		try {
			await page.goto('https://devexpress.github.io/testcafe/example/')
			const title = await page.title()
			const url = await page.url()
			const text = await page.$eval('h1', e => e.textContent)
			console.log(text)
			console.log(`Titulo ${title} y url ${url}`)
		} catch (error) {
			console.error(error)
		} finally {
			await page.close()
		}
	})
})

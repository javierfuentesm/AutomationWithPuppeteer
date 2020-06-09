const puppeteer = require('puppeteer')
const expect = require('chai').expect

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
	it('Should get the title and the url and get the text and count the p', async () => {
		const browser = await puppeteer.launch({
			headless: true,
			slowMo: 10,
			devtools: false,
		})
		const page = await browser.newPage()
		await page.setDefaultTimeout(10000)
		await page.setDefaultNavigationTimeout(20000)
		let pages = await browser.pages()
		await pages[0].close()
		try {
			await page.goto('https://devexpress.github.io/testcafe/example/')
			const title = await page.title()
			const url = await page.url()
			const text = await page.$eval('h1', e => e.textContent)
			const count = await page.$$eval('p', e => e.length)

			console.log(
				`Titulo ${title} y url ${url} texto: ${text} , count: ${count}`
			)
			expect(title).to.be.a('string', 'TestCafe Example Page')
			expect(url).to.include('devexpress')
			expect(text).to.be.a('string', 'Example')
			expect(count).to.equal(9)
		} catch (error) {
			console.error(error)
		} finally {
			await page.close()
		}
	})
	it('Should simulate the keypress Enter', async () => {
		const browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			devtools: false,
		})
		const page = await browser.newPage()
		let pages = await browser.pages()
		await pages[0].close()
		try {
			await page.goto('https://google.com')
			await page.waitForSelector('.RNNXgb')
			await page.type('.RNNXgb', 'Que onda hoomies')
			await page.keyboard.press('Enter', { delay: 10 })
			await page.waitFor(5000)
		} catch (error) {
			console.error(error)
		} finally {
			await page.close()
		}
	})
})

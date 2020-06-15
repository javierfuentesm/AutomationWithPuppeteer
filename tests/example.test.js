const puppeteer = require('puppeteer')
const expect = require('chai').expect
const {
	click,
	getCount,
	getText,
	waitForText,
	shouldNotExist,
	typeText,
} = require('../lib/helpers')

describe('My first puppeter test', () => {
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
	})
	after(async () => {})
	beforeEach(async () => {})
	afterEach(async () => {})

	it('Should  fill th input and click the checkbox ', async () => {
		try {
			await page.goto('https://devexpress.github.io/testcafe/example/')
			await page.type('#developer-name', 'Javier', { delay: 0 })
			await click(page, '#tried-test-cafe')
			await page.waitFor(2000)
			await click(page, '#tried-test-cafe')
			/*
			await page.click('#tried-test-cafe', { clickCount: 1, delay: 0 })
			await page.waitFor(2000)
			await page.click('#tried-test-cafe', { clickCount: 1, delay: 0 })*/
			await page.waitFor(5000)
		} catch (error) {
			console.error(error)
		} finally {
			await page.close()
		}
	})
	it('Should select an option of the dropdown and write the text in the textarea and  click on the submit', async () => {
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
		try {
			await page.goto('https://devexpress.github.io/testcafe/example/')
			const title = await page.title()
			const url = await page.url()
			//const text = await page.$eval('h1', e => e.textContent)
			const text = await getText(page, 'h1')
			//const count = await page.$$eval('p', e => e.length)
			const count = await getCount(page, 'p')

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
		try {
			await page.goto('https://google.com')
			//Full XPath
			await page.waitForXPath(
				'/html/body/div/div[3]/form/div[2]/div[1]/div[1]/div/div[2]/input'
			)
			//Xpath
			await page.waitForXPath(
				'//*[@id="tsf"]/div[2]/div[1]/div[1]/div/div[2]/input'
			)
			// Clase de un elemento mas arriba
			await page.waitForSelector('.RNNXgb')

			await page.type('.RNNXgb', 'Que onda hoomies')
			await page.keyboard.press('Enter', { delay: 10 })
			await page.waitFor(2000)
		} catch (error) {
			console.error(error)
		} finally {
			await page.close()
		}
	})
	it('Should validate if the button  doesnt exist', async () => {
		try {
			await page.goto('https://google.com')
			//Full XPath
			/*	await page.waitForXPath(
				'/html/body/div/div[3]/form/div[2]/div[1]/div[1]/div/div[2]/input'
			)
			await page.type('.RNNXgb', 'Que onda hoomies')*/

			//Asi funciona cuando quieres escribir en un xpath
			await typeText(
				page,
				'/html/body/div/div[3]/form/div[2]/div[1]/div[1]/div/div[2]/input',
				'Que onda hoomies',
				true
			)
			//Asi funiona cuando quieres escribir en un selector
			await typeText(page, '.RNNXgb', 'Que onda hoomies')

			await page.keyboard.press('Enter', { delay: 10 })
			await page.waitFor(2000)
			//Validate document doesnt exist you can get this selector from google chrome devtools
			/*			await page.waitFor(
				() =>
					!document.querySelector(
						'#tsf > div:nth-child(2) > div.A8SBwf.emcav > div.RNNXgb > div > div.a4bIc > input'
					)
			)*/
			await shouldNotExist(
				page,
				'#tsf > div:nth-child(2) > div.A8SBwf.emcav > div.RNNXgb > div > div.a4bIc > input'
			)
			//Validate that the element doesnt exist  with the waitforselector/waitforxpath
			/*			await page.waitForXPath(
				'/html/body/div/div[3]/form/div[2]/div[1]/div[1]/div/div[2]/input',
				{ hidden: true, timeout: 3000 }
			)*/
			await shouldNotExist(
				page,
				'/html/body/div/div[3]/form/div[2]/div[1]/div[1]/div/div[2]/input',
				true
			)

			await page.waitFor(2000)
		} catch (error) {
			console.error(error)
		} finally {
			await page.close()
		}
	})
})

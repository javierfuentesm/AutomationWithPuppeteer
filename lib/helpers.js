module.exports = {
	click: async (page, selector) => {
		try {
			await page.waitForSelector(selector)
			await page.click(selector)
		} catch (error) {
			console.error(error)
			throw new Error(`Could not click on selector ${selector}`)
		}
	},
	getCount: async (page, selector) => {
		try {
			await page.waitForSelector(selector)
			return await page.$$eval(selector, element => element.length)
		} catch (error) {
			throw new Error(`Could get the count on selector ${selector}`)
		}
	},
	getText: async (page, selector) => {
		try {
			await page.waitForSelector(selector)
			return await page.$eval(selector, element => element.innerHTML)
		} catch (error) {
			throw new Error(`Could get the text on selector ${selector}`)
		}
	},
	typeText: async (page, selector, text, xpath = false) => {
		try {
			if (xpath) {
				await page.waitForXPath(selector)
				const input = await page.$x(selector)
				await input[0].type(text)
			} else {
				await page.waitForSelector(selector)
				await page.type(selector, text)
			}
		} catch (error) {
			throw new Error(`Could type on selector ${selector}`)
		}
	},
	waitForText: async (page, selector, text) => {
		try {
			await page.waitForSelector(selector)
			await page.waitForFunction(
				(selector, text) =>
					document.querySelector(selector).innerText.includes(text),
				{},
				selector,
				text
			)
		} catch (error) {
			console.error(error)
			throw new Error(`Could get the text on selector ${selector}`)
		}
	},
	shouldNotExist: async (page, selector, xpath = false) => {
		try {
			if (xpath) {
				await page.waitForXPath(selector, { hidden: true, timeout: 3000 })
			} else {
				await page.waitForSelector(selector, { hidden: true, timeout: 3000 })
			}
		} catch (error) {
			console.error(error)
			throw new Error(`Selector ${selector} should not be visible but it is`)
		}
	},
}

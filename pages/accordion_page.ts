import { Locator, Page, expect, test } from '@playwright/test';

export class AccordionPage {
    readonly page: Page;
    readonly todoHomepage: string = 'https://webdriveruniversity.com/Accordion/index.html'
    loaderTextElement: Locator;
    accordionTimeoutTextEelement: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loaderTextElement = page.locator('#hidden-text');
        this.accordionTimeoutTextEelement = page.locator('#timeout');
    }


    async open() {
        await this.page.goto(this.todoHomepage);
    }

    async waitForLoadedComplete() {
        await test.step ('Wait for complete loading.', async () => {
            await expect(this.loaderTextElement).toHaveText('LOADING COMPLETE.',{timeout: 20000});
        })
    }

    async verifyTextInAccordionTimeout() {
        await test.step ('Verify text in last accordion.', async () => {
            await expect(this.accordionTimeoutTextEelement).toHaveText("This text has appeared after 5 seconds!");
        })
    }

}
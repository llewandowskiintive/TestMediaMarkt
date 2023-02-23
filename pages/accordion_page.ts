import { Page, expect, test } from '@playwright/test';

export class AccordionPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open() {
        await this.page.goto('https://webdriveruniversity.com/Accordion/index.html');
    }

    async waitForLoadedComplete() {
        await test.step ('Wait for complete loading.', async () => {
            await expect(this.page.locator('#hidden-text')).toHaveText('LOADING COMPLETE.',{timeout: 20000});
        })
    }

    async verifyTextInAccordionTimeout() {
        await test.step ('Verify text in last accordion.', async () => {
            await expect(this.page.locator('#timeout')).toHaveText("This text has appeared after 5 seconds!");
        })
    }

}
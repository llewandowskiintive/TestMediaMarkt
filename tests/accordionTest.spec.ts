import { test, expect } from '@playwright/test';

import { AccordionPage } from '../pages/accordion_page';

test('User can verify the last Accordion text.', async ({ page }) => {
    const accordionPage = new AccordionPage(page);

    await accordionPage.open();
    // await page.waitForLoadState('networkidle')
    await accordionPage.waitForLoadedComplete();
    //await page.locator('.accordion').last().click();
    await accordionPage.verifyTextInAccordionTimeout();
  });
import { test, expect } from '@playwright/test';

import { AccordionPage } from '../pages/accordion_page';

test('User can verify the last Accordion text.', async ({ page }) => {
    const accordionPage = new AccordionPage(page);

    await accordionPage.open();
    await accordionPage.waitForLoadedComplete();
    await accordionPage.verifyTextInAccordionTimeout();
  });
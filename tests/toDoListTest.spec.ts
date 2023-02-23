import { test, expect } from '@playwright/test';

import { ToDoListPage } from '../pages/to_do_list_page';

test('User can add new element to ToDo List', async ({ page }) => {
    const todoListPage = new ToDoListPage(page);
    const newToDo: string = "New TO DO";

    await todoListPage.open();

    const a = await todoListPage.writeAndReturnHowManyItemsInToDo();
    await todoListPage.addNewToDo(newToDo);
    await todoListPage.writeAndReturnHowManyItemsInToDo();
    await expect(page.getByText(newToDo)).toBeVisible();
    await expect(page.locator('li')).toHaveCount(a+1);
    await todoListPage.deleteToDoByName(newToDo);
    await todoListPage.writeAndReturnHowManyItemsInToDo();
  });
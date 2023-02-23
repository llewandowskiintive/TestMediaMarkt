import { test, Page, expect } from '@playwright/test';

export class ToDoListPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    

    async open() {
        await this.page.goto('https://webdriveruniversity.com/To-Do-List/index.html');
    }

    async clickPlusButton(){
        await this.page.click("#plus-icon");
    }

    async addNewToDo(newToDo: string) {
        await test.step ('Add new TODO: \"' + newToDo + '\" to the TODO list.', async () => {
            if (await this.page.getByPlaceholder('Add new todo').isHidden()){
                await this.clickPlusButton();
            }
            await this.page.getByPlaceholder('Add new todo').focus();
            await this.page.keyboard.type(newToDo);
            await this.page.keyboard.press("Enter");
        })
    }

    async writeAndReturnHowManyItemsInToDo() {
        let numberOfItems = await this.page.locator('li').count();
        console.log("On the list are " + numberOfItems.toString() + " elements.");
        return numberOfItems;
    }

    async deleteToDoByName(todoToDelete: string) {
        await test.step ('Delete TODO: \"' + todoToDelete + '\" from the TODO list.', async () => {
            await this.page.getByRole('listitem').filter({ hasText: todoToDelete}).hover();
            await this.page.getByRole('listitem').filter({ hasText: todoToDelete}).locator('i').click();
            await expect(this.page.getByRole('listitem').filter({ hasText: todoToDelete})).toBeHidden();
        })
    }
}
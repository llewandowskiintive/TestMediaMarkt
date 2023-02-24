import { test, Page, expect, Locator } from '@playwright/test';

export class ToDoListPage {
    readonly page: Page;
    readonly accordionHomepage: string = 'https://webdriveruniversity.com/To-Do-List/index.html';
    plusButtonElement: Locator;
    addNewTodoElement: Locator;
    todoItemsElements: Locator;

    constructor(page: Page) {
        this.page = page;
        this.plusButtonElement = this.page.locator("#plus-icon");
        this.addNewTodoElement = this.page.getByPlaceholder('Add new todo');
        this.todoItemsElements = this.page.locator('li');
    }
    

    async open() {
        await this.page.goto(this.accordionHomepage);
    }

    async clickPlusButton(){
        await this.plusButtonElement.click();
    }

    async addNewToDo(newToDo: string) {
        await test.step (`Add new TODO: \"${newToDo}\" to the TODO list.`, async () => {
            if (await this.addNewTodoElement.isHidden()){
                await this.clickPlusButton();
            }
            await this.addNewTodoElement.fill(newToDo);
            await this.page.keyboard.press("Enter");
        })
    }

    async returnHowManyItemsInToDo() {
        let numberOfItems = test.step(`Checking how many elements is on the TODO list.`, async () => {
            return this.todoItemsElements.count();
        })
        test.step(`TODO list has ${(await numberOfItems).valueOf()} elements.`, async () => {})
        return numberOfItems;
    }

    async deleteToDoByName(todoToDelete: string) {
        await test.step (`Delete TODO: \"${todoToDelete}\" from the TODO list.`, async () => {
            await this.todoItemsElements.filter({ hasText: todoToDelete}).hover();
            await this.todoItemsElements.filter({ hasText: todoToDelete}).locator('i').click();
            await expect(this.todoItemsElements.filter({ hasText: todoToDelete})).toBeHidden();
        })
    }
}
import { TodoItemDTO } from './../../core/todo-item.dto';
import { TodoItem } from './../../core/todo-item.entity';
import { MockRepository } from './../../core/mock-repository';
import { ItemController } from './../../core/item-controller';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    // these items are shown in the view and refreshed through various actions
    private items: TodoItem[];

    // the entry point for the core app
    private itemController: ItemController;

    constructor(public navCtrl: NavController) {
        this.itemController = new ItemController(new MockRepository());
        this.refreshItems();

        // simulate adding a new item after 3s
        setTimeout(() => {
            this.dummyAddItem();
        }, 3000);

        // simulate editing an item after 5s
        setTimeout(() => {
            this.dummyUpdateItem();
        }, 5000);
    }

    refreshItems() {
        this.itemController.getItems("list.1").then( items => {
            this.items = items;
        });
    }

    /**
     * In a real app, the view in Ionic would have two-way binding to this DTO.
     * Once the user is done with editing, the DTO is sent to the ItemController,
     * which takes care of business rules validation and persistence.
     */
    dummyUpdateItem() {
        let dto = new TodoItemDTO;
        dto._list_id = "list.1";
        dto._id = "item.1.2";
        dto.done = new Date().toString();
        dto.name = "I WAS UPDATED";
        dto.orderNr = 1;
        this.itemController.updateItemInList(dto).then( ok => {
            console.log("updated?", ok);
            if (ok) {
                this.refreshItems();
                this.itemController.debugDumpMockRepo();
            }
        });
    }

    // see comment above
    dummyAddItem() {
        let dto = new TodoItemDTO;
        dto.done = null;
        dto.name = "Test";
        this.itemController.addItemToList(dto, "list.1").then( ok => {
            console.log("added?", ok);
            if (ok) {
                this.refreshItems();
            }
        });
    }
}

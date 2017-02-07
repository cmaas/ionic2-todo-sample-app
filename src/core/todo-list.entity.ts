import { TodoItem } from './todo-item.entity';

/**
 * TodoList business object. It maintains integrity and doesn't allow items with
 * a done older than its own creation. Not a very complex rule, but it is one ;)
 * orderNr is neglected right now.
 */
export class TodoList {

    _id: string;
    name: string;
    orderNr: number;
    created: Date;

    private items: TodoItem[];

    constructor() {
        this.items = [];
    }

    updateItem(item: TodoItem) {
        if (item.done && item.done < this.created) {
            console.log("item too old: ", item.done, "<", this.created);
            return false;
        }
        const index = this.items.findIndex( it => it._id === item._id );
        this.items[index] = item;
        return true;
    }

    addItem(item: TodoItem) {
        // business rules validation
        if (item.done && item.done < this.created) {
            console.log("item too old: ", item.done, "<", this.created);
            return false;
        }
        this.items.push(item);        
        return true;
    }

    getItems() {
        return this.items;
    }

    addItems(items: TodoItem[]) {
        items.forEach( item => this.addItem(item) );
    }
}
import { TodoList } from './todo-list.entity';

/**
 * The business entity. Not much in it, but there's a reference to TodoList and a
 * value object done: Date
 * orderNr is neglected right now.
 */
export class TodoItem {

    _id: string;
    name: string;
    done: Date;
    orderNr: number;

    list: TodoList;

}
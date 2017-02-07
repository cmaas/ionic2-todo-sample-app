import { TodoItemDTO } from './todo-item.dto';
import { TodoListDTO } from './todo-list.dto';

/**
 * Interface for the repository to reduce dependencies.
 */
export interface DataRepository {

    saveItem(itemDTO: TodoItemDTO);

    getListById(_list_id: string): Promise<TodoListDTO>;
    getListItems(_list_id: string): Promise<TodoItemDTO[]>;

    // for testing purposes
    debug();
}
import { TodoList } from './todo-list.entity';
import { TodoFactory } from './todo-factory';
import { TodoListDTO } from './todo-list.dto';
import { TodoItemDTO } from './todo-item.dto';
import { TodoItem } from './todo-item.entity';
import { DataRepository } from './data-repository';

/**
 * The entry point for our little ToDo app. It's like an API for Ionic 2
 * and offers all use cases required.
 * Obviously, this could be improved. The repository is queried quite often. The controller
 * could have some kind of cache for entities to avoid calling the DB all the time.
 */
export class ItemController {

    constructor(private repo: DataRepository) {
    }

    addItemToList(dto: TodoItemDTO, _list_id: string): Promise<boolean> {
        return this.getList(_list_id).then( list => {
            const item = TodoFactory.itemForListFromDTO(dto, list);
            if (list.addItem(item)) {
                // business validation passed, now persist
                // either the entire list or only the new item
                // but serialize the item entity to a DTO again for integrity reasons
                const dto = TodoFactory.mapItemEntityToDTO(item);
                this.repo.saveItem(dto);
                return true;
            }
            // maybe throw an error here to show why this failed
            return false;
        });
    }

    updateItemInList(dto: TodoItemDTO): Promise<boolean> {
        return this.getList(dto._list_id).then( list => {
            const item = TodoFactory.itemForListFromDTO(dto, list);
            if (list.updateItem(item)) {
                // business validation passed, now persist
                // either the entire list or only the new item
                // but serialize the item entity to a DTO again for integrity reasons
                const dto = TodoFactory.mapItemEntityToDTO(item);
                this.repo.saveItem(dto);
                return true;
            }
            // maybe throw an error here to show why this failed
            return false;
        });
    }

    getItems(_list_id: string): Promise<TodoItem[]> {
        return this.getList(_list_id).then( list => list.getItems() );
    }


    private getList(_list_id: string): Promise<TodoList> {
        return this.repo.getListById(_list_id).then( (listDTO: TodoListDTO) => {
            return this.repo.getListItems(listDTO._id).then( (itemDTOs: TodoItemDTO[]) => {
                return TodoFactory.listWithItemsFromDTOs(listDTO, itemDTOs);
            });
        });
    }

    debugDumpMockRepo() {
        this.repo.debug();
    }
}
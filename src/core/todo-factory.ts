import { TodoItem } from './todo-item.entity';
import { TodoList } from './todo-list.entity';
import { TodoListDTO } from './todo-list.dto';
import { TodoItemDTO } from './todo-item.dto';

/**
 * Entities are created from DTOs.
 * DTOs are mapped to from entities.
 */
export class TodoFactory {

    /**
     * Creates a TodoItem entity.
     * TodoItems cannot be created without a given list.
     */
    static itemForListFromDTO(dto: TodoItemDTO, list: TodoList): TodoItem {
        const item = new TodoItem;
        item._id = dto._id;
        item.done = dto.done ? new Date(dto.done) : null;
        item.name = dto.name;
        item.orderNr = dto.orderNr;
        item.list = list;
        return item;
    }

    /**
     * 
     */
    static listWithItemsFromDTOs(listDTO: TodoListDTO, itemDTOs: TodoItemDTO[]): TodoList {
        // make a list
        const list = TodoFactory.emptyListFromDTO(listDTO);
        // make items
        const items = itemDTOs.map( dto => TodoFactory.itemForListFromDTO(dto, list) );
        // add these items to the list;
        list.addItems(items);
        return list;
    }

    /**
     * A list must be created empty. Items must be added through
     * the entities' methods for data integrity.
     */
    static emptyListFromDTO(dto: TodoListDTO): TodoList {
        const list = new TodoList;
        list._id = dto._id;
        list.created = new Date(dto.created);
        list.name = dto.name;
        list.orderNr = dto.orderNr;
        return list;
    } 

    /**
     * For saving: Turn an entity to a DTO, which is then turned into
     * a doc in the repository.
     */
    static mapItemEntityToDTO(item: TodoItem): TodoItemDTO {
        const dto = new TodoItemDTO;
        dto._id = item._id;
        dto._list_id = item.list._id;
        dto.done = item.done ? item.done.toString() : null;
        dto.name = item.name;
        dto.orderNr = item.orderNr;
        return dto;
    }
}
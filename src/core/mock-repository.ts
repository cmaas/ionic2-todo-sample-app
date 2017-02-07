import { TodoItemDTO } from './todo-item.dto';
import { TodoListDTO } from './todo-list.dto';
import { DataRepository } from './data-repository';

/**
 * Mock data with a flat doc data structure. It mimicks the docs in CouchDB/PouchDB somewhat.
 * Note how the documents have `type` and `_rev` attributes, but the DTOs don't have them.
 * In the domain layer, we don't care about these attributes.
 */
export class MockRepository implements DataRepository {
    
    private docs: any[];

    constructor() {
        this.docs = [
            {
                type: "list",
                _id: "list.1",
                _rev: 1,
                name: "My ToDos",
                orderNr: 1,
                created: "2017-02-06 10:00:00"
            },
            {
                type: "item",
                _id: "item.1.1",
                _rev: 5,
                name: "Do laundry",
                done: null,
                orderNr: 2,
                _list_id: "list.1"
            },
            {
                type: "item",
                _id: "item.1.2",
                _rev: 1,
                name: "dance",
                done: "2017-02-06 11:00:24",
                orderNr: 1,
                _list_id: "list.1"
            },
        ];
    }

    getListById(_list_id: string): Promise<TodoListDTO> {
        const doc = this.docs
                        .filter( docs => docs.type === "list" )
                        .find( listDocs => listDocs._id === _list_id );
        
        const dto = this.listDocToDTO(doc);

        return Promise.resolve(dto);
    }
    
    getListItems(_list_id: string): Promise<TodoItemDTO[]> {
        const docs = this.docs.filter( doc => doc.type === "item" && doc._list_id === _list_id );

        const dtos = docs.map( itemDoc => this.itemDocToDTO(itemDoc) );

        return Promise.resolve(dtos);
    }

    /*
     * Could also return a Promise<boolean> as a success indicator, but for now
     * we assume that saving stuff to the repository works
     */
    saveItem(itemDTO: TodoItemDTO) {
        // save new
        if (! itemDTO._id) {
            itemDTO._id = this.generateItemId(itemDTO._list_id);
            const doc = this.itemDTOtoDoc(itemDTO);
            this.docs.push(doc);
        }
        // update existing
        else {
            let index = this.docs.findIndex( doc => doc.type === "item" && doc._id === itemDTO._id);
            let currentRev = this.docs[index]._rev;
            this.docs[index] = this.itemDTOtoDoc(itemDTO);
            this.docs[index]._rev = currentRev + 1;
        }
    }

    private generateItemId(_list_id: string) {
        const docs = this.docs.filter( doc => doc.type === "item" && doc._list_id === _list_id );
        const nextId = docs.length + 1;
        return _list_id.replace("list", "item") + "." + nextId;
    }

    private listDocToDTO(doc: any) {
        const list = new TodoListDTO;
        list._id = doc._id;
        list.created = doc.created;
        list.name = doc.name;
        list.orderNr = doc.orderNr;
        return list;
    }

    private itemDocToDTO(doc: any) {
        const item = new TodoItemDTO;
        item._id = doc._id;
        item._list_id = doc._list_id;
        item.done = doc.done;
        item.name = doc.name;
        item.orderNr = doc.orderNr;
        return item;
    }

    private itemDTOtoDoc(dto: TodoItemDTO) {
        return {
            type: "item",
            _id: dto._id,
            _rev: 1,
            name: dto.name,
            done: dto.done,
            orderNr: dto.orderNr,
            _list_id: dto._list_id
        };
    }

    debug() {
        console.log(this.docs);
    }
}
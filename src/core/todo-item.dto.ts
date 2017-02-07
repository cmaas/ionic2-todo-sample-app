/**
 * Plain old JavaScript object representation of the entity.
 * It's used to transport data from a view (think: form/input) to the
 * domain layer.
 */
export class TodoItemDTO {

    _id: string;
    name: string;
    done: string;
    orderNr: number;

    _list_id: string;
}
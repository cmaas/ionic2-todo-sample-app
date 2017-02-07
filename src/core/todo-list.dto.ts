/**
 * Plain old JavaScript object representation of the entity.
 * It's used to transport data from a view (think: form/input) to the
 * domain layer.
 */
export class TodoListDTO {

    _id: string;
    name: string;
    orderNr: number;
    created: string;

}
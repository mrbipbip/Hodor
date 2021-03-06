import {BaseDao} from "./BaseDao";
import {Task} from "../model/Task";
import {Sqlite} from "../../sql/Sqlite";

const tableName: string = "task";

const fkUserIdField: string = "fk_user_id";
const fkUserIdAuthorField: string = "fk_user_id_author";
const contentField: string = "task_content";
const deadlineField: string = "task_deadline";
const ackField: string = "task_ack";
const typeField: string = "task_type";

const idField: string = tableName + "_id"; 

export class ModuleDao extends BaseDao<Task> {
    constructor(sqlConnector: Sqlite) {
        super(tableName, idField, sqlConnector);
    }

    protected getMapDataFromModel(model: Task): Map<string, any> {
        let result: Map<string, any> = new Map<string, any>();
        //result.set(this.idFieldName, model.id); // only needed for user; others id are autogenerated
        result.set(fkUserIdAuthorField, model.authorId);
        result.set(fkUserIdField, model.userId);
        result.set(contentField, model.content);
        result.set(deadlineField, model.deadline);
        result.set(ackField, model.ack);
        result.set(typeField, model.type);
        return result;
    }

    protected getModelFromRow(row: any): Task {
        return new Task(row[idField], row[fkUserIdField], row[fkUserIdAuthorField], row[contentField], row[deadlineField], row[ackField], row[typeField]);
    }
}
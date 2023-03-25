export interface Todo {
    id: number;
    task: string;
    completed: boolean;
    date: string;
}

export interface taskProps{
    todo: Todo
    update: {
        (id:number, task:boolean):void;
    }
    handle: {
        (id:number, task:string):void;
    }
    deleteTask:{
        (id:number):void;
    }
}
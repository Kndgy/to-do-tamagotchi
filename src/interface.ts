export interface Todo {
    id: number;
    startTime: string;
    startDate: string;
    dueDate: string;
    dueTime: string;
    task: string;
    description: string;
    completed: boolean;
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
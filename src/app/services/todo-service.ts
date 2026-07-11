import { computed, Service, signal } from '@angular/core';

@Service()
export class TodoService {
    todos = signal<Todo[]>([])
    noOfTodos = computed(() => this.todos().length)
    noOfCompletedTodos = computed(() => this.todos().reduce((total, todo) => todo.done ? total + 1 : total, 0));
    addTodo(text:string) {
        if (!text) return;
        this.todos.update((list) => [...list, { id: Date.now(), text, done: false }])
    }
    toggleTodo(id: number) {
        this.todos.update(list => list.map(item => item.id === id ? { ...item, done: !item.done } : item))
    }
    removeTodo(id: number) {
        this.todos.update(list => list.filter(item => item.id !== id))
    }
}

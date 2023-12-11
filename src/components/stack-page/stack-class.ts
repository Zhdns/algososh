export class Stack<T> {
    private storage: T[] = []

    push(item: T) {
        this.storage.push(item)
    }

    pop(): T | undefined {
        return this.storage.pop()
    }

    peek(): T | undefined {
        return this.storage[this.storage.length - 1]
    }

    isEmpthy() {
        this.storage = []
    }

    getElements(): T[] {
        return [...this.storage]
    }
}
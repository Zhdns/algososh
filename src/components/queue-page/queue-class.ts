
export class QueueClass <T> {
       private storage: T[] = []

       enqueue(value: T) {
              this.storage.push(value)
       }

       dequeue(): T | undefined {
              return this.storage.shift()
       }

       isEmpty() {
              this.storage = []
       }

       getElements(): T[] {
              return [...this.storage]
       }
}
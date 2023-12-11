export class ListNode<T> {
    value: T;
    next: ListNode<T> | null = null
  
    constructor(value: T) {
      this.value = value
    }
  }
  
  export class LinkedList<T> {
    head: ListNode<T> | null = null
    tail: ListNode<T> | null = null
  
    constructor(initialArray? : T[]) {
      initialArray?.forEach(element => {
        this.append(element)
      })
    }
  
    prepend(value:T): void {
      const newNode = new ListNode(value)
      newNode.next = this.head
      this.head = newNode
  
      if(!this.tail) {
        this.tail = newNode
      }
    }
  
    append(value:T): void {
      const newNode = new ListNode(value)
  
      if(!this.head) {
        this.head = newNode
        this.tail = newNode
        return
      }
      if(this.tail) {
        this.tail.next = newNode
      }
      this.tail = newNode
    }
  
    addByIndex(value: T, index: number): void{
      const newNode = new ListNode(value)
      if(index === 0 || !this.head) {
        newNode.next = this.head
        this.head = newNode
  
        if (!this.tail) {
          this.tail = newNode
        }
        return 
      }
  
      let current = this.head
      for (let i = 0; i < index - 1 && current; i++) {
        if (!current.next) {
          break
        }
        current = current.next
      }
  
      if (current) {
        newNode.next = current.next
        current.next = newNode
        
        if(!newNode.next) {
          this.tail = newNode
        }
      }
    }
  
    deleteByIndex(index: number): T | null {
      if (!this.head) return null;
      if (index === 0) {
          const deletedHead = this.head;
          this.head = this.head.next;
          if (!this.head) this.tail = null;
          return deletedHead.value;
      }
  
      let current = this.head;
      for (let i = 0; i < index - 1 && current.next; i++) {
          current = current.next;
      }
  
      if (current.next) {
          const deleted = current.next;
          current.next = deleted.next;
          if (!current.next) {
              this.tail = current;
          }
          return deleted.value;
      }
  
      return null;
    }
  
    deleteHead(): T | null {
      if(!this.head) return null
      const deletedHead = this.head
      this.head = this.head.next
      if(!this.head) this.tail = null
      return deletedHead.value
    }
  
    deleteTail(): T | null {
      if (!this.head) return null
      if (!this.head.next) {
        const deletedTail = this.head
        this.head = null
        this.tail = null
        return deletedTail.value
      }
      let current = this.head
      while (current.next && current.next.next) {
        current = current.next
      }
      const deletedTail = current.next
      if (!deletedTail) return null; 
      current.next = null
      this.tail = current
      return deletedTail.value
    }
  
    toArray(): T[] {
      const elements = []
      let current = this.head
      while (current !== null) {
        elements.push(current.value)
        current = current.next
      }
      return elements
    }
  }
  
  
  
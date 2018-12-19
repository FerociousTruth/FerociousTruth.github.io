// This code reexports the PriorityQueue so we can use it without modules
import * as PriorityQueue1 from 'js-priority-queue'

declare global {
    const PriorityQueue: typeof PriorityQueue1;
}

export {};

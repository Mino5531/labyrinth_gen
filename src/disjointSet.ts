export class DisjointSet {
    items: DisjointSetElement[]; //Contains all items in the data structure. These items can be in different sets.
    constructor() {
        this.items = [];
    }
    //Adds a new item to the data structure, and creates a new set containing only that item.
    add(item: any): number {
        return this.items.push(new DisjointSetElement(item));
    }
    //Finds the representative element of the set that the given item belongs to.
    find(value: any): DisjointSetElement {
        const item = this.items.find((item) => item.value === value);
        if (item.parent === item) {
            return item;
        }
        item.parent = this.find_by_disjointSetElement(item.parent); // Path compression
        return item.parent;
    }
    //This function is faster than find(value) because is does not search for the item in the items array.
    find_by_disjointSetElement(item: DisjointSetElement): DisjointSetElement {
        if (item.parent === item) {
            return item;
        }
        item.parent = this.find_by_disjointSetElement(item.parent); // Path compression
        return item.parent;
    }
    //Union the sets that the given items belong to.
    union(x: any, y: any) {
        let xRoot = this.find(x);
        let yRoot = this.find(y);
        if (xRoot === yRoot) {
            return;
        }
        if (xRoot.rank < yRoot.rank) {
            xRoot.parent = yRoot;
        } else if (xRoot.rank > yRoot.rank) {
            yRoot.parent = xRoot;
        } else {
            yRoot.parent = xRoot;
            xRoot.rank++;
        }
    }
}

class DisjointSetElement {
    value: any;
    parent: DisjointSetElement;
    rank: number;
    constructor(value: any) {
        this.value = value;
        this.parent = this;
        this.rank = 0;
    }
}
export class ComparisionMatrix {
    constructor(items, topic) {
        this.items = items;
        this.topic = topic;
    }
    updateItem(item) {
        this.items[this.items.indexOf(item)] = item;
    }
}

import {RatingItem} from "../../data/model/RatingItem";

export class ComparisionMatrix<item extends RatingItem, goal extends RatingItem> {
    constructor(private readonly items: Array<item>, private readonly topic: goal) {

    }

    updateItem(item: item) {
        this.items[this.items.indexOf(item)] = item;
    }
}
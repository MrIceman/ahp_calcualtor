import {RatingItem} from "../../data/model/RatingItem";
import {ComparisionItem} from "../../data/model/ComparisionItem";

export class ComparisionMatrix<item extends RatingItem, goal extends RatingItem> {
    constructor(public readonly rows: Array<ComparisionItem<item, goal>>) {

    }
}
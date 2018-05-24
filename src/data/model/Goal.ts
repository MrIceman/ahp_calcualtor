import {RatingItem} from "./RatingItem";

export class Goal extends RatingItem {
    constructor(public readonly name = '') {
        super();
    }
}
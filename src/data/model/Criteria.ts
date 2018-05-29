import {RatingItem} from "./RatingItem";

export class Criteria extends RatingItem {

    constructor(public name: string = '', public comparisionValues: Map<Criteria, Number> = new Map(), public globalRating = 0) {
        super();
    }
}
import {RatingItem} from "./RatingItem";

export class Criteria extends RatingItem {

    constructor(public name: string = '', public comparisionValues: Map<string, number> = new Map(), public globalRating = 0) {
        super();
    }
}
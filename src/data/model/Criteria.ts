import {RatingItem} from "./RatingItem";

export class Criteria extends RatingItem {

    constructor(public name: string = '', public goalScore: number = 0, public globalRating = 0) {
        super();
    }
}
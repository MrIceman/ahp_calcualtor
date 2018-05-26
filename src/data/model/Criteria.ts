import {RatingItem} from "./RatingItem";

export class Criteria extends RatingItem {

    constructor(public name: string = '', public readonly goalScore: number = 0, public globalRating = 0) {
        super();
    }
}
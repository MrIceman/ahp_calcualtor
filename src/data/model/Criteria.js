import { RatingItem } from "./RatingItem";
export class Criteria extends RatingItem {
    constructor(name = '', goalScore = 0, globalRating = 0) {
        super();
        this.name = name;
    }
}

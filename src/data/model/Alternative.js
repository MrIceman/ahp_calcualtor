import { RatingItem } from "./RatingItem";
export class Alternative extends RatingItem {
    constructor(name, criteriaScore = new Map(), globalRating = -1) {
        super();
        this.name = name;
    }
}

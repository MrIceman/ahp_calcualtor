import {RatingItem} from "./RatingItem";
import {Criteria} from "./Criteria";

export class Alternative extends RatingItem {

    constructor(public name: string, public criteriaScore: Map<Criteria, Map<Alternative, number>> = new Map(), public globalRating: number = -1,) {
        super();
    }
}
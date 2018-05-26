import {RatingItem} from "./RatingItem";
import {Criteria} from "./Criteria";

export class Alternative extends RatingItem {

    constructor(public name: string, public criteriaScore: Map<Criteria, number> = new Map(), public globalRating: number = -1) {
        super();
    }
}
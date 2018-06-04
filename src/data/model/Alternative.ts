import {RatingItem} from "./RatingItem";
import {Criteria} from "./Criteria";

export class Alternative extends RatingItem {

    /*
        globalRating has the format of Map<string, number> where the String is the name of the criteria and the number the global score of the alternative
        regarding that criteria
     */
    constructor(public name: string, public criteriaScore: Map<string, Map<string, number>> = new Map(), public globalRating: Map<string, number> = new Map()) {
        super();
    }
}
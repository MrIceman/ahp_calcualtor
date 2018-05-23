import {RatingItem} from "../../data/model/RatingItem";
import {Score} from "../../data/model/Score";

export class ComparisionItem<item extends RatingItem, goal extends RatingItem> {
    /**
     * A Score goes from 0 to 18
     * where a ranking between 0 and 8 is in favor of itemA (ascending) and 10 to 18 for itemB.
     * a 9 means equal priority.
     *
     * @param {item} itemA
     * @param {item} itemB
     * @param {goal} target
     * @param {number} rating
     */
    constructor(public readonly itemA: item,
                public readonly itemB: item,
                public readonly target: goal,
                public rating: Score,) {
    };

}
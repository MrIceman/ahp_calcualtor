import {Criteria} from "./model/Criteria";
import {Alternative} from "./model/Alternative";
import {Score} from "./model/Score";
import {Goal} from "./model/Goal";
import {RatingItem} from "./model/RatingItem";

export class Repository {

    constructor(
        public goal: Goal,
        private readonly criteriaArray: Array<Criteria> = [],
        private readonly alternativeArray: Array<Alternative> = [],
        public criteriaMap: Map<[Goal, Criteria, Criteria], Score>, // Goal and Criterias
        public alternativeMap: Map<[Criteria, Alternative, Alternative], Score>,
    ) {

    }

    setGoal(goal: Goal) {
        this.goal = goal;
    }

    insertCriteria(criteria: Criteria) {
        this.insertRatingItem(criteria, this.criteriaArray);
    }

    insertAlternative(alternative: Alternative) {
        this.insertRatingItem(alternative, this.alternativeArray);
    }


    private insertRatingItem(item: RatingItem, to: Array<RatingItem>) {
        if (to.indexOf(item) === -1)
            to.push(item);
    }

    public updateCriteriaMap(values: Map<[Goal, Criteria, Criteria], Score>) {
        this.criteriaMap = values;
    }

    public updateAlternativeMap(values: Map<[Goal, Alternative, Alternative], Score>) {
        this.alternativeMap = values;
    }
}
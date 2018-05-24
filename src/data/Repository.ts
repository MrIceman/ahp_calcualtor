import {Criteria} from "./model/Criteria";
import {Alternative} from "./model/Alternative";
import {Goal} from "./model/Goal";
import {RatingItem} from "./model/RatingItem";
import {ComparisionItem} from "./model/ComparisionItem";

export class Repository {

    constructor(
        public goal: Goal,
        private readonly criteriaArray: Array<Criteria> = [],
        private readonly alternativeArray: Array<Alternative> = [],
        public criteriaCompareValues: Array<ComparisionItem<Criteria, Goal>> = [],
        public alternativesCompareValues: Array<ComparisionItem<Alternative, Criteria>> = []
    ) {

    }

    setGoal(goal: Goal) {
        this.goal = goal;
    }

    insertCriteria(criteria: Criteria): Array<Criteria> {
        return this.insertRatingItem(criteria, this.criteriaArray) as Criteria[];
    }

    insertAlternative(alternative: Alternative): Array<Alternative> {
        return this.insertRatingItem(alternative, this.alternativeArray) as Alternative[];
    }


    private insertRatingItem(item: RatingItem, to: Array<RatingItem>): Array<RatingItem> {
        if (to.indexOf(item) === -1)
            to.push(item);
        return to;
    }

    getCriteria(): Array<Criteria> {
        return this.criteriaArray;
    }

    getAlternatives(): Array<Alternative> {
        return this.alternativeArray;
    }


}
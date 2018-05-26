import {Criteria} from "./model/Criteria";
import {Alternative} from "./model/Alternative";
import {Goal} from "./model/Goal";
import {RatingItem} from "./model/RatingItem";

export class Repository {

    constructor(
        public goal: Goal,
        private readonly criteriaArray: Array<Criteria> = [],
        private readonly alternativeArray: Array<Alternative> = [],
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

    public updateCriteria(criteria: Criteria) {
        for (let i = 0; i < this.criteriaArray.length; i++) {
            if (this.criteriaArray[i].name == criteria.name) {
                this.criteriaArray[i] = criteria;
            }
        }
    }

    public updateAlternative(alternative: Alternative) {
        for (let i = 0; i < this.alternativeArray.length; i++) {
            if (this.alternativeArray[i].name == alternative.name) {
                this.alternativeArray[i] = alternative;
            }
        }
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
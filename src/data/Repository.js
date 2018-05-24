export class Repository {
    constructor(goal, criteriaArray = [], alternativeArray = [], criteriaCompareValues = [], alternativesCompareValues = []) {
        this.goal = goal;
        this.criteriaArray = criteriaArray;
        this.alternativeArray = alternativeArray;
        this.criteriaCompareValues = criteriaCompareValues;
        this.alternativesCompareValues = alternativesCompareValues;
    }
    setGoal(goal) {
        this.goal = goal;
    }
    insertCriteria(criteria) {
        return this.insertRatingItem(criteria, this.criteriaArray);
    }
    insertAlternative(alternative) {
        return this.insertRatingItem(alternative, this.alternativeArray);
    }
    insertRatingItem(item, to) {
        if (to.indexOf(item) === -1)
            to.push(item);
        return to;
    }
    getCriteria() {
        return this.criteriaArray;
    }
    getAlternatives() {
        return this.alternativeArray;
    }
}

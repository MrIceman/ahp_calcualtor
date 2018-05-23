export class Repository {
    constructor(goal, criteriaArray = [], alternativeArray = [], criteriaMap, // Goal and Criterias
    alternativeMap) {
        this.goal = goal;
        this.criteriaArray = criteriaArray;
        this.alternativeArray = alternativeArray;
        this.criteriaMap = criteriaMap;
        this.alternativeMap = alternativeMap;
    }
    setGoal(goal) {
        this.goal = goal;
    }
    insertCriteria(criteria) {
        this.insertRatingItem(criteria, this.criteriaArray);
    }
    insertAlternative(alternative) {
        this.insertRatingItem(alternative, this.alternativeArray);
    }
    insertRatingItem(item, to) {
        if (to.indexOf(item) === -1)
            to.push(item);
    }
    updateCriteriaMap(values) {
        this.criteriaMap = values;
    }
    updateAlternativeMap(values) {
        this.alternativeMap = values;
    }
}

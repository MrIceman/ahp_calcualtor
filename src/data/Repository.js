export class Repository {
    constructor(goal, criteriaArray = [], alternativeArray = []) {
        this.goal = goal;
        this.criteriaArray = criteriaArray;
        this.alternativeArray = alternativeArray;
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
    updateCriteria(criteria) {
        this.criteriaArray.map((crit) => {
            if (crit.name === criteria.name)
                return criteria;
        });
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

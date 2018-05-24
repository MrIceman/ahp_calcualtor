import {Repository} from "../../data/Repository";
import {Criteria} from "../../data/model/Criteria";
import {Alternative} from "../../data/model/Alternative";
import {Goal} from "../../data/model/Goal";

export class CreateValuesUseCaseImpl {

    constructor(private readonly repository: Repository) {
    }

    setGoal(goal: Goal) {
        this.repository.setGoal(goal);
    }

    insertCriteria(criteria: Criteria) {
        this.repository.insertCriteria(criteria);
    }

    insertAlternative(alternative: Alternative) {
        this.repository.insertAlternative(alternative);
    }
}
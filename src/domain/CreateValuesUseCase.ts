import {Goal} from "../data/model/Goal";
import {Criteria} from "../data/model/Criteria";
import {Alternative} from "../data/model/Alternative";

export interface CreateValuesUseCase {
    insertAlternative(alternatives: Alternative): void;

    insertCriteria(criteria: Criteria): void;

    setGoal(goal: Goal): void;
}
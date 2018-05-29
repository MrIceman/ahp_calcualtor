import {Criteria} from "../data/model/Criteria";
import {Alternative} from "../data/model/Alternative";

export interface RateResultsUseCase {
    getRatedCriteria(): Array<Criteria>;

    getRatedAlternatives(): Array<Alternative>;
}
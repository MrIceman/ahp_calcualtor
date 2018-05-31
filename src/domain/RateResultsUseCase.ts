import {Criteria} from "../data/model/Criteria";
import {Alternative} from "../data/model/Alternative";
import {NominatedValue} from "./impl/RateResultsUseCaseImpl";

export interface RateResultsUseCase {
    getRatedCriteria(): Array<Criteria>;
    getNormedValues(): Array<NominatedValue>;

    getRatedAlternatives(): Array<Alternative>;
}
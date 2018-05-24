import {ComparisionMatrix} from "./model/ComparisionMatrix";
import {Criteria} from "../data/model/Criteria";
import {Goal} from "../data/model/Goal";
import {Alternative} from "../data/model/Alternative";

export interface GetCompareMatrixUseCase {
    getCriteriaMatrix(): ComparisionMatrix<Criteria, Goal>;

    getAllAlternativeMatrix(): Array<ComparisionMatrix<Alternative, Criteria>>;
}
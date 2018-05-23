import {ComparisionMatrix} from "./model/ComparisionMatrix";
import {Criteria} from "../data/model/Criteria";
import {Goal} from "../data/model/Goal";

export interface GetCompareMatrixUseCase {
    getAllCriteriaMatrix(): Array<ComparisionMatrix<Criteria, Goal>>;
}
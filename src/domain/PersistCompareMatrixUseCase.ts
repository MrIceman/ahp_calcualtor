import {ComparisionMatrix} from "./model/ComparisionMatrix";
import {Goal} from "../data/model/Goal";
import {Criteria} from "../data/model/Criteria";
import {Alternative} from "../data/model/Alternative";

export interface PersistCompareMatrixUseCase {
    persistCriteriaMatrix(matrix: ComparisionMatrix<Criteria, Goal>): void;

    persistAlternativeMatrix(matrix: ComparisionMatrix<Alternative, Criteria>): void;
}
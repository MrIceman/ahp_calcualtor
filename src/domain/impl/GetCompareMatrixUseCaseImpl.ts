import {GetCompareMatrixUseCase} from "../GetCompareMatrixUseCase";
import {ComparisionMatrix} from "../model/ComparisionMatrix";
import {Alternative} from "../../data/model/Alternative";
import {Criteria} from "../../data/model/Criteria";
import {Goal} from "../../data/model/Goal";
import {Repository} from "../../data/Repository";
import {MatrixCalculator} from "../matrix/MatrixCalculator";

export class GetCompareMatrixUseCaseImpl implements GetCompareMatrixUseCase {

    constructor(private readonly repository: Repository, private readonly matrixCalculator: MatrixCalculator) {
    }

    getAllAlternativeMatrix(): Array<ComparisionMatrix<Alternative, Criteria>> {
        const matrices: Array<ComparisionMatrix<Alternative, Criteria>> = [];
        this.repository.getCriteria().forEach((criteria => {
            const matrix: ComparisionMatrix<Alternative, Criteria> = this.matrixCalculator.createComparisionMatrix(this.repository.getAlternatives(), criteria) as ComparisionMatrix<Alternative, Criteria>;
            matrices.push(matrix);
        }));
        return matrices;
    }

    getCriteriaMatrix(): ComparisionMatrix<Criteria, Goal> {
        return this.matrixCalculator.createComparisionMatrix(this.repository.getCriteria(), this.repository.goal) as ComparisionMatrix<Criteria, Goal>;
    }

}
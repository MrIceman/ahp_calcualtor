import {PersistCompareMatrixUseCase} from "../PersistCompareMatrixUseCase";
import {ComparisionMatrix} from "../model/ComparisionMatrix";
import {Alternative} from "../../data/model/Alternative";
import {Criteria} from "../../data/model/Criteria";
import {Goal} from "../../data/model/Goal";
import {Repository} from "../../data/Repository";

export class PersistCompareMatrixUseCaseImpl implements PersistCompareMatrixUseCase {

    constructor(public readonly repository: Repository) {
    }

    persistAlternativeMatrix(matrix: ComparisionMatrix<Alternative, Criteria>) {
        matrix.rows.forEach((item) => {
            const ratingValue = item.rating.score;

            const alternativeA = item.itemA;
            alternativeA.criteriaScore.set(item.target, ratingValue == 8 ? 1 : ratingValue < 8 ? 9 - ratingValue : (1 / (ratingValue - 7)));
            this.repository.updateAlternative(alternativeA);

            const alternativeB = item.itemB;
            alternativeB.criteriaScore.set(item.target, ratingValue == 8 ? 1 : ratingValue > 8 ? ratingValue - 7 : (1 / (9 - ratingValue)));
            this.repository.updateAlternative(alternativeB);

        })
    }

    persistCriteriaMatrix(matrix: ComparisionMatrix<Criteria, Goal>) {
    }
}
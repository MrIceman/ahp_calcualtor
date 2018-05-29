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
        // TODO falsche Implementierung. Es müssen die einzelnen Vergleichszwerte zwischen den Kriterien im Bezug aufs Ziel betrachtet werden
        matrix.rows.forEach((item) => {
            const ratingValue = item.rating.score;

            const alternativeA = item.itemA;
            const alternativeB = item.itemB;
            alternativeA.criteriaScore.set(item.target,
                new Map([[alternativeB, ratingValue == 8 ? 1 : ratingValue < 8 ? 9 - ratingValue : (1 / (ratingValue - 7))]]));
            this.repository.updateAlternative(alternativeA);

            alternativeB.criteriaScore.set(item.target,
                new Map([[alternativeA, ratingValue == 8 ? 1 : ratingValue > 8 ? ratingValue - 7 : (1 / (9 - ratingValue))]]));
            this.repository.updateAlternative(alternativeB);

        })
    }

    persistCriteriaMatrix(matrix: ComparisionMatrix<Criteria, Goal>) {
        matrix.rows.forEach((item) => {
            const ratingValue = item.rating.score;

            const criteriaA = item.itemA;
            this.repository.updateCriteria(criteriaA);

            const criteriaB = item.itemB;
            criteriaA.comparisionValues.set(criteriaB, ratingValue == 8 ? 1 : ratingValue < 8 ? 9 - ratingValue : (1 / (ratingValue - 7)));
            criteriaB.comparisionValues.set(criteriaA, ratingValue == 8 ? 1 : ratingValue > 8 ? ratingValue - 7 : (1 / (9 - ratingValue)));
            this.repository.updateCriteria(criteriaB);

        })
    }
}
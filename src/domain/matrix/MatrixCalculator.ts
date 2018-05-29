import {ComparisionMatrix} from "../model/ComparisionMatrix";
import {Criteria} from "../../data/model/Criteria";
import {Goal} from "../../data/model/Goal";
import {RatingItem} from "../../data/model/RatingItem";
import {ComparisionItem} from "../../data/model/ComparisionItem";
import {Score} from "../../data/model/Score";

export class MatrixCalculator {

    /**
     * Given Criterias: A, B, C, D
     *       Goal: Z
     *
     *      then the Returning Matrix should consist of following ComparisionItems

     *     (A, B) - SCORE
     *     (A, C) - SCORE
     *     (A, D) - SCORE
     *     (B, C) - SCORE
     *     (C, D) - SCORE
     *
     * @param {Array<Criteria>} values
     * @param {Goal} goal
     * @returns {ComparisionMatrix<Criteria, Goal>}
     */
    createComparisionMatrix(values: Array<RatingItem>, goal: RatingItem): ComparisionMatrix<RatingItem, RatingItem> {
        const items: Array<ComparisionItem<RatingItem, RatingItem>> = [];

        for (let i = 0; i < values.length; i++) {
            try {
                for (let j = i + 1; j < values.length; j++) {
                    items.push(new ComparisionItem<RatingItem, RatingItem>(values[i], values[j], goal, new Score(0)))
                }
            } catch (e) {
            }
        }

        return new ComparisionMatrix<RatingItem, RatingItem>(items);
    }

    calculateRatings(criteria: Array<Criteria>) {
        // Build a 2 dimensional Matrix for calculating in form of [i][i] where is the amount of key
        const calcMatrix: number[][] = new Array([criteria.length][criteria.length]);
        for (let i = 0; i < criteria.length; i++) {
            for (let j = 0; j < criteria.length; j++) {
                if (i == j)
                    calcMatrix[i][j] = 1;
                else
                    calcMatrix[i][j] = criteria[j].goalScore;
            }
        }
    }
}
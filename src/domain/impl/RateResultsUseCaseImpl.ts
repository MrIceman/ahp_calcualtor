import {RateResultsUseCase} from "../RateResultsUseCase";
import {Alternative} from "../../data/model/Alternative";
import {Repository} from "../../data/Repository";
import {Criteria} from "../../data/model/Criteria";

export interface NominatedValue {
    key: string;
    value: Number;
}

export class RateResultsUseCaseImpl implements RateResultsUseCase {

    constructor(private readonly repository: Repository) {
    }

    getRatedAlternatives(): Array<Alternative> {
        const alternatives = this.repository.getAlternatives();
        const criteria = this.repository.getCriteria();

        /*
            Alternative:
                Name
                CriteriaScore:
                    [{
                        Criteria: [{
                            Alternative: Score
                        }]
                    }]
         */

        for (const crit of criteria) {

            for (const alt of alternatives) {
                // calculate column sum
                let currentSum = 0;

                for (let nextAlt of alternatives) {
                    if (nextAlt === alt) {
                        currentSum += 1;
                        continue;
                    }

                    alt.criteriaScore.forEach((compareValues, crit_) => {
                        compareValues.forEach((score, alternativeCompared) => {
                            if (crit_ === crit.name && alternativeCompared === alt.name) {
                                currentSum += score;
                            }
                        });

                        compareValues.forEach((score, alternativeCompared) => {
                            // Normalizing Values
                            if (crit_ === crit.name && alternativeCompared === alt.name) {
                                const normalizedScore = score / currentSum;
                                compareValues.delete(alternativeCompared);
                                compareValues.set(alternativeCompared, normalizedScore);
                            }
                        });
                    });

                }


            }
        }


        return alternatives;
    }

    getRatedCriteria(): Array<Criteria> {
        const criteria = this.repository.getCriteria();
        // calculate column sum
        for (let crit of criteria) {
            let currentSum: number = 0;

            for (let next of criteria) {
                if (next === crit)
                    currentSum += 1;
                else
                    currentSum = currentSum + next.comparisionValues.get(crit.name);
            }
            // update own priority score

            for (const critToCalculate of criteria) {
                if (critToCalculate === crit) {
                    critToCalculate.comparisionValues.delete(crit.name);
                    critToCalculate.comparisionValues.set(crit.name, 1 / currentSum);
                }
                else {
                    let newComparisionValue = critToCalculate.comparisionValues.get(crit.name) / currentSum;
                    critToCalculate.comparisionValues.delete(crit.name);
                    critToCalculate.comparisionValues.set(crit.name, newComparisionValue);
                }
            }

        }
        return criteria;
    }

    getNormedValues(): Array<NominatedValue> {
        const values: Array<NominatedValue> = [];
        const alternatives = this.repository.getAlternatives();
        const criteria = this.repository.getCriteria();

        /*
            Alternative:
                Name
                CriteriaScore:
                    [{
                        Criteria: [{
                            Alternative: Score
                        }]
                    }]
         */

        for (const crit of criteria) {

            for (const alt of alternatives) {
                // calculate column sum
                let currentSum = 0;

                for (let nextAlt of alternatives) {
                    if (nextAlt === alt) {
                        currentSum += 1;
                        continue;
                    }

                    alt.criteriaScore.forEach((compareValues, crit_) => {
                        compareValues.forEach((score, alternativeCompared) => {
                            if (crit_ === crit.name && alternativeCompared === alt.name) {
                                currentSum += score;
                            }
                        });

                        compareValues.forEach((score, alternativeCompared) => {
                            // Normalizing Values
                            if (crit_ === crit.name && alternativeCompared === alt.name) {
                                const normalizedScore = score / currentSum;
                                compareValues.delete(alternativeCompared);
                                compareValues.set(alternativeCompared, normalizedScore);
                            }
                        });
                    });
                    values.push({key: `${crit} / ${alt}`, value: currentSum});
                }


            }
        }


        return values;
    }

    getCriteriaPriority(normedCriteria: Array<Criteria>): Array<NominatedValue> {
        let normedValues: Array<NominatedValue> = [];
        for (const crit of normedCriteria) {
            let critPriority = 0;
            crit.comparisionValues.forEach((score, crit) => {
                critPriority += score;
            });
            critPriority /= normedCriteria.length;
            normedValues.push({key: crit.name, value: critPriority});
        }
        return normedValues;
    }
}
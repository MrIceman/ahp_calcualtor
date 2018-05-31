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
        return undefined;
    }

    getRatedCriteria(): Array<Criteria> {
        const criteria = this.repository.getCriteria();
        const values: Array<NominatedValue> = [];
        // calculate column sum
        for (let crit of criteria) {
            let currentSum: number = 0;

            for (let next of criteria) {
                if (next === crit)
                    currentSum += 1;
                else
                    currentSum = currentSum + next.comparisionValues.get(crit.name);
            }
            values.push({key: crit.name, value: currentSum});

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
        const criteria = this.repository.getCriteria();
        const values: Array<NominatedValue> = [];
        // calculate column sum
        for (let crit of criteria) {
            let currentSum: number = 0;

            for (let next of criteria) {
                if (next === crit)
                    currentSum += 1;
                else
                    currentSum = currentSum + next.comparisionValues.get(crit.name);
            }
            values.push({key: crit.name, value: currentSum});

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
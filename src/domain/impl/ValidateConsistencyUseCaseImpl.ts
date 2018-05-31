import {ValidateConsistencyUseCase} from "../ValidateConsistencyUseCase";
import {Repository} from "../../data/Repository";
import {Criteria} from "../../data/model/Criteria";
import {Alternative} from "../../data/model/Alternative";


interface comparable {
    value: { key: string, lower: Array<string>, higher: Array<string>, even: Array<string> }
}

export class ValidateConsistencyUseCaseImpl implements ValidateConsistencyUseCase {
    constructor(public readonly repository: Repository) {
    }

    validateAlternatives(): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            const alternatives = await this.repository.getAlternatives();
            let error = false;
            let counter = alternatives.length;

            for (const alt of alternatives) {
                const comparables: Array<comparable> = [];
                // we are going to validate for every single criteria whether the alternatives are consistent or not
                await alt.criteriaScore.forEach(async (value) => {
                    const comparable = await this.makeComparableAlternative(alt, value);
                    comparables.push(comparable);
                    if (!await this.validateCompareItems(comparables)) {
                        return false;
                    }
                });
                counter--;

            }

            while (counter != 0) {

            }
            resolve(true);

        });

    }

    validateCriteria(): boolean {
        /**
         * Let's create a dictionary
         * every Key is Criteria and it has following children: higher and lower
         *
         * Assumption :
         *
         * A > B, A > C, A < D
         * B > C, B < D,
         * C > D
         *
         *  A : {
         *      lower: B, C
         *      higher: D
         *  }
         *
         *  B : {
         *      higher: A, D,
         *      lower: C
         *  }
         *
         *  C: {
         *      higher: A, B
         *      lower : D
         *  }
         *
         *  How do we check for Consistency now? We go to A - lower and check if B is lower than A. Then w e go to B
         *  and check if all lower items are in A.
         *  Then we go to C and check if all lower items in C are lower than A. We also check that none items in higher of B are in the lower of A
         *
         *  Then we go to B and repeat
         *
         * @type {Array<Criteria>}
         */

        const criteria = this.repository.getCriteria();
        const comparables: Array<comparable> = criteria.map((value) => {
            return this.makeComparableCriteria(value)
        });

        return this.validateCompareItems(comparables);
    }

    public makeComparableCriteria(criteria: Criteria): comparable {
        const lower: Array<string> = [];
        const higher: Array<string> = [];
        const even: Array<string> = [];

        criteria.comparisionValues.forEach((value, comparedCriteria) => {
            if (value < 1) {
                higher.push(comparedCriteria);
            } else if (value > 1) {
                lower.push(comparedCriteria);
            } else
                even.push(comparedCriteria);
        });
        return {
            value: {
                key: criteria.name,
                lower: lower,
                higher: higher,
                even: even
            }
        };
    }

    public makeComparableAlternative(alternative: Alternative, comparedTo: Map<Alternative, number>): comparable {

        const lower: Array<string> = [];
        const higher: Array<string> = [];
        const even: Array<string> = [];

        // prepare data structure
        comparedTo.forEach((value, comparedAlternative) => {
            if (value < 1) {
                higher.push(comparedAlternative.name);
            } else if (value > 1) {
                lower.push(comparedAlternative.name);
            } else
                even.push(comparedAlternative.name);
        });

        return {
            value: {
                key: alternative.name,
                lower: lower,
                higher: higher,
                even: even
            }
        };

    }

    private validateCompareItems(comparables: Array<comparable>): boolean {
        //Iterate through comparables
        for (const comparable of comparables) {
            // get all lower comparables
            for (const lower of comparable.value.lower) {
                // get the lowerCmp of the lower value
                for (const cmp of comparables) {
                    if (cmp.value.key === lower) {
                        const lowerCmp = cmp;
                        for (const lowerHigher of lowerCmp.value.lower) {
                            // check if the lower values lowerCmp are in the higher values of
                            // comparable
                            if (comparable.value.higher.some((sourceHigher) => sourceHigher === lowerHigher)
                                ||
                                comparable.value.even.some((sourceHigher) => sourceHigher === lowerHigher)
                            ) {
                                return false;
                            } else
                                continue;
                        }
                    }
                }

            }
        }

        return true;
    }
}
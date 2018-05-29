import {ValidateConsistencyUseCase} from "../ValidateConsistencyUseCase";
import {Repository} from "../../data/Repository";
import {Criteria} from "../../data/model/Criteria";
import {anyNumber} from "ts-mockito";
import {Alternative} from "../../data/model/Alternative";


interface comparable {
    value: { key: string, lower: Array<string>, higher: Array<string>, even: Array<string> }
}

export class ValidateConsistencyUseCaseImpl implements ValidateConsistencyUseCase {
    constructor(public readonly repository: Repository) {
    }

    validateAlternatives(): boolean {
        const alternatives = this.repository.getAlternatives();

        return false;
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

        //Iterate through comparables
        for (const comparable of comparables) {
            // get all lower comparables
            for (const lower of comparable.value.lower) {
                // get the lowerCmp of the lower value
                const lowerCmp = comparables.find((cmp) => cmp.value.key === lower);
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
        return true;
    }

    public makeComparableCriteria(criteria: Criteria): comparable {
        const lower: Array<string> = [];
        const higher: Array<string> = [];
        const even: Array<string> = [];

        criteria.comparisionValues.forEach((value, comparedCriteria) => {
            if (value < 1) {
                higher.push(comparedCriteria.name);
            } else if (value > 1) {
                lower.push(comparedCriteria.name);
            } else
                even.push(comparedCriteria.name);
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

    public makeComparableAlternatives(alternatives: Array<Alternative>): comparable {
        const lower: Array<string> = [];
        const higher: Array<string> = [];
        const even: Array<string> = [];
        const key: Array<string> = [];

        // prepare data structure
        alternatives.forEach((alternative) => {
            const name = alternative.name;
            let criteria = '';
            let score = 0;

            alternative.criteriaScore
        });

        return {
            value: {
                key: '',
                lower: lower,
                higher: higher,
                even: even
            }
        };
    }
}
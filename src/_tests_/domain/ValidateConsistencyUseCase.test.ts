import {ValidateConsistencyUseCaseImpl} from "../../domain/impl/ValidateConsistencyUseCaseImpl";
import {Repository} from "../../data/Repository";
import {Goal} from "../../data/model/Goal";
import {Criteria} from "../../data/model/Criteria";
import {Alternative} from "../../data/model/Alternative";

const repository = new Repository(new Goal(''), [], []);
const subject = new ValidateConsistencyUseCaseImpl(repository);
const criteriaTime = new Criteria('time');
const criteriaLove = new Criteria('love');
const criteriaMoney = new Criteria('money');
const criteriaHappiness = new Criteria('happiness');
criteriaTime.comparisionValues.set(criteriaLove, 4);
criteriaTime.comparisionValues.set(criteriaHappiness, 9);
criteriaTime.comparisionValues.set(criteriaMoney, 1 / 6);

criteriaLove.comparisionValues.set(criteriaMoney, 2);
criteriaLove.comparisionValues.set(criteriaHappiness, 1);
criteriaLove.comparisionValues.set(criteriaTime, 1 / 4);

criteriaHappiness.comparisionValues.set(criteriaMoney, 3);
criteriaHappiness.comparisionValues.set(criteriaTime, 1 / 9);
criteriaHappiness.comparisionValues.set(criteriaLove, 1);

criteriaMoney.comparisionValues.set(criteriaTime, 6);
criteriaMoney.comparisionValues.set(criteriaHappiness, 1 / 3);
criteriaMoney.comparisionValues.set(criteriaLove, 1 / 2);


repository.insertCriteria(criteriaTime);
repository.insertCriteria(criteriaLove);
repository.insertCriteria(criteriaMoney);
repository.insertCriteria(criteriaHappiness);

it('makes correct comparable map', () => {

    const criterias = repository.getCriteria();
    const result = criterias.map((value) => subject.makeComparableCriteria(value));

    expect(result).toEqual([
        {
            value: {
                key: "time",
                lower: ["love", "happiness"],
                higher: ["money"],
                even: []
            }
        },
        {
            value: {
                key: "love",
                lower: ["money"],
                higher: ["time"],
                even: ["happiness"]
            }
        },
        {
            value: {
                key: "money",
                lower: ["time"],
                higher: ["happiness", "love"],
                even: []
            }
        },
        {
            value: {
                key: "happiness",
                lower: ["money"],
                higher: ["time"],
                even: ["love"]
            }
        }
    ]);
});

it('returns false because key map is inconsistent', () => {
    const result = subject.validateCriteria();
    expect(result).toEqual(false);
});

it('returns true because key map is consistent', () => {
    repository.clearCriteria();
    repository.clearAlternatives();

    /*
        time > happiness > love >  money
     */

    criteriaTime.comparisionValues.set(criteriaLove, 5);
    criteriaTime.comparisionValues.set(criteriaHappiness, 5);
    criteriaTime.comparisionValues.set(criteriaMoney, 5);

    criteriaLove.comparisionValues.set(criteriaMoney, 4);
    criteriaLove.comparisionValues.set(criteriaHappiness, 1 / 4);
    criteriaLove.comparisionValues.set(criteriaTime, 1 / 5);

    criteriaHappiness.comparisionValues.set(criteriaMoney, 3);
    criteriaHappiness.comparisionValues.set(criteriaTime, 1 / 5);
    criteriaHappiness.comparisionValues.set(criteriaLove, 4);

    criteriaMoney.comparisionValues.set(criteriaTime, 1 / 5);
    criteriaMoney.comparisionValues.set(criteriaHappiness, 1 / 3);
    criteriaMoney.comparisionValues.set(criteriaLove, 1 / 4);


    repository.insertCriteria(criteriaTime);
    repository.insertCriteria(criteriaLove);
    repository.insertCriteria(criteriaMoney);
    repository.insertCriteria(criteriaHappiness);

    const result = subject.validateCriteria();

    expect(result).toEqual(true);
});

it('another positive check for inconsistency key', () => {
    const cA = new Criteria('A');
    const cB = new Criteria('B');
    const cC = new Criteria('C');
    cA.comparisionValues.set(cB, 3);
    cA.comparisionValues.set(cC, 2);
    cB.comparisionValues.set(cA, 1 / 3);
    cB.comparisionValues.set(cC, 4);
    cC.comparisionValues.set(cA, 1 / 3);
    cC.comparisionValues.set(cB, 1 / 4);
    // A > B, A > C, B > C

    repository.clearCriteria();
    repository.insertCriteria(cA);
    repository.insertCriteria(cB);
    repository.insertCriteria(cC);

    const result = subject.validateCriteria();
    expect(result).toEqual(true);
});

it('consistency check with evens', () => {
    const cA = new Criteria('A');
    const cB = new Criteria('B');
    const cC = new Criteria('C');
    cA.comparisionValues.set(cB, 1);
    cA.comparisionValues.set(cC, 3);

    cB.comparisionValues.set(cA, 1);
    cB.comparisionValues.set(cC, 1 / 4);

    cC.comparisionValues.set(cA, 1 / 3);
    cC.comparisionValues.set(cB, 4);
    // A = B, A > C, B < C

    repository.clearCriteria();
    repository.insertCriteria(cA);
    repository.insertCriteria(cB);
    repository.insertCriteria(cC);

    const result = subject.validateCriteria();
    expect(result).toEqual(false);
});

it('tests make comparable alternativesd array', async () => {
    const criteriaWealth = new Criteria('Wealth');
    const alternativeA = new Alternative('alternative A');
    const alternativeB = new Alternative('alternative B');
    const alternativeC = new Alternative('alternative C');

    alternativeA.criteriaScore.set(criteriaWealth, new Map([[alternativeB, 9], [alternativeC, 1 / 4]]));

    alternativeB.criteriaScore.set(criteriaWealth, new Map([[alternativeA, 1 / 9], [alternativeC, 6]]));

    alternativeC.criteriaScore.set(criteriaWealth, new Map([[alternativeB, 1 / 6], [alternativeA, 4]]));

    repository.clearAlternatives();
    repository.clearCriteria();
    repository.insertCriteria(criteriaWealth);
    repository.insertAlternative(alternativeA);
    repository.insertAlternative(alternativeB);
    repository.insertAlternative(alternativeC);

    await alternativeA.criteriaScore.forEach((value) => {
        const result = subject.makeComparableAlternative(alternativeA, value);
        expect(result).toEqual({
            value: {
                even: [],
                higher: [alternativeC.name],
                lower: [alternativeB.name],
                key: alternativeA.name
            }
        });
    });

    await alternativeB.criteriaScore.forEach((value) => {
        const result = subject.makeComparableAlternative(alternativeB, value);
        expect(result).toEqual({
            value: {
                even: [],
                higher: [alternativeA.name],
                lower: [alternativeC.name],
                key: alternativeB.name
            }
        });
    });

    await alternativeC.criteriaScore.forEach((value) => {
        const result = subject.makeComparableAlternative(alternativeC, value);
        expect(result).toEqual({
            value: {
                even: [],
                higher: [alternativeB.name],
                lower: [alternativeA.name],
                key: alternativeC.name
            }
        });
    });
});

it('checks alternatives for positive consistency', async () => {
    const criteriaWealth = new Criteria('Wealth');
    const alternativeA = new Alternative('alternative A');
    const alternativeB = new Alternative('alternative B');
    alternativeA.criteriaScore.set(criteriaWealth, new Map([[alternativeB, 1 / 9]]));
    alternativeB.criteriaScore.set(criteriaWealth, new Map([[alternativeA, 9]]));
    repository.insertCriteria(criteriaWealth);
    repository.insertAlternative(alternativeA);
    repository.insertAlternative(alternativeB);

    const result = await subject.validateAlternatives().catch(() => fail());
    expect(result).toEqual(true);
});


it('checks alternatives for negative conssitency', async () => {
    /*
      A > B , A < C
      B < A, B > C

     */
    const criteriaWealth = new Criteria('Wealth');
    const alternativeA = new Alternative('alternative A');
    const alternativeB = new Alternative('alternative B');
    const alternativeC = new Alternative('alternative C');

    alternativeA.criteriaScore.set(criteriaWealth, new Map([[alternativeB, 9], [alternativeC, 1 / 4]]));

    alternativeB.criteriaScore.set(criteriaWealth, new Map([[alternativeA, 1 / 9], [alternativeC, 6]]));

    alternativeC.criteriaScore.set(criteriaWealth, new Map([[alternativeB, 1 / 6], [alternativeA, 4]]));

    repository.clearAlternatives();
    repository.clearCriteria();
    repository.insertCriteria(criteriaWealth);
    repository.insertAlternative(alternativeA);
    repository.insertAlternative(alternativeB);
    repository.insertAlternative(alternativeC);

    const result = await subject.validateAlternatives().catch(() => fail());

    expect(result).toEqual(false);
});


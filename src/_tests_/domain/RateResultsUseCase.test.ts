import {NominatedValue, RateResultsUseCaseImpl} from "../../domain/impl/RateResultsUseCaseImpl";
import {Repository} from "../../data/Repository";
import {Criteria} from "../../data/model/Criteria";
import {Goal} from "../../data/model/Goal";
import {ComparisionItem} from "../../data/model/ComparisionItem";
import {Score} from "../../data/model/Score";
import {ComparisionMatrix} from "../../domain/model/ComparisionMatrix";
import {Alternative} from "../../data/model/Alternative";

const repository = new Repository(new Goal(''), [], []);
const visiblity = new Criteria('visiblity');
const competition = new Criteria('competition');
const custFreq = new Criteria('cust freq');
const rent = new Criteria('rent');
visiblity.comparisionValues.set(competition.name, 5);
visiblity.comparisionValues.set(rent.name, 1 / 3);
visiblity.comparisionValues.set(custFreq.name, 1);

competition.comparisionValues.set(custFreq.name, 1);
competition.comparisionValues.set(rent.name, 1 / 5);
competition.comparisionValues.set(visiblity.name, 1 / 5);

rent.comparisionValues.set(custFreq.name, 3);
rent.comparisionValues.set(visiblity.name, 3);
rent.comparisionValues.set(competition.name, 5);

custFreq.comparisionValues.set(visiblity.name, 1);
custFreq.comparisionValues.set(rent.name, 1 / 3);
custFreq.comparisionValues.set(competition.name, 1);


repository.insertCriteria(visiblity);
repository.insertCriteria(competition);
repository.insertCriteria(custFreq);
repository.insertCriteria(rent);

const subject = new RateResultsUseCaseImpl(repository);

it('calculates correct global normed values', () => {
    const expectedResult: Array<NominatedValue> = [
        {
            "key": 'visiblity', "value": 0.23855311355311354
        },
        {
            "key": "competition", "value": 0.0989010989010989
        },
        {
            "key": "cust freq", "value": 0.15521978021978022
        },
        {
            "key": "rent", "value": 0.5073260073260073
        }
    ];
    const result = subject.getCriteriaPriority(subject.getRatedCriteria());
    expect(result).toEqual(expectedResult);
});

it('calculates global priorities for alternatives', async () => {
    const criteriaWealth = new Criteria('Wealth');
    const criteriaHappiness = new Criteria('Happiness');
    const alternativeA = new Alternative('alternative A');
    const alternativeB = new Alternative('alternative B');
    alternativeA.criteriaScore.set(criteriaWealth.name, new Map([[alternativeB.name, 5]]));
    alternativeA.criteriaScore.set(criteriaHappiness.name, new Map([[alternativeB.name, 9]]));
    alternativeB.criteriaScore.set(criteriaWealth.name, new Map([[alternativeA.name, 1 / 5]]));
    alternativeB.criteriaScore.set(criteriaHappiness.name, new Map([[alternativeA.name, 1 / 9]]));

    repository.clearAlternatives();
    repository.clearCriteria();
    repository.insertCriteria(criteriaWealth);
    repository.insertCriteria(criteriaHappiness);
    repository.insertAlternative(alternativeA);
    repository.insertAlternative(alternativeB);

    const result = await subject.getNormedValues();
    expect(result).toEqual(undefined);
});
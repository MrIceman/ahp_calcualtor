import {RateResultsUseCaseImpl} from "../../domain/impl/RateResultsUseCaseImpl";
import {Repository} from "../../data/Repository";
import {Criteria} from "../../data/model/Criteria";
import {Goal} from "../../data/model/Goal";

const repository = new Repository(new Goal(''), [], []);
const visiblity = new Criteria('visiblity');
const competition = new Criteria('competition');
const custFreq = new Criteria('cust freq');
const rent = new Criteria('rent');
visiblity.comparisionValues.set(competition.name, 5);
visiblity.comparisionValues.set(rent.name, 1/3);
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
    const result = subject.getCriteriaPriority(subject.getRatedCriteria());
    expect(result).toEqual(undefined);
});
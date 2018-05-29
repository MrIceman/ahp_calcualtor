import {Repository} from "../../data/Repository";
import {PersistCompareMatrixUseCaseImpl} from "../../domain/impl/PersistCompareMatrixUseCaseImpl";
import {ComparisionMatrix} from "../../domain/model/ComparisionMatrix";
import {Alternative} from "../../data/model/Alternative";
import {Criteria} from "../../data/model/Criteria";
import {ComparisionItem} from "../../data/model/ComparisionItem";
import {Score} from "../../data/model/Score";
import {Goal} from "../../data/model/Goal";

const alternativeA = new Alternative('alternative A');
const alternativeB = new Alternative('alternative B');
const crit = new Criteria('success');
const repository = new Repository(new Goal('money'), [crit], [alternativeA, alternativeB]);
const subject = new PersistCompareMatrixUseCaseImpl(repository);

it('persists all alternatives with scores in favor of alternative B', () => {
    const row = new ComparisionItem<Alternative, Criteria>(alternativeA, alternativeB, crit, new Score(16));
    const matrix = new ComparisionMatrix<Alternative, Criteria>([row]);

    subject.persistAlternativeMatrix(matrix);

    const newAlternativeA = new Alternative('alternative A', new Map([[crit, new Map([[alternativeB, 1 / 9]])]]));
    const newAlternativeB = new Alternative('alternative B', new Map([[crit, new Map([[alternativeA, 9]])]]));

    const result = repository.getAlternatives();
    expect(result).toEqual([newAlternativeA, newAlternativeB]);
});

it('persists all alternatives with scores in favor of alternative A', () => {
    const row = new ComparisionItem<Alternative, Criteria>(alternativeA, alternativeB, crit, new Score(0));
    const matrix = new ComparisionMatrix<Alternative, Criteria>([row]);

    subject.persistAlternativeMatrix(matrix);

    const newAlternativeA = new Alternative('alternative A', new Map([[crit, new Map([[alternativeB, 9]])]]));
    const newAlternativeB = new Alternative('alternative B', new Map([[crit, new Map([[alternativeA, 1 / 9]])]]));

    const result = repository.getAlternatives();
    expect(result).toEqual([newAlternativeA, newAlternativeB]);
});

it('persists all alternatives with equal scores', () => {
    const row = new ComparisionItem<Alternative, Criteria>(alternativeA, alternativeB, crit, new Score(8));
    const matrix = new ComparisionMatrix<Alternative, Criteria>([row]);

    subject.persistAlternativeMatrix(matrix);

    const newAlternativeA = new Alternative('alternative A', new Map([[crit, new Map([[alternativeB, 1]])]]));
    const newAlternativeB = new Alternative('alternative B', new Map([[crit, new Map([[alternativeA, 1]])]]));

    const result = repository.getAlternatives();
    expect(result).toEqual([newAlternativeA, newAlternativeB]);
});

it('persists multiple rows with scores in favor of alternative B', () => {
    const criteriaWealth = new Criteria('Wealth');
    const criteriaHappiness = new Criteria('Happiness');
    const alternativeA = new Alternative('alternative A');
    const alternativeB = new Alternative('alternative B');
    const rowA = new ComparisionItem<Alternative, Criteria>(alternativeA, alternativeB, criteriaWealth, new Score(16));
    const rowB = new ComparisionItem<Alternative, Criteria>(alternativeA, alternativeB, criteriaHappiness, new Score(4));
    const matrix = new ComparisionMatrix<Alternative, Criteria>([rowA, rowB]);
    repository.clearAlternatives();
    repository.clearCriteria();
    repository.insertCriteria(criteriaWealth);
    repository.insertCriteria(criteriaHappiness);
    repository.insertAlternative(alternativeA);
    repository.insertAlternative(alternativeB);
    subject.persistAlternativeMatrix(matrix);
    const newAlternativeA = new Alternative('alternative A', new Map([[criteriaWealth, new Map([[alternativeB, 1/9]])],
        [criteriaHappiness, new Map([[alternativeB, 5]])]]));
    const newAlternativeB = new Alternative('alternative B', new Map([[criteriaWealth, new Map([[alternativeA, 9]])],
        [criteriaHappiness, new Map([[alternativeA, 1 / 5]])]]));

    const result = repository.getAlternatives();
    expect(result).toEqual([newAlternativeA, newAlternativeB]);
});

// Testing persisting of key values

it('persists all key with scores in favor of alternative B', () => {
    const criteriaTime = new Criteria('time');
    const criteriaLove = new Criteria('love');
    repository.clearCriteria();
    repository.insertCriteria(criteriaTime);
    repository.insertCriteria(criteriaLove);

    const row = new ComparisionItem<Criteria, Goal>(criteriaTime, criteriaLove, new Goal('business'), new Score(16));
    const matrix = new ComparisionMatrix<Criteria, Goal>([row]);

    subject.persistCriteriaMatrix(matrix);

    const newCriteriaTime = new Criteria('time', new Map([[criteriaLove, 1 / 9]]));
    const newCriteriaLove = new Criteria('love', new Map([[criteriaTime, 9]]));

    const result = repository.getCriteria();
    expect(result).toEqual([newCriteriaTime, newCriteriaLove]);
});

it('persists all alternatives with scores in favor of alternative A', () => {
    const criteriaTime = new Criteria('time');
    const criteriaLove = new Criteria('love');
    repository.clearCriteria();
    repository.insertCriteria(criteriaTime);
    repository.insertCriteria(criteriaLove);

    const row = new ComparisionItem<Criteria, Goal>(criteriaTime, criteriaLove, new Goal('business'), new Score(0));
    const matrix = new ComparisionMatrix<Criteria, Goal>([row]);

    subject.persistCriteriaMatrix(matrix);

    const newCriteriaTime = new Criteria('time', new Map([[criteriaLove, 9]]));
    const newCriteriaLove = new Criteria('love', new Map([[criteriaTime, 1 / 9]]));

    const result = repository.getCriteria();
    expect(result).toEqual([newCriteriaTime, newCriteriaLove]);
});

it('persists all alternatives with equal scores', () => {
    const criteriaTime = new Criteria('time');
    const criteriaLove = new Criteria('love');
    repository.clearCriteria();
    repository.insertCriteria(criteriaTime);
    repository.insertCriteria(criteriaLove);

    const row = new ComparisionItem<Criteria, Goal>(criteriaTime, criteriaLove, new Goal('business'), new Score(8));
    const matrix = new ComparisionMatrix<Criteria, Goal>([row]);

    subject.persistCriteriaMatrix(matrix);

    const newCriteriaTime = new Criteria('time', new Map([[criteriaLove, 1]]));
    const newCriteriaLove = new Criteria('love', new Map([[criteriaTime, 1]]));

    const result = repository.getCriteria();
    expect(result).toEqual([newCriteriaTime, newCriteriaLove]);
});


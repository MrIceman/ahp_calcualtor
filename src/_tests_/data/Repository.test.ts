import {Repository} from "../../data/Repository";
import {deepEqual, instance, mock} from "ts-mockito";
import {Goal} from "../../data/model/Goal";
import {Criteria} from "../../data/model/Criteria";
import {Alternative} from "../../data/model/Alternative";

const goalMock = mock(Goal);
const criteria = new Criteria('love');
const criteriaB = new Criteria('money');
const alternative = new Alternative('hustle');
const alternativeB = new Alternative('code');
const subject = new Repository(instance(goalMock), [criteria, criteriaB], [alternative, alternativeB]);

it('updates key correctly', () => {

    const newCriteria = new Criteria('love', 4, -1);

    subject.updateCriteria(newCriteria);

    const result = subject.getCriteria();

    expect(result).toEqual([newCriteria, criteriaB]);
});

it('updates alternative correctly', () => {

    const newAlternative = new Alternative('hustle', new Map([[criteria, 20], [criteriaB, 0]]), 20);

    subject.updateAlternative(newAlternative);

    const result = subject.getAlternatives();

    expect(result).not.toEqual(deepEqual([newAlternative]));
});
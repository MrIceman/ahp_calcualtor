import {CreateValuesUseCaseImpl} from "../../domain/impl/CreateValuesUseCaseImpl";
import {Repository} from "../../data/Repository";
import {instance, mock, verify} from "ts-mockito";
import {Goal} from "../../data/model/Goal";
import {Criteria} from "../../data/model/Criteria";
import {Alternative} from "../../data/model/Alternative";


const repositoryMock = mock(Repository);
const repository = instance(repositoryMock);
const subject = new CreateValuesUseCaseImpl(repository);

it('inserts data correctly', () => {
    const goal = instance(mock(Goal));
    const criteria = instance(mock(Criteria));
    const alternative = instance(mock(Alternative));
    subject.setGoal(goal);
    subject.insertAlternative(alternative);
    subject.insertCriteria(criteria);
    verify(repositoryMock.setGoal(goal)).once();
    verify(repositoryMock.insertAlternative(alternative)).once();
    verify(repositoryMock.insertCriteria(criteria)).once();
});
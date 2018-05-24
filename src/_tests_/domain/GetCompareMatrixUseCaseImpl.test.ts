import {instance, mock, when} from "ts-mockito";
import {Repository} from "../../data/Repository";
import {GetCompareMatrixUseCaseImpl} from "../../domain/impl/GetCompareMatrixUseCaseImpl";
import {Criteria} from "../../data/model/Criteria";
import {Goal} from "../../data/model/Goal";
import {ComparisionMatrix} from "../../domain/model/ComparisionMatrix";
import {ComparisionItem} from "../../data/model/ComparisionItem";
import {Score} from "../../data/model/Score";
import {MatrixCalculator} from "../../domain/matrix/MatrixCalculator";

const repositoryMock = mock(Repository);
const repository = instance(repositoryMock);
const subject = new GetCompareMatrixUseCaseImpl(repository, new MatrixCalculator());

it('gets compare matrix for all criterias regarding the goal', () => {
    const goal = new Goal('Success');
    const criteriaA = new Criteria('A');
    const criteriaB = new Criteria('B');
    const criteriaC = new Criteria('C');
    const criteriaD = new Criteria('D');
    const criteriaE = new Criteria('E');
    const criterias: Array<Criteria> = [criteriaA, criteriaB, criteriaC, criteriaD, criteriaE];
    when(repositoryMock.getCriteria()).thenReturn(criterias);
    when(repositoryMock.goal).thenReturn(goal);

    const result = subject.getCriteriaMatrix();
    const expectedRows = [
        new ComparisionItem(criteriaA, criteriaB, goal, new Score(0)),
        new ComparisionItem(criteriaA, criteriaC, goal, new Score(0)),
        new ComparisionItem(criteriaA, criteriaD, goal, new Score(0)),
        new ComparisionItem(criteriaA, criteriaE, goal, new Score(0)),
        new ComparisionItem(criteriaB, criteriaC, goal, new Score(0)),
        new ComparisionItem(criteriaB, criteriaD, goal, new Score(0)),
        new ComparisionItem(criteriaB, criteriaE, goal, new Score(0)),
        new ComparisionItem(criteriaC, criteriaD, goal, new Score(0)),
        new ComparisionItem(criteriaC, criteriaE, goal, new Score(0)),
        new ComparisionItem(criteriaD, criteriaE, goal, new Score(0)),
    ];
    const expectedMatrix = new ComparisionMatrix(expectedRows);
    expect(result).toEqual(expectedMatrix);
});
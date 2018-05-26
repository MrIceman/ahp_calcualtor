import {instance, mock} from "ts-mockito";
import {Repository} from "../../data/Repository";
import {PersistCompareMatrixUseCaseImpl} from "../../domain/impl/PersistCompareMatrixUseCaseImpl";
import {ComparisionMatrix} from "../../domain/model/ComparisionMatrix";
import {Alternative} from "../../data/model/Alternative";
import {Criteria} from "../../data/model/Criteria";
import {ComparisionItem} from "../../data/model/ComparisionItem";
import {Score} from "../../data/model/Score";

const repositoryMock = mock(Repository);
const subject = new PersistCompareMatrixUseCaseImpl(instance(repositoryMock));
const alternativeA = new Alternative('alternative A');
const alternativeB = new Alternative('alternative B');
const crit = new Criteria('suc');

it('persists all criterias with scores', () => {
    const row = new ComparisionItem<Alternative, Criteria>(alternativeA, alternativeB, crit, new Score(17));
    const matrix = new ComparisionMatrix<Alternative, Criteria>([row]);
    subject.persistAlternativeMatrix(matrix)
});
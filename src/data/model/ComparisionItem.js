export class ComparisionItem {
    /**
     * A Score goes from 0 to 18
     * where a ranking between 0 and 8 is in favor of itemA (ascending) and 10 to 18 for itemB.
     * a 9 means equal priority.
     *
     * @param {item} itemA
     * @param {item} itemB
     * @param {goal} target
     * @param {number} rating
     */
    constructor(itemA, itemB, target, rating) {
        this.itemA = itemA;
        this.itemB = itemB;
        this.target = target;
        this.rating = rating;
    }
    ;
}

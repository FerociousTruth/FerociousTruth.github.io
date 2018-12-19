function predictSequenceByInduction(values: ReadonlyArray<number>): number
{
    return predictSequence(values, s => s.cost());
}

function predictSequence(values: ReadonlyArray<number>, priority: (s: Sequence) => number): number
{
    var sequences = sequencesStarting(values, priority);
    var predictedSequence = sequences[Symbol.iterator]().next().value;
    return predictedSequence.value(values.length + 1);
}

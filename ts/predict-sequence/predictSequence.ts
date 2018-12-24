/// <reference path="sequence.ts" />
/// <reference path="sequencesStarting.ts" />

function predictSequenceByInduction(values: ReadonlyArray<number>): [Sequence, number]
{
    return predictSequence(values, s => s.cost());
}

function predictSequence(values: ReadonlyArray<number>, priority: (s: Sequence) => number): [Sequence, number]
{
    var sequences = sequencesStarting(values, priority);
    var predictedSequence = sequences[Symbol.iterator]().next().value;
    return [predictedSequence, predictedSequence.value(values.length + 1)];
}

// predictSequenceByInduction([1]);

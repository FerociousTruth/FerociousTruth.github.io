import PriorityQueue  from 'ts-priority-queue'

export function *sequencesStarting(prefix: ReadonlyArray<number>, priority: (s: Sequence) => number): Iterable<Sequence>
{
    var comparator = function(a: Sequence, b: Sequence) { return priority(b)- priority(a); };
    var prioritized_sequences = new PriorityQueue({comparator: comparator});
    prioritized_sequences.queue(new Sequence(prefix, hole));

    for(;;)
    {
        var sequence = prioritized_sequences.dequeue();
        if(sequence.isPattern)
        {
            // TODO check if it possible the pattern could evaluate to the correct
            // value. For example, x_n={42,…} could never match x_1=3. If not,
            // discard it.

            // TODO avoid putting the same expression back into the queue

            // expand and keep going
            for(var s of sequence.expand())
                prioritized_sequences.queue(s);

        }
        else if(sequence.matches(prefix))
        {
            yield sequence;
        }
    }
}

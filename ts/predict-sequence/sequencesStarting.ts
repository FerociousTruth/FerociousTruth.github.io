/// <reference path="sequence.ts" />
/// <reference path="js-priority-queue.ts" />

function *sequencesStarting(prefix: ReadonlyArray<number>, priority: (s: Sequence) => number): Iterable<Sequence>
{
    let comparator = function(a: Sequence, b: Sequence) { return priority(a) - priority(b) ; };
    let prioritized_sequences = new PriorityQueue({comparator: comparator});
    let allSequences = new Set();

    for(var i = 0; i <= prefix.length; i++)
    {
        let initialElements = prefix.slice(0, i);
        let sequence = new Sequence(initialElements, hole)
        prioritized_sequences.queue(sequence);
        allSequences.add(sequence.toString());
    }

    for(var i = 0; i < 100000; i++)
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
            {
                let str = s.toString();
                if(!allSequences.has(str))
                {
                    allSequences.add(str);
                    prioritized_sequences.queue(s);
                }
            }
        }
        else if(sequence.matches(prefix))
        {
            yield sequence;
        }
    }

    throw "reach iteration limit while searching for sequence";
}

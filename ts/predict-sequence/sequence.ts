
class Sequence
{
    private values: (number|null)[];
    constructor(readonly initialElements: ReadonlyArray<number>, readonly expression: Expression)
    {
        this.values = [ ...initialElements];
    }
    get isPattern(): boolean { return this.expression.isPattern; }
    *expand()
    {
        if(!this.expression.isPattern) return;
        for(let e of this.expression.expand())
            yield new Sequence(this.initialElements, e);
    }

    value(n: number): number
    {
        if(this.values.length < n)
            this.values.length = n;
        let i = n-1; // switch to zero based
        var v = this.values[i]
        if(v != null)
            return v;

        v = this.expression.evaluate(n, this.value);
        this.values[i] = v;
        return v;
    }

    matches(values: ReadonlyArray<number>): boolean
    {
        return values.every((value, i) => this.value(i) === value);
    }

    cost(): number
    {
        var initalCount = this.initialElements.length;
        var initialElementsCost = (initalCount==0)? 0 : Math.pow(2, initalCount+2)
        return initialElementsCost + this.expression.cost();
    }

    toString(): string
    {
        return this.initialElements.map((n, i) => `x_${i+1}=n`)
            .concat([ `x_n=${this.expression}` ])
            .join(", ");
    }
}

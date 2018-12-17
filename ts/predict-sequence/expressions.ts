function isInteger(x: number): boolean {
    return x % 1 === 0;
}

const MAX_CONSTANT: number = 1_000_000;

// An algebraic expression
abstract class Expression
{
    abstract get isPattern(): boolean;
    abstract get isConstant(): boolean;
    abstract evaluate(n: number, evaluate: (n: number) => number): number;
    abstract expand(): Iterable<Expression>;
    abstract cost(): number;

    add(e: Expression): Expression { return new Add(this, e); }
    mul(e: Expression): Expression { return new Multiply(this, e); }
    neg(): Expression { return new Negate(this); }

    abstract toString(): string;
}

// A constant number in an expression
class Constant extends Expression
{
    constructor(readonly value: number)
    {
        super();
        if(!isInteger(value)) throw "Value "+value+" can't be used as Constant, because it isn't an integer";
        if(value > MAX_CONSTANT || value < 1) throw "Value "+value+" not in Constant range.";
    }
    get isPattern() { return false; }
    get isConstant() { return true; }
    evaluate(n: number, evaluate: (n: number) => number): number { return this.value; }
    *expand(): Iterable<Expression> { yield this; }
    cost(): number { return 1 + Math.log2(this.value); }
    toString(): string { return this.value.toString(); }
}

// The variable `n` in an expression, starts at `n=1`
class Index extends Expression
{
    constructor() { super(); }
    get isPattern() { return false; }
    get isConstant() { return false; }
    evaluate(n: number, evaluate: (n: number) => number): number
    {
        if(!isInteger(n)) throw "n="+n+" can't be used as Index, because it isn't an integer";
        return n;
    }
    *expand(): Iterable<Expression> { yield this; }
    cost(): number { return 3; }
    toString(): string { return "n"; }
}

// A hole `_` in an expression where an expression can be substituted in
class Hole extends Expression
{
    constructor() { super(); }
    get isPattern() { return true; }
    get isConstant() { return false; }
    evaluate(n: number, evaluate: (n: number) => number): number
    {
        throw "Pattern expressions can't be evaluated";
    }
    *expand(): Iterable<Expression>
    {
        yield zeroHole;
        yield index;
        yield negatePattern;
        yield addPattern;
        yield multiplyPattern;
    }
    cost(): number { return 1; }
    toString(): string { return "{…}"; }
}

// A hole `_` in an expression where only a constant >= value
class ConstantHole extends Expression
{
    constructor(readonly value: number)
    {
        super();
        if(!isInteger(value)) throw "Value "+value+" can't be used as ConstantHole, because it isn't an integer";
        if(value > MAX_CONSTANT || value < 1) throw "Value "+value+" not in ConstantHole range.";
    }
    get isPattern() { return true; }
    get isConstant() { return false; }
    evaluate(n: number, evaluate: (n: number) => number): number
    {
        throw "Pattern expressions can't be evaluated";
    }
    *expand(): Iterable<Expression>
    {
        yield new Constant(this.value);
        yield new ConstantHole(this.value + 1);
    }
    cost(): number { return 2 + Math.log2(this.value); }
    toString(): string { return `{${this.value},…}`; }
}

class Negate extends Expression
{
    constructor(readonly operand: Expression) { super(); }
    get isPattern() { return this.operand.isPattern; }
    get isConstant() { return this.operand.isConstant; }
    evaluate(n: number, evaluate: (n: number) => number): number
    {
        return -this.operand.evaluate(n, evaluate);
    }
    *expand(): Iterable<Expression>
    {
        if(!this.isPattern)
        {
            yield this;
            return;
        }
        for(let e of this.operand.expand())
            yield e.neg();
    }
    cost(): number { return 1 + this.operand.cost(); }
    toString(): string { return `-${this.operand}`; }
}

abstract class BinaryExpression extends Expression
{
    constructor(readonly leftOperand: Expression, readonly rightOperand: Expression)
    {
        super();
    }
    get isPattern() { return this.leftOperand.isPattern || this.rightOperand.isPattern; }
    get isConstant() { return this.leftOperand.isConstant && this.rightOperand.isConstant; }
    *expand(): Iterable<Expression>
    {
        if(!this.isPattern)
        {
            yield this;
            return;
        }
        let lefts = [ ...this.leftOperand.expand() ];
        let rights = [ ...this.rightOperand.expand() ];
        for(let left of lefts)
            for(let right of rights)
                yield this.make(left, right);
    }
    protected abstract make(leftOperand: Expression, rightOperand: Expression): Expression;
}

class Add extends BinaryExpression
{
    constructor(leftOperand: Expression, rightOperand: Expression)
    {
        super(leftOperand, rightOperand);
    }

    evaluate(n: number, evaluate: (n: number) => number): number
    {
        return this.leftOperand.evaluate(n, evaluate) + this.rightOperand.evaluate(n, evaluate);;
    }

    make(leftOperand: Expression, rightOperand: Expression): Expression
    {
        return new Add(leftOperand, rightOperand);
    }

    cost(): number { return 3 + this.leftOperand.cost() + this.rightOperand.cost(); }

    toString(): string { return `${this.leftOperand} + ${this.rightOperand}`; }
}

class Multiply extends BinaryExpression
{
    constructor(leftOperand: Expression, rightOperand: Expression)
    {
        super(leftOperand, rightOperand);
    }

    evaluate(n: number, evaluate: (n: number) => number): number
    {
        return this.leftOperand.evaluate(n, evaluate) * this.rightOperand.evaluate(n, evaluate);;
    }

    make(leftOperand: Expression, rightOperand: Expression): Expression
    {
        return new Multiply(leftOperand, rightOperand);
    }

    cost(): number { return 8 + this.leftOperand.cost() + this.rightOperand.cost(); }

    toString(): string { return `${this.leftOperand} * ${this.rightOperand}`; }
}

const hole: Expression = new Hole();
const index: Expression = new Index();
const negatePattern: Expression = hole.neg();
const addPattern: Expression = hole.add(hole);
const multiplyPattern: Expression = hole.mul(hole);
const zeroHole: Expression = new ConstantHole(1);

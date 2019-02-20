---
author: "J Thomas Moros"
title: "Sleeping Beauty"
published: 2019-02-09
tags: ["Anthropic Reasoning", "Decision Theory"]
---
The sleeping beauty problem has become one of the paradigmatic problems in anthropic reasoning. Many sources consider only this problem or at least discuss it first. It was first developed in the mid-1980s by Arnold Zuboff. However, it was not published by him until 1990 in "One Self: The Logic of Experience".[^OneSelf] The version given here is from Bostrom.

> On Sunday afternoon Beauty is given the following information.
> She will be put to sleep on Sunday evening and will wake up on
> Monday morning. Initially, she will not know what day it is, but on
> Monday afternoon she’ll be told it is Monday. On Monday evening
> she will be put to sleep again. Then a fair coin will be tossed and if
> and only if it falls tails will she be awakened again on Tuesday.
> However, before she is woken, she will have her memory erased so
> that upon awakening on Tuesday morning she has no memory of
> having been awakened on Monday. When she wakes up on
> Monday, what probability should she assign to the hypothesis that
> the coin landed heads?
>
> <footer>Nick Bostrom <cite markdown="1">[Anthropic Bias](http://www.anthropic-principle.com/?q=book/table_of_contents)</cite></footer>

Note that the specific days of the week the experiment occurs on are not relevant to the answer, but it is common to refer to Beauty's Monday and Tuesday awakenings by the day of the week.

Other formulations pose the problem as a question asked of Beauty on each day after her awakening.[^Wikipedia] The question is "What is your credence now for the proposition that the coin landed heads?" This is slightly different, focusing more on her degree of belief.

There are traditionally two positions on the answer. The first, called the "Thirder position," asserts that the probability of heads is ⅓. This position focuses on the three situations she can awake in. First, that it is Monday and the coin landed heads. Second, that it is Monday and the coin landed tails. Third, that is it Tuesday, and the coin landed tails. Since she is unable to distinguish these three outcomes, she should assign a probably of ⅓ to the coin landing heads.

The "Halfer position" focuses on the fair coin. It asserts that the probability of heads is ½. One line of argument for this is that before awakening, Beauty would assign a probability of ½ to the coin landing heads. Upon awakening, nothing has changed, and so for logical consistency, she must continue to believe the chance of heads is ½.

Other philosophers propose a third position. The so-called "Double halfer position." It focuses on an additional aspect of Beauty's credence that the coin landed heads. As stated, sleeping beauty does not know whether it is Monday or Tuesday when she is asked her credence the coin landed heads. Call that "Q1." However, on Monday afternoon she will be told it is Monday. You could then ask her again what her credence the coin landed heads is. Call this "Q2." The double halfer position asserts that the answer two both questions should be ½. This would seem to contradict the fact that she should update her probabilities using Bayesian reasoning upon learning it is Monday. The answers to the two questions for each of the three views are then:

| View          | Q1   | Q2   |
| ------------- | :--- | :--- |
| Halfer        | ½    | ⅔    |
| Thirder       | ⅓    | ½    |
| Double Halfer | ½    | ½    |
{: .table }

Various writers have considered numerous variations on the sleeping beauty problem. In particular, Nick Bostrom formulated the "Extreme Sleeping Beauty Problem." It differs from the standard version only in that rather than being awoken on two days if the coin lands tails, Beauty will be awakened 1 million days in a row. This doesn't alter the problem. However, it makes the probabilities given by various positions much more extreme which might cause one to re-evaluate them.

[^OneSelf]: [Zuboff, Arnold. “One Self: The Logic of Experience.” Inquiry: An Interdisciplinary Journal of Philosophy, vol. 33, no. 1, 1990, pp. 39–68., doi:10.1080/00201749008602210.](https://philpapers.org/archive/ZUBOST.pdf)
[^Wikipedia]: [“Sleeping Beauty Problem.” *Wikipedia*, Wikimedia Foundation, 31 Aug. 2018.](https://en.wikipedia.org/wiki/Sleeping_Beauty_problem)

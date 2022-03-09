'''
Note: the following code is not mine, but is taken from this article:
https://ipython-books.github.io/122-simulating-an-elementary-cellular-automaton/
I have edited it slightly.
'''

import numpy as np

u = np.array([[4], [2], [1]])

def step(x, rule_b):
    # The columns contains the L, C, R values
    # of all cells.
    y = np.vstack((np.roll(x, 1), x,
                   np.roll(x, -1))).astype(np.int8)
    # We get the LCR pattern numbers between 0 and 7.
    z = np.sum(y * u, axis=0).astype(np.int8)
    # We get the patterns given by the rule.
    return rule_b[7 - z]

def generate_binary_plot(rule, steps):
    """Simulate an elementary cellular automaton given
    its rule (number between 0 and 255)."""
    # Compute the binary representation of the rule.
    rule_b = np.array(
        [int(_) for _ in np.binary_repr(rule, 8)],
        dtype=np.int8)
    x = np.zeros((steps, steps), dtype=np.int8)
    # Random initial state.
    x[0, 0] = 1
    # Apply the step function iteratively.
    for i in range(steps - 1):
        x[i + 1, :] = step(x[i, :], rule_b)
    return x.tolist()

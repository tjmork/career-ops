# Binary String Segregation — Maximum Cost

**Source:** Coding assessment (IBM-style)  
**Language:** JavaScript (Node.js)

## Problem

Given a binary string `s` containing only `'0'` and `'1'`, the string is **segregated** when all `'1'` characters appear after all `'0'` characters.

**Operation:** Choose a `'1'` and move it rightward until it reaches either:

- the end of the string, or
- the next `'1'` (it cannot pass another `'1'`).

**Cost:** `1 + (number of positions moved)`

Each `'1'` must move to its furthest possible position to the right when chosen.

**Task:** Compute the **maximum total cost** achievable while transforming `s` into a segregated string.

## Examples

| Input | Output | Notes |
|-------|--------|-------|
| `"10100"` | `8` | `2 + 3 + 3` |
| `"110100"` | `13` | `2 + 2 + 9` |
| `"01110"` | `6` | `2 + 2 + 2` via `01110 → 01101 → 01011 → 00111` |
| `"10"` | `2` | Single move |

### Example walkthrough: `"110100"`

1. Move `'1'` at index 1 past `'0'` at index 2 → cost `2` → `"101100"`
2. Move `'1'` at index 0 past `'0'` at index 1 → cost `2` → `"011100"`
3. Move each of three `'1'`s past two trailing `'0'`s → cost `3` each → `9`

**Total:** `13`

## Constraints

- `1 <= length of s <= 10^5`
- Each character is `'0'` or `'1'`

## Approach

Scan left to right: for each `'0'`, add `2 × (ones seen so far)`.

Subtract a correction based on **leading consecutive `'1'`s** (`L`):

- `L >= 2` → subtract `2*L - 1`
- `L === 1` and more than one zero in string → subtract `2`
- otherwise → subtract `0`

## Solution

```javascript
function getMaxCost(s) {
    let ones = 0;
    let ans = 0;
    let zeros = 0;

    for (const c of s) {
        if (c === '1') {
            ones++;
        } else {
            ans += 2 * ones;
            zeros++;
        }
    }

    let L = 0;
    while (L < s.length && s[L] === '1') L++;

    let subtract = 0;
    if (L >= 2) subtract = 2 * L - 1;
    else if (L === 1 && zeros > 1) subtract = 2;

    return ans - subtract;
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)

# Count Increasing Triplets

**Source:** Coding assessment (IBM-style)  
**Language:** JavaScript (Node.js)

## Problem

Given an integer array `arr` of length `n`, compute how many **strictly increasing subsequences of length 3** can be formed. Return the result **modulo 10⁹ + 7**.

A subsequence is obtained by deleting zero or more elements without changing the order of remaining elements.

A valid triplet uses indices `i < j < k` such that `arr[i] < arr[j] < arr[k]`.

## Examples

| Input | Output | Notes |
|-------|--------|-------|
| `[1, 2, 3, 4, 1]` | `4` | `[1,2,3]`, `[1,2,4]`, `[1,3,4]`, `[2,3,4]` |
| `[3, 1, 4, 5]` | `2` | `[3,4,5]`, `[1,4,5]` |

## Constraints

- `1 <= n <= 5000`
- `0 <= arr[i] <= 10^9`

Use **O(n²)** (not O(n³)).

## Approach

Fix the **middle** element `arr[j]`. For each `j`:

- `leftSmaller` = count of `i < j` where `arr[i] < arr[j]`
- `rightGreater` = count of `k > j` where `arr[k] > arr[j]`
- Triplets with middle `j` = `leftSmaller × rightGreater`

## Solution

```javascript
function countIncreasingTriplets(arr) {
    const MOD = 1_000_000_007;
    const n = arr.length;

    if (n < 3) return 0;

    let result = 0;

    for (let j = 0; j < n; j++) {
        let leftSmaller = 0;
        let rightGreater = 0;

        for (let i = 0; i < j; i++) {
            if (arr[i] < arr[j]) leftSmaller++;
        }

        for (let k = j + 1; k < n; k++) {
            if (arr[k] > arr[j]) rightGreater++;
        }

        result = (result + leftSmaller * rightGreater) % MOD;
    }

    return result;
}
```

## Complexity

- **Time:** O(n²)
- **Space:** O(1)

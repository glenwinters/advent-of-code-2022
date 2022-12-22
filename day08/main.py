def get_input():
    with open("input.txt", "r") as f:
        lines = f.read().splitlines()
        return lines


# Approach
# For each tree, we could scan to the edge in all 4 directions, but
# the time complexity would be 2n for the scan and n^2 to visit each
# tree for a total of O(n^3).
# Optimizations:
# * Simultaneously process the rows and cols
# * Only check up to the last tallest tree on the reverse check
# Now we go through n rows/cols, scanning ~2n for a total of O(n^2)
def main():
    trees = get_input()
    # assume square input
    tree_len = len(trees)

    # -1 = not determined
    # 0 = not visible (not used)
    # 1 = visible
    visibility = [[-1]*len(trees) for _ in range(len(trees))]
    trees_visible = 0
    # for j, process the jth row and col simultaneously
    for j in range(len(trees)):
        row_tallest = -1
        col_tallest = -1
        row_tallest_i = -1
        col_tallest_i = -1
        # go through the row/col and mark each tallest tree as visible and keep track of the last one
        # e.g. [1, 2, 5, 5, 0]
        # 1, 2, 5 visible from left to right, 2nd 5 is the last tallest
        for i in range(tree_len):
            row_tree = int(trees[j][i])
            col_tree = int(trees[i][j])

            # check for tallest in row
            if row_tree > row_tallest:
                row_tallest = row_tree
                row_tallest_i = i
                if visibility[j][i] != 1:
                    trees_visible += 1
                visibility[j][i] = 1

            elif row_tree == row_tallest:
                row_tallest_i = i

            # check for tallest in col
            if col_tree > col_tallest:
                col_tallest = col_tree
                col_tallest_i = i
                if visibility[i][j] != 1:
                    trees_visible += 1
                visibility[i][j] = 1
            elif col_tree == col_tallest:
                col_tallest_i = i

        # Mark last tallest as visible
        if visibility[j][row_tallest_i] != 1:
            trees_visible += 1
        visibility[j][row_tallest_i] = 1
        if visibility[col_tallest_i][j] != 1:
            trees_visible += 1
        visibility[col_tallest_i][j] = 1

        # go through the row/col backwards up to the last tallest tree found earlier and
        # mark each tallest tree as visible
        # e.g. [1, 2, 5, 5, 0] (same as above)
        # 0 visible from right to left, stopping at the 2nd 5
        # since processing row and col and they have different tallest_i, need to go to
        # the further one and stop early for the other one
        row_stop = len(trees) - row_tallest_i
        col_stop = len(trees) - col_tallest_i
        row_tallest2 = -1
        col_tallest2 = -1
        for i in range(-1, -1 * row_stop if row_stop > col_stop else -1 * col_stop, -1):
            row_tree = int(trees[j][i])
            col_tree = int(trees[i][j])
            if i > row_stop * -1 and row_tree > row_tallest2:
                row_tallest2 = row_tree
                if visibility[j][i] != 1:
                    trees_visible += 1
                visibility[j][i] = 1
            if i > col_stop * -1 and col_tree > col_tallest2:
                col_tallest2 = col_tree
                if visibility[i][j] != 1:
                    trees_visible += 1
                visibility[i][j] = 1

    print(trees_visible)


def main2():
    tree_input = get_input()
    trees = [[-1] * len(tree_input) for _ in range(len(tree_input))]
    scores = [[-1] * len(tree_input) for _ in range(len(tree_input))]
    max_score = -1

    for i in range(len(tree_input)):
        for j in range(len(tree_input)):
            tree = int(tree_input[j][i])
            trees[j][i] = tree

    for j in range(len(trees)):
        for i in range(len(trees)):
            tree = trees[j][i]
            # print(f'current {i},{j}')

            # print("north")
            seen_north = 0
            for n in range(1, len(trees)):
                j2 = j - n
                if j2 < 0:
                    break
                seen_north += 1
                if trees[j2][i] >= tree:
                    break
            # print(seen_north)

            # print("south")
            seen_south = 0
            for n in range(1, len(trees)):
                j2 = j + n
                if j2 > len(trees) - 1:
                    break
                seen_south += 1
                if trees[j2][i] >= tree:
                    break
            # print(seen_south)

            # print("west")
            seen_west = 0
            for n in range(1, len(trees)):
                i2 = i - n
                if i2 < 0:
                    break
                seen_west += 1
                if trees[j][i2] >= tree:
                    break
            # print(seen_west)

            # print("east")
            seen_east = 0
            for n in range(1, len(trees)):
                i2 = i + n
                if i2 > len(trees) - 1:
                    break
                seen_east += 1
                if trees[j][i2] >= tree:
                    break
            # print(seen_east)

            score = seen_north * seen_south * seen_west * seen_east
            scores[j][i] = score

            if score > max_score:
                max_score = score
    print(max_score)


main()
main2()

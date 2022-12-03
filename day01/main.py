def get_input():
    with open("input.txt", "r") as f:
        lines = f.read().splitlines()
        return lines

lines = get_input()

totals = []
total = 0
for line in lines:
    if line == '':
        totals.append(total)
        total = 0
    else:
        total += int(line)
print(max(totals))
print(sum(sorted(totals)[-3:]))
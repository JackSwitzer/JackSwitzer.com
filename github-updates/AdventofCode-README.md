# Advent of Code 2024

My solutions for [Advent of Code 2024](https://adventofcode.com/2024) implemented across **8 programming languages**, earning **29 stars**.

## Language Breakdown

| Day | Language | Stars | Notes |
|-----|----------|-------|-------|
| 1 | Python, Rust | ⭐⭐ | Dual implementation |
| 2 | Java | ⭐⭐ | |
| 3 | R, Python | ⭐⭐ | Regex parsing |
| 4 | PHP, Python | ⭐⭐ | |
| 5 | C | ⭐⭐ | |
| 6 | C++ | ⭐⭐ | |
| 7 | PHP | ⭐⭐ | |
| 8 | Python, Rust | ⭐⭐ | |
| 9 | Python, Rust | ⭐⭐ | |
| 10 | Python | ⭐⭐ | |
| 11 | OCaml, Rust | ⭐⭐ | Functional approach |
| 12 | Python | ⭐⭐ | |
| 13 | Python | ⭐⭐ | |
| 14 | Python | ⭐ | |

## Languages Used

```
Python     ████████████████████  10 days (primary)
Rust       ████████              4 days
PHP        ████                  2 days
C          ██                    1 day
C++        ██                    1 day
Java       ██                    1 day
R          ██                    1 day
OCaml      ██                    1 day
```

**3 languages were entirely new to me** this year: OCaml, R, and PHP.

## Project Structure

```
├── Days/
│   ├── Day1/      # Python + Rust
│   ├── Day2/      # Java
│   ├── ...
│   └── Day14/     # Python
├── PY_utils.py    # Shared Python utilities
├── Claude/        # AI-assisted solutions
└── CMakeLists.txt # C/C++ build config
```

## Utilities

Built reusable utilities focused on:
- **Parsing**: Input reading and grid parsing
- **Pathfinding**: BFS, DFS, Dijkstra implementations
- **Search**: Pattern matching and optimization

## Running Solutions

### Python
```bash
cd Days/Day1
python solution.py
```

### Rust
```bash
cd Days/Day1
cargo run --release
```

### C/C++
```bash
mkdir build && cd build
cmake ..
make
./day5
```

## Stats

- **Total Stars**: 29/50
- **Languages**: 8
- **New Languages Learned**: 3

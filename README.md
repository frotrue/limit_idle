# Limit Idle

Limit Idle is a small browser-based incremental (idle) game / prototype that explores polynomial-based progression. The player upgrades polynomial coefficients and related stats to increase the value produced by evaluating a polynomial function f(x). Differentiation is a special reset mechanic that converts the current polynomial into an instant bonus and unlocks automation features.

## Key ideas
- The game's core resource is "fv" (function value) produced by evaluating a polynomial f(x) at a progressing x value.
- The polynomial is represented as an array of coefficients: index 0 is the constant term, index 1 is the coefficient for x^1, index 2 for x^2, and so on.
- Upgrades increase the coefficients, the maximum x, and the rate of x progression. A large one-time cost action called "Differentiate" evaluates the polynomial's derivative (or uses its value at a chosen x) and grants a permanent/instant bonus (fb), then resets much of the progress.

## Features
- Polynomial-based production: f(x) is stored as an array of coefficients and evaluated repeatedly to produce fv.
- Upgrade buttons for individual coefficients (Upgrade X⁰, X¹, X², ...), plus separate upgrades for max x and x-increase speed.
- A differentiate mechanic that consumes fv to produce fb (derived value), resets progress, and enables automation options.
- Basic auto-upgrade toggle cards that become available after differentiation.
- Small, dependency-free front-end: just open `index.html` in a browser. The project includes jQuery and a Break-Infinity-style big-number library for handling large values.

## How to run (development and play)
1. Clone or download the repository to your machine.
2. Open the project folder and run the app by opening `index.html` in any modern browser (Chrome, Edge, Firefox, Safari). No build step required.

Optional: Using a local HTTP server (recommended for some browsers)
- If your browser blocks some local file features, run a tiny static server from the project folder. For example, using Python 3:

  ```
  python -m http.server 8000
  ```

  Then open http://localhost:8000 in your browser.

## Project structure
- index.html — main HTML that wires the UI and loads scripts/styles.
- style.css — basic styles for the UI.
- package.json — minimal npm manifest (no build scripts).
- src/
  - break_infinity.js — big-number helper (included locally).
  - jquery-4.0.0-rc.1.js — local jQuery copy used by UI code.
  - math.js — core math helpers: equation evaluation and differentiation.
  - logic.js — main game logic, data structures, save/load, UI interaction.
  - ui.js — UI helpers (rendering and event handlers).
  - tutorial.js — tutorial / mission flow for early-game guidance.
  - data.js — data persistence and initial data (loads/saves).

## Important functions and variables
- `first_var.fx`: Array of Decimal coefficients for f(x). Index corresponds to power of x (0 => constant, 1 => x^1, ...).
- `equation_calc(equation, x)`: Evaluates a polynomial represented by the coefficient array at value x.
- `differentiate(equation, x)`: Computes the derivative coefficients (or evaluates derivative at x and returns a numeric result when x is provided).
- `calc_fv_loop()`: The main loop that increases current_x and, when max_x is reached, evaluates f(max_x) to add to fv.

## Saving and loading
- The game uses localStorage to persist `first_var`, `upgrade_button_data`, `second_var`, and `game_data`.
- Use the browser devtools (Application / Storage) to inspect or edit saved values.

## Development notes
- The code uses a Decimal-like big-number library (included as `break_infinity.js`) to avoid precision issues for large values.
- UI strings and some comments are currently in Korean; function names are largely English-friendly and short, e.g., `differentiate_bt()`, `upgrade_buttons(n)`, `other_upgrade_buttons(n)`.
- If you add new features, try to keep changes modular (new files under `src/`) and update `index.html` script order if needed.

## Contributing
- This is a small personal/experimental project. If you'd like to contribute, open an issue or a pull request with a clear description of the change.

## License
- No license specified. Add a LICENSE file if you want to make licensing explicit.

## Contact
- Project origin link (if available): https://frotrue.github.io/limit_idle/ (old demo site referenced in the repo)

## Notes
- This README focuses on usage and quick developer orientation. See inline comments in `src/math.js` and `src/logic.js` for specifics of the math and game flows.

# ε-NFA Epsilon-Closure Calculator

A simple web application that calculates the **ε-closure of every state** in an ε-NFA using a transition matrix.

## Features

* Enter ε-NFA transition matrix
* Calculate ε-closure for every state
* Valid and invalid input checking
* Example and reset buttons
* Simple and responsive UI
* Can be used as a web and desktop application

## Technologies

* HTML
* CSS
* JavaScript
* Electron
* GitHub Pages

## Example

For:
q0 →ε q1 →ε q2


Output:
ε-closure(q0) = {q0, q1, q2}
ε-closure(q1) = {q1, q2}
ε-closure(q2) = {q2}

## Algorithm

The application uses **DFS (Depth First Search)** to follow all ε-transitions and find the complete closure of each state.

## Author
Divyani
Theory of Computation Project

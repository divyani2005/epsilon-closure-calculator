function createMatrix() {

    const stateCount =
        parseInt(
            document.getElementById("stateCount").value
        );

    const container =
        document.getElementById("matrixContainer");

    container.innerHTML = "";

    if (
        isNaN(stateCount) ||
        stateCount < 1 ||
        stateCount > 10
    ) {

        container.innerHTML =
            `<p class="error-message">
                ❌ Enter between 1 and 10 states.
            </p>`;

        return;
    }


    const table =
        document.createElement("table");


    // HEADER

    const header =
        document.createElement("tr");

    const firstHeader =
        document.createElement("th");

    firstHeader.innerText = "State";

    header.appendChild(firstHeader);


    for (
        let i = 0;
        i < stateCount;
        i++
    ) {

        const th =
            document.createElement("th");

        th.innerText = "q" + i;

        header.appendChild(th);
    }


    table.appendChild(header);


    // MATRIX ROWS

    for (
        let i = 0;
        i < stateCount;
        i++
    ) {

        const row =
            document.createElement("tr");


        const state =
            document.createElement("th");

        state.innerText = "q" + i;

        row.appendChild(state);


        for (
            let j = 0;
            j < stateCount;
            j++
        ) {

            const cell =
                document.createElement("td");


            const input =
                document.createElement("input");

            input.type = "text";

            input.className =
                "matrix-cell";

            input.id =
                `cell-${i}-${j}`;

            input.value = "0";

            input.maxLength = 1;


            cell.appendChild(input);

            row.appendChild(cell);
        }


        table.appendChild(row);
    }


    container.appendChild(table);
}


/* LOAD EXAMPLE */

function loadExample() {

    document.getElementById("stateCount").value = 4;

    createMatrix();


    const values = [
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
        [0, 0, 0, 0]
    ];


    for (
        let i = 0;
        i < 4;
        i++
    ) {

        for (
            let j = 0;
            j < 4;
            j++
        ) {

            document.getElementById(
                `cell-${i}-${j}`
            ).value = values[i][j];

        }
    }
}


/* CLEAR */

function clearMatrix() {

    const stateCount =
        parseInt(
            document.getElementById("stateCount").value
        );


    for (
        let i = 0;
        i < stateCount;
        i++
    ) {

        for (
            let j = 0;
            j < stateCount;
            j++
        ) {

            const cell =
                document.getElementById(
                    `cell-${i}-${j}`
                );

            if (cell) {

                cell.value = "0";

            }
        }
    }


    document.getElementById("results").innerHTML =
        `<div class="empty-state">

            <div class="empty-icon">
                ε
            </div>

            <p>
                Your results will appear here.
            </p>

        </div>`;


    document.getElementById("error").innerHTML = "";


    document.getElementById("graph").innerHTML =
        `<p class="graph-placeholder">
            Calculate the closure to generate
            the graph.
        </p>`;
}


/* CALCULATE EPSILON CLOSURE */

function calculateClosure() {

    const stateCount =
        parseInt(
            document.getElementById("stateCount").value
        );


    const error =
        document.getElementById("error");


    const results =
        document.getElementById("results");


    error.innerHTML = "";

    results.innerHTML = "";


    if (
        isNaN(stateCount) ||
        stateCount < 1 ||
        stateCount > 10
    ) {

        error.innerHTML =
            `<div class="error-message">
                ❌ Invalid number of states.
            </div>`;

        return;
    }


    /* READ MATRIX */

    const matrix = [];


    for (
        let i = 0;
        i < stateCount;
        i++
    ) {

        matrix[i] = [];


        for (
            let j = 0;
            j < stateCount;
            j++
        ) {

            const input =
                document.getElementById(
                    `cell-${i}-${j}`
                );


            if (!input) {

                error.innerHTML =
                    `<div class="error-message">
                        ❌ Please create the matrix first.
                    </div>`;

                return;
            }


            const value =
                input.value.trim();


            /* VALIDATION */

            if (
                value !== "0" &&
                value !== "1"
            ) {

                error.innerHTML =
                    `<div class="error-message">
                        ❌ Invalid input at
                        q${i} → q${j}.
                        Enter only 0 or 1.
                    </div>`;

                return;
            }


            matrix[i][j] =
                parseInt(value);
        }
    }


    /* CALCULATE CLOSURE */

    for (
        let start = 0;
        start < stateCount;
        start++
    ) {


        const closure =
            new Set();


        const stack = [];


        /* A STATE ALWAYS BELONGS TO
           ITS OWN EPSILON CLOSURE */

        closure.add(start);

        stack.push(start);


        /* DFS */

        while (
            stack.length > 0
        ) {

            const current =
                stack.pop();


            for (
                let next = 0;
                next < stateCount;
                next++
            ) {


                /*
                    If an epsilon transition exists
                    and the state hasn't been visited
                */

                if (
                    matrix[current][next] === 1 &&
                    !closure.has(next)
                ) {

                    closure.add(next);

                    stack.push(next);
                }

            }

        }


        const closureArray =
            Array.from(closure)
                .sort(
                    (a, b) => a - b
                );


        const result =
            document.createElement("div");


        result.className =
            "result-item";


        result.innerHTML = `

            <span class="result-state">
                ε-closure(q${start})
            </span>

            <span class="result-set">
                { ${closureArray
                    .map(
                        state => "q" + state
                    )
                    .join(", ")} }
            </span>

        `;


        results.appendChild(result);

    }


    /* DRAW GRAPH */

    drawGraph(matrix, stateCount);
}


/* GRAPH */

function drawGraph(
    matrix,
    stateCount
) {

    const graph =
        document.getElementById("graph");


    graph.innerHTML = "";


    let hasTransition = false;


    for (
        let i = 0;
        i < stateCount;
        i++
    ) {

        for (
            let j = 0;
            j < stateCount;
            j++
        ) {

            if (
                matrix[i][j] === 1
            ) {

                hasTransition = true;


                const node =
                    document.createElement(
                        "div"
                    );


                node.innerHTML = `

                    <div class="graph-node">
                        q${i}
                    </div>

                    <div class="graph-arrow">
                        ↓ ε
                    </div>

                    <div class="graph-node">
                        q${j}
                    </div>

                `;


                graph.appendChild(node);
            }
        }
    }


    if (!hasTransition) {

        graph.innerHTML =
            `<p class="graph-placeholder">
                No ε-transitions found.
            </p>`;
    }
}


/* CREATE DEFAULT MATRIX */

window.onload = function () {

    createMatrix();

};
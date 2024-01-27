const context = document.getElementById("data-set").getContext("2d");
let line = new Chart(context, {});
// these are the values from the form 
const initialAmount = document.getElementById("initialamount");
const years = document.getElementById("years");
const rates = document.getElementById("rates");
const compound = document.getElementById("Compound");

// Message
const message = document.getElementById("message");

// calcultion button 
const button = document.querySelector(".input-group button");
// attach listener 
button.addEventListener("click", calculateGrowth);

const data = [];
const labels = [];

function calculateGrowth(e) {
    e.preventDefault();
    data.length = 0;
    labels.length = 0;
    let growth = 0;

    try {
        const initial = parseInt(initialamount.value);
        const period = parseInt(years.value);
        const interest = parseInt(rates.value);
        const comp = parseInt(Compound.value);

        for (let i = 1; i <= period; i++) {
            const final = initial * Math.pow(1 + ((interest / 100) / comp), comp * i);
            data.push(toDecimal(final, 2));
            labels.push("Year " + i);
            growth = toDecimal(final, 2);
        }
        // Clear existing table rows
        resultTableBody.innerHTML = "";

        // Populate the table with calculated values
        for (let i = 0; i < period; i++) {
            const startingBalance = i === 0 ? initial : data[i - 1];
            const endingBalance = data[i];
            const earned = endingBalance - startingBalance;

            // Create a new table row
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${i + 1}</td>
                <td>${toDecimal(startingBalance, 2)}</td>
                <td>${toDecimal(endingBalance, 2)}</td>
                <td>${toDecimal(earned, 2)}</td>
            `;

            // Append the row to the table
            resultTableBody.appendChild(row);
        }
        
        drawGraph();
    } catch (error) {
        console.error(error);
    }
}

function drawGraph() {
    line.destroy();
    line = new Chart(context, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: "Compound",
                data,
                fill: true,
                backgroundColor: ["#f7841f"],
                borderWidth: 3
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        color: "#ffffff" // Set the label color to white
                    },
                    grid: {
                        color: "#333333" // Set the x-axis grid color
                    }
                },
                y: {
                    ticks: {
                        color: "#ffffff" // Set the label color to white
                    },
                    grid: {
                        color: "#333333" // Set the y-axis grid color
                    }
                }
            },
            legend: {
                title: {
                    color: "#ffffff" // Set the legend label color to white
                }
            }
        }
            
        
    });
}


function toDecimal(value, decimals) {
    return +value.toFixed(decimals);

}


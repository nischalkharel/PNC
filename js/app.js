const context = document.getElementById("data-set").getContext("2d");

// these are the values from the form 
const initialAmount = document.getElementById("initialamount");
const years = document.getElementById("years");
const rates = document.getElementById("rates");
const compound = document.getElementById("Compound");

// calcultion button 
const button = document.querySelector(".input-group button");
// attach listener 
button.addEventListener("click", calculateGrowth);

const data = [];
const labels = [];

function calculateGrowth(e) {
    e.preventDefault();

    try {
        const initial = parseInt(initialamount.value);
        const period = parseInt(years.value);
        const interest = parseInt(rates.value);
        const comp = parseInt(Compound.value);

        for (let i = 1; i <= period; i++) {
            const final = initial * Math.pow(1 + ((interest / 100) / comp), comp * i);
            data.push(final);
            labels.push("Year " + i);
        }
        drawGraph();
    } catch (error) {
        console.error(error);
    }
}

function drawGraph() {
    new Chart(context, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: "Compound",
                data,
                fill: true,
                backgroundColor: "rgba(12, 141, 0, 0.7)",
                borderWidth: 3
            }]
        }
    });
}


function toDecimal(value, decimals) {
    return +value.toFixed(decimals);

}


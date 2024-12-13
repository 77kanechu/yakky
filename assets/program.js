var yakkyctx = document.getElementById("yakkygraph");
let days = ["","","","","","",""];
let yaksiobas = ["","","","","","",""];
let yoreis = ["","","","","","",""];
let yakkyvalue = ["","","","","","",""];

let times = 6;


async function loadData() {
    const response = await fetch("https://script.google.com/macros/s/AKfycbzQvkU2u3rsg5EGYriaL7UcG5Nt396D1xFKZnZS0JI4DDQia4z8QxqQ0HEsjSanjhj6/exec");
    const data  = await response.json();
    data.forEach(entry => {
        const x = entry.day;
        const y = entry.yakisoba;
        const z = entry.yorei;
        days[times] = x;
        yaksiobas[times] = y;
        yoreis[times] = z;
        yakkyvalue[times] = (64 + 4 * y - 4 * z);
        times--;
    });
    document.getElementById("yvalue").innerText = yakkyvalue[6];
    document.getElementById("gvalue").innerText = Math.round((yakkyvalue[6] / 16 * 100)) / 100;
    document.getElementById("lastvalue").innerText = Math.round(yakkyvalue[6] / yakkyvalue[5] * 10000) / 100 + "%";
    document.getElementById("ate").innerText = yaksiobas[6];
    document.getElementById("late").innerText = yoreis[6];
    var yakky = new Chart(yakkyctx, {
        type: 'line',
        data: {
            labels:days,
            datasets: [
                {
                    label: 'やっきー相場',
                    data: yakkyvalue,
                    borderColor: "#ff0000ff",
                    backgroundColor: "#ffffff00"
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    })
    document.getElementById("waitbox").style.display = "none"
}

loadData();
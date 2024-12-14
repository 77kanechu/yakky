var yakkyctx = document.getElementById("yakkygraph");
let days = ["","","","","","",""];
let yakisobas = ["","","","","","",""];
let yoreis = ["","","","","","",""];
let yakkyvalue = ["","","","","","",""];

let times = 6;


async function loadData() {

    document.getElementById("waittxt").innerText = "データ取得中"

    const response = await fetch("https://script.google.com/macros/s/AKfycbzQvkU2u3rsg5EGYriaL7UcG5Nt396D1xFKZnZS0JI4DDQia4z8QxqQ0HEsjSanjhj6/exec");
    const data  = await response.json();
    data.forEach(entry => {
        const x = entry.day;
        const y = entry.yakisoba;
        const z = entry.yorei;
        days[times] = x;
        yakisobas[times] = y;
        yoreis[times] = z;
        yakkyvalue[times] = (64 + 4 * y - 4 * z);
        times--;
    });
    document.getElementById("yvalue").innerText = yakkyvalue[6];
    document.getElementById("gvalue").innerText = Math.round((yakkyvalue[6] / 16 * 100)) / 100;
    document.getElementById("lastvalue").innerText = Math.round(yakkyvalue[6] / yakkyvalue[5] * 10000) / 100 + "%";
    document.getElementById("ate").innerText = yakisobas[6];
    document.getElementById("late").innerText = yoreis[6];

    document.getElementById("waittxt").innerText = "グラフ描画中";

    var yakky = new Chart(yakkyctx, {
        type: 'line',
        data: {
            labels:days,
            datasets: [
                {
                    label: 'やっきー相場',
                    data: yakkyvalue,
                    borderColor: "#ff0000ff",
                    backgroundColor: "#ffffff00",
                    lineTension: 0,
                    yAxisID: "value",
                },{
                    label: '焼きそばを食べた人数',
                    data: yakisobas,
                    borderColor: "#349354ff",
                    backgroundColor: "#ffffff00",
                    lineTension: 0,
                    yAxisID: "other",
                },{
                    label: '予鈴遅刻の人数',
                    data: yoreis,
                    borderColor: "#347193ff",
                    backgroundColor: "#ffffff00",
                    lineTension: 0,
                    yAxisID: "other",
                },
            ]
        },
        
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    id: "value",
                    position: "left",
                    ticks: {
                        min: 0,
                        max: 80,
                        stepSize: 10,
                    },
                },{
                    id: "other",
                    position: "right",
                    ticks: {
                        min: 0,
                        max: 8,
                        stepSize: 1,
                    },
                },],

                y: {
                    beginAtZero: true,
                },
            },
        },
    })
    document.getElementById("waitbox").style.display = "none"
}

loadData();
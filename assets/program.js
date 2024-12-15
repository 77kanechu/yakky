var yakkyctx = document.getElementById("yakkygraph");
let days = ["","","","","","",""];
let yakisobas = ["","","","","","",""];
let yoreis = ["","","","","","",""];
let yakkyvalue = ["","","","","","",""];

let times = 13;

let graphticks;

async function loadData() {

    document.getElementById("waittxt").innerText = "データ取得中"

    const response = await fetch("https://script.google.com/macros/s/AKfycby0-qD8dnOzsVK6TlKCrRqb4IAYEg3Um3pt7f7nOt9sS_q9D3h7gpehhPrY7SREZXgE/exec");
    
    document.getElementById("waittxt").innerText = "データ変換中"
    
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
    
    document.getElementById("waittxt").innerText = "データ表示中"

    document.getElementById("yvalue").innerText = yakkyvalue[13];
    document.getElementById("gvalue").innerText = Math.round((yakkyvalue[13] / 16 * 100)) / 100;
    document.getElementById("lastvalue").innerText = Math.round(yakkyvalue[13] / yakkyvalue[12] * 10000) / 100 + "%";
    document.getElementById("ate").innerText = yakisobas[13];
    document.getElementById("late").innerText = yoreis[13];

    document.getElementById("waittxt").innerText = "グラフ描画中";

    if (window.outerWidth < 512) {
        let graphticks = "2";
    } else {
        let graphticks = "1";
    }

    let hit = Number(window.outerWidth / 100)

    var yakky = new Chart(yakkyctx, {
        type: 'line',
        data: {
            labels:days,
            datasets: [{
                    label: '焼きそばを食べた人数',
                    data: yakisobas,
                    borderColor: "#349354ff",
                    borderWidth: "5",
                    borderJoinStyle: "round",
                    backgroundColor: "#ffffff00",
                    pointBackgroundColor: "#349354ff",
                    lineTension: 0,
                    pointRadius: 3,
                    pointHoverRadius: 8,
                    pointHitRadius: hit,
                    yAxisID: "other",
                },{
                    label: '予鈴遅刻の人数',
                    data: yoreis,
                    borderColor: "#347193ff",
                    borderWidth: "5",
                    borderJoinStyle: "round",
                    backgroundColor: "#ffffff00",
                    pointBackgroundColor: "#347193ff",
                    lineTension: 0,
                    pointRadius: 3,
                    pointHoverRadius: 8,
                    pointHitRadius: hit,
                    yAxisID: "other",
                },
                {
                    label: 'やっきー相場',
                    data: yakkyvalue,
                    borderColor: "#ff0000ff",
                    borderWidth: "5",
                    borderJoinStyle: "round",
                    backgroundColor: "#ffdddd88",
                    pointBackgroundColor: "#ff0000ff",
                    lineTension: 0,
                    pointRadius: 3,
                    pointHoverRadius: 8,
                    pointHitRadius: hit,
                    yAxisID: "value",
                },
            ]
        },
        
        options: {
            responsive: true,
            maintainAspectratio: false,
            scales: {
                yAxes: [{
                    id: "value",
                    position: "left",
                    ticks: {
                        min: 0,
                        max: 80,
                        stepSize: graphticks,
                    },
                },{
                    id: "other",
                    position: "right",
                    ticks: {
                        min: 0,
                        max: 8,
                        stepSize: graphticks,
                    },
                },],

                y: {
                    beginAtZero: true,
                },
            },
        },
    })

    document.getElementById("waitbox").style.display = "none";
}

loadData();
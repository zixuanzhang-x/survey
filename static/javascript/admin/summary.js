document.addEventListener('DOMContentLoaded', function () {
    $.ajax({
        url: '/api/results',
        data: {
            reverse: true,
        },
        success: function (result) {
            extractTimeseriesData(result);
            setupCharts(
                extractDayData(result),
                extractTimeData(result),
                extractInfoData(result),
                extractTimeseriesData(result)
            );
            let commentList = document.querySelector('#commentList');
            result.forEach((item) => {
                if (item['info'] !== null) {
                    var node = document.createElement('LI'); 
                    var textnode = document.createTextNode(`${item['nickname']} says: ${item['info']}`);
                    node.appendChild(textnode); // Append the text to <li>
                    commentList.appendChild(node);
                }
            });
        },
    });
});

let extractDayData = (result) => {
    let dayData = new Array(7);
    dayData.fill(0);
    result.forEach((item) => {
        if (item['best_day'] === 'Monday') {
            dayData[0]++;
        } else if (item['best_day'] === 'Tuesday') {
            dayData[1]++;
        } else if (item['best_day'] === 'Wednesday') {
            dayData[2]++;
        } else if (item['best_day'] === 'Thursday') {
            dayData[3]++;
        } else if (item['best_day'] === 'Friday') {
            dayData[4]++;
        } else if (item['best_day'] === 'Saturday') {
            dayData[5]++;
        } else {
            dayData[6]++;
        }
    });
    return dayData;
};

let extractTimeData = (result) => {
    let timeData = new Array(4);
    timeData.fill(0);
    result.forEach((item) => {
        if (item['best_time'] === 'Morning') {
            timeData[0]++;
        } else if (item['best_time'] === 'Afternoon') {
            timeData[1]++;
        } else if (item['best_time'] === 'Evening') {
            timeData[2]++;
        } else {
            timeData[3]++;
        }
    });
    return timeData;
};

let extractInfoData = (result) => {
    let count = 0;
    result.forEach((item) => {
        if (item['info'] !== null) {
            count++;
        }
    });
    return [count, result.length - count];
};

let extractTimeseriesData = (result) => {
    // let endDate = Date.parse(result[0]['timestamp']);
    // let startDate = Date.parse(result[result.length - 1]['timestamp']);
    let map = {};
    result.forEach((item) => {
        let date = moment(Date.parse(item['timestamp'])).startOf('day');
        if (map.hasOwnProperty(date)) {
            map[date] += 1;
        } else {
            map[date] = 1;
        }
    });

    let date = moment(
        Date.parse(result[result.length - 1]['timestamp'])
    ).startOf('day');
    let timeSeriesData = [];
    while (date.isBefore(moment())) {
        if (map.hasOwnProperty(date)) {
            timeSeriesData.push({ t: date, y: map[date] });
        } else {
            timeSeriesData.push({ t: date, y: 0 });
        }
        date = date.clone().add(1, 'day').startOf('day');
    }
    return timeSeriesData;
};

let setupCharts = (dayData, timeData, infoData, timeseriesData) => {
    var bestDayCanvas = document
        .getElementById('bestDayBarChart')
        .getContext('2d');
    var bestDayBarChart = new Chart(bestDayCanvas, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
            ],
            datasets: [
                {
                    label: 'Prefered days',
                    backgroundColor: '#caaaff',
                    borderColor: '#caaaff',
                    data: dayData,
                },
            ],
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        },
    });

    var bestTimeCanvas = document
        .getElementById('bestTimeBarChart')
        .getContext('2d');
    var bestTimeBarChart = new Chart(bestTimeCanvas, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ['Morning', 'Afternoon', 'Evening', 'Night'],
            datasets: [
                {
                    label: 'Prefered times',
                    backgroundColor: '#caaaff',
                    borderColor: '#caaaff',
                    data: timeData,
                },
            ],
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        },
    });

    var sayMoreCanvas = document
        .getElementById('sayMoreBarChart')
        .getContext('2d');
    var sayMoreBarChart = new Chart(sayMoreCanvas, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ['Provided more info', 'No additional info'],
            datasets: [
                {
                    label: 'Additional info',
                    backgroundColor: '#caaaff',
                    borderColor: '#caaaff',
                    data: infoData,
                },
            ],
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        },
    });

    var timeSeriesCanvas = document
        .getElementById('timeSeriesChart')
        .getContext('2d');

    var dat_1 = {
        label: '# of responses per day',
        borderColor: '#caaaff',
        backgroundColor: '#caaaff',
        data: timeseriesData,
        type: 'line',
        pointRadius: 0,
        fill: false,
        lineTension: 0,
        borderWidth: 2,
    };
    var timeSeriesChart = new Chart(timeSeriesCanvas, {
        type: 'line',
        data: {
            datasets: [dat_1],
        },
        options: {
            scales: {
                xAxes: [
                    {
                        type: 'time',
                        time: {
                            unit: 'day',
                        },
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        },
    });
};

document.addEventListener('DOMContentLoaded', () => {
    fetchCovidData();
});

async function fetchCovidData() {
    try {
        const response = await fetch('/api/covid-data');
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('Error fetching COVID-19 data:', error);
    }
}

function displayData(data) {
    const dailyStatsSection = document.getElementById('daily-stats');
    
    // Display the latest data
    const latestData = data[data.length - 1];
    const statsHTML = `
        <p>Date: ${latestData.date}</p>
        <p>Total Cases: ${latestData.cases.toLocaleString()}</p>
        <p>Total Deaths: ${latestData.deaths.toLocaleString()}</p>
        <p>Total Recovered: ${latestData.recovered.toLocaleString()}</p>
    `;
    
    dailyStatsSection.innerHTML += statsHTML;
	
const dailyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    cases: [1113349, 1487671, 1565680, 1397722, 1617840, 1680373],
    deaths: [600490, 450288,349269, 262163, 208912, 380879]
};

const vaccinationData = {
    labels: ['Dose 1', 'Dose 2', 'Booster'],
    percentages: [70, 65, 40]
};

const regionData = {
    labels: ['Gauteng','KZN','Mpumalanga','Limpoopo','Northern Cape','North West', 'Free State', 'East Cape', 'Western Cape'],
    cases: [1196591, 653945, 191835, 108471,191473, 201176,343779,642153,]
};

// Daily Cases and Deaths Chart
const dailyStatsCtx = document.getElementById('dailyStatsChart').getContext('2d');
new Chart(dailyStatsCtx, {
    type: 'line',
    data: {
        labels: dailyData.labels,
        datasets: [
            {
                label: 'Cases',
                data: dailyData.cases,
                borderColor: 'blue',
                tension: 0.1
            },
            {
                label: 'Deaths',
                data: dailyData.deaths,
                borderColor: 'red',
                tension: 0.1
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Vaccination Progress Chart
const vaccinationCtx = document.getElementById('vaccinationChart').getContext('2d');
new Chart(vaccinationCtx, {
    type: 'bar',
    data: {
        labels: vaccinationData.labels,
        datasets: [{
            label: 'Vaccination Progress',
            data: vaccinationData.percentages,
            backgroundColor: 'green'
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});

// Region Comparison Chart
const regionCtx = document.getElementById('regionComparisonChart').getContext('2d');
new Chart(regionCtx, {
    type: 'pie',
    data: {
        labels: regionData.labels,
        datasets: [{
            label: 'Cases by Region',
            data: regionData.cases,
            backgroundColor: [
                'red', 'blue', 'green', 'yellow','purple','teal','orange','black','pink',
            ]
        }]
    },
    options: {
        responsive: true
    }
});
    console.log('COVID-19 Data:', data);
}

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
    
    // Here, you would typically create charts using a library like Chart.js
    // For now, we'll just log the data to the console
    console.log('COVID-19 Data:', data);
}
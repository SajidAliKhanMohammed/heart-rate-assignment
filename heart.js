const fs = require('fs');

// Read input JSON file
const rawData = fs.readFileSync('heartrate.json');
const heartRateData = JSON.parse(rawData);

// Function to calculate statistics for a given day's data
function calculateStats(data) {
    // Your code to calculate min, max, median, and latestDataTimestamp
    const bpmValues = data.map(entry => entry.bpm); // Extract BPM values from data
    const min = Math.min(...bpmValues);
    const max = Math.max(...bpmValues);
    const sortedBPM = bpmValues.sort((a, b) => a - b);
    const median = sortedBPM.length % 2 === 0 ? (sortedBPM[sortedBPM.length / 2 - 1] + sortedBPM[sortedBPM.length / 2]) / 2 : sortedBPM[Math.floor(sortedBPM.length / 2)];
    const latestDataTimestamp = data[data.length - 1].timestamp;  
    return { min, max, median, latestDataTimestamp };
}

// Process data for each day and calculate statistics
const processedData = heartRateData.map(dayData => ({
    date: dayData.date,
    ...calculateStats(dayData.measurements)
}));

// Write output to JSON file
fs.writeFileSync('output.json', JSON.stringify(processedData, null, 2));

console.log('Output file "output.json" created successfully.');

let myChart = null;

const dropdown = document.getElementById('dropDown');

dropdown.addEventListener('change', function (event) {
  const selectedValue = event.target.value;
  switch (selectedValue) {
    case 'Gait Speed': displayGaitSpeedGraph(); break;
    case 'Stride Length': displayStrideLengthGraph(); break;
    case 'Symmetry': displaySymmetryGraph(); break;
    case 'Foot Clearance': displayFootClearanceGraph(); break;
    default: clearGraph();
  }
});

function createChart(config) {
  if (myChart) myChart.destroy();
  const ctx = document.getElementById('myChart').getContext('2d');
  config.options = { animation: { duration: 1000 } };
  myChart = new Chart(ctx, config);
}

function showLineChart(label, data) {
  createChart({
    type: 'line',
    data: {
      labels: data.map((_, i) => `T${i}`),
      datasets: [{
        label: label,
        data: data,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4
      }]
    }
  });
}

function showBarChart(label, data) {
  createChart({
    type: 'bar',
    data: {
      labels: data.map((_, i) => `T${i}`),
      datasets: [{
        label: label,
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.5)'
      }]
    }
  });
}

function displayGaitSpeedGraph() { showLineChart("Gait Speed m/s", mockData); }
function displayStrideLengthGraph() { showBarChart("Stride Length (m)", mockData); }
function displaySymmetryGraph() { showLineChart("Symmetry", mockData); }
function displayFootClearanceGraph() { showBarChart("Foot Clearance (cm)", mockData); }

function clearGraph() {
  if (myChart) {
    myChart.destroy();
    myChart = null;
  }
}

const mockData = [1.2, 1.4, 1.1, 1.3, 1.5]; // Placeholder data

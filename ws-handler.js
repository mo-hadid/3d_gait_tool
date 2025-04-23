let connectionStatus = document.getElementById("connectionStatus");
let liveData = [];

const ws = new WebSocket('ws://35.138.26.165:8765');

ws.onopen = () => {
  console.log('✅ Connected');
  connectionStatus.textContent = '🟢 Connected to device';
  connectionStatus.classList.add("connected");
};

ws.onmessage = (event) => {
  const value = parseFloat(event.data);
  if (!isNaN(value)) {
    liveData.push(value);
    if (liveData.length > 20) liveData.shift(); // Limit data
    updateLiveGraph(liveData);
  }
};

ws.onerror = () => {
  connectionStatus.textContent = '🔴 Error connecting';
  connectionStatus.classList.add("error");
};

ws.onclose = () => {
  connectionStatus.textContent = '🔴 Disconnected';
};

function updateLiveGraph(data) {
  if (myChart) {
    myChart.data.datasets[0].data = data;
    myChart.data.labels = data.map((_, i) => `T${i}`);
    myChart.update();
  }
}

document.getElementById('print-report-button').addEventListener('click', () => {
  const canvas = document.getElementById('myChart');
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  pdf.text("Gait Analysis Report", 20, 20);
  pdf.addImage(canvas.toDataURL("image/png"), 'PNG', 10, 30, 180, 100);
  pdf.save('gait_report.pdf');
});

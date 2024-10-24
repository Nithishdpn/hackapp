import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as XLSX from 'xlsx';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
function login(username, password) {
  if (username === 'usrname' && password === 'admin') {
    alert('Login successful');
  } else {
    alert('Login failed');
  }
}
function importExcel(file) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(worksheet);
    console.log(json);
  };
  reader.readAsArrayBuffer(file);
}

function analyzeExcelSheet(file) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(worksheet);
    
    // Perform analysis on the JSON data
    const analysis = json.reduce((acc, row) => {
      // Example analysis: count occurrences of a specific value in a column
      const value = row['ColumnName']; // Replace 'ColumnName' with the actual column name
      if (value) {
        acc[value] = (acc[value] || 0) + 1;
      }
      return acc;
    }, {});

    console.log(analysis);
  };
  reader.readAsArrayBuffer(file);
}

function exportExcel() {
  const data = [
    { Name: 'John Doe', Age: 30 },
    { Name: 'Jane Doe', Age: 25 },

  ];

  const worksheet = XLSX.utils.json_to_sheet(data);   

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  XLSX.writeFile(workbook, 'data.xlsx');
}
export default App

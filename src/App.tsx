import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './router/AppRouter';
import Header from './components/Header';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,

} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { data } from './pages/CurrencyDetails';
import "chart.js/auto";

/*
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,

);
*/

function App() {
  return (
    <div className="">

      <div className='w-50 h-75 text-center justify-self-center' >
        <Line data={data} />
      </div>


      <Header />
      <AppRouter />
    </div>
  );
}

export default App;

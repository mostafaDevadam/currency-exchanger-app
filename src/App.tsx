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
  BarController,
  TimeScale,
} from 'chart.js';
import "chart.js/auto";


import { ReactChart } from 'chartjs-react';
import 'chartjs-adapter-moment'
import { enUS } from 'date-fns/locale'
ReactChart.register(BarController, CategoryScale, LinearScale, BarElement, TimeScale, Tooltip);

function App() {
  return (
    <div className="">
      <Header />
      <AppRouter />
    </div>
  );
}

export default App;

import React from 'react'
import {
    BarController,
    LinearScale,
    BarElement,
    TimeScale,
    Tooltip,
    ChartOptions,
    ChartData,
    ChartType,
    Chart,
    CategoryScale,

} from 'chart.js';
import { ReactChart } from 'chartjs-react';


interface Prop {
    chartType?: ChartType | string | any,
    data?: ChartData | any,
    chartOption: ChartOptions,

}

const ChartCore = ({ chartType, data, chartOption }: Prop) => {

    return (
        <ReactChart
            type={chartType}
            data={data}
            options={chartOption}
        />
    )
}

export default ChartCore

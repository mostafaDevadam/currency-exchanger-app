import React, { useState, useEffect, } from 'react'
import { Button, Form, FormControl, Nav, Navbar, Image, Container, Row, Col, } from 'react-bootstrap'
import CurrencyConvertingCard from './ui-components/CurrencyConvertingCard'
import { useLocation, useNavigate } from 'react-router-dom'
import { getFluctuation } from '../services/api/api_layer/getFlut'
import 'chart.js/auto';

import {
    BarController,
    LinearScale,
    BarElement,
    TimeScale,
    Tooltip,
    ChartOptions,
    ChartData,
    Chart,
    CategoryScale,

} from 'chart.js';
import { ReactChart } from 'chartjs-react';
import ChartCore from '../components/ChartCore'



const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const chartOption: ChartOptions = {
    scales: {
        x: {
            type: 'category',
            //display: true,
        },
        y: {
            type: 'linear',
        },
    },
};

const data_chart: ChartData = {
    //xLabels: ["January", "February", "March", "April", "May", "June", "Juli"],
    //yLabels: ['five', 'ten', 'five', 'two', 20, 30, 45, 50, 60],
    labels: labels,
    datasets: [
        {
            label: "My First dataset",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: [5, 10, 5, 2, 20, 30, 45, 50, 60, 70],
            hoverBackgroundColor: 'green',


        },
    ],
};

const CurrencyDetails = () => {
    const { state } = useLocation()
    const { data } = state

    const [chartData, setChartData] = useState(data);

    const navigate = useNavigate()

    useEffect(() => {
        fetchHistorical()
    }, [])

    const fetchHistorical = async () => {
        const fluct = await getFluctuation()
        console.log('result fluct:', fluct)
    }

    const handleToBack = (e: any) => {
        navigate('/')
    }


    return (
        <div>

            <Container>
                <div className="d-flex flex-row justify-content-between mt-2">
                    <div className='mt-2 mb-2 text-start'>
                        CurrencyDetails
                    </div>
                    <div className=''>
                        <Button onClick={handleToBack}>Back to Home</Button>

                    </div>
                </div>
                <CurrencyConvertingCard />
                <div className='mt-3 border'>
                    <Container>
                        <Row className='justify-content-center'>
                            <div className='w-50 h-75 text-center justify-self-center' >
                                <ChartCore chartType={'bar'} data={data_chart} chartOption={chartOption} />
                            </div>
                        </Row>
                    </Container>
                </div>
            </Container>
        </div>
    )
}

export default CurrencyDetails;

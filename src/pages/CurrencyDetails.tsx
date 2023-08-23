import React, { useState, useEffect, } from 'react'
import { Button, Form, FormControl, Nav, Navbar, Image, Container, Row, Col, } from 'react-bootstrap'
import CurrencyConvertingCard from './components/CurrencyConvertingCard'
import { useLocation, useNavigate } from 'react-router-dom'
import { getFluctuation } from '../services/api/api_layer/getFlut'
import 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';




const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            id: 'data1',
            data: [0, 10, 20, 30, 40, 50, 60, 70], //faker.datatype.number({ min: -1000, max: 1000 })),
            backgroundColor: 'rgb(255, 99, 132)',
            stack: 'Stack 0',
        },
    ],
};

export const Data = [
    {
        id: 1,
        year: 2016,
        userGain: 80000,
        userLost: 823
    },
    {
        id: 2,
        year: 2017,
        userGain: 45677,
        userLost: 345
    },
    {
        id: 3,
        year: 2018,
        userGain: 78888,
        userLost: 555
    },
    {
        id: 4,
        year: 2019,
        userGain: 90000,
        userLost: 4555
    },
    {
        id: 5,
        year: 2020,
        userGain: 4300,
        userLost: 234
    }
];

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
                        <Row>
                            chart
                            <div className='w-50 h-75 text-center justify-self-center' >

                            </div>
                        </Row>
                    </Container>
                </div>
            </Container>
        </div>
    )
}

export default CurrencyDetails
/*
export const BarChart = ({ chartData }: any) => {
    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
            <Bar
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Users Gained between 2016-2020"
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </div>
    );
};
*/

import React, { useEffect, useState, } from 'react'
import { getLatest } from '../services/api/fixer_api/getLatest'
import { getSymbols } from '../services/api/fixer_api/getSymbols'
import { getConvertCurrency } from '../services/api/api_layer/getConvertCurrency'
import { Button, Form, FormControl, Nav, Navbar, Image, Container, Row, Col, } from 'react-bootstrap'
import { ImArrowLeft, ImArrowRight } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'


export type POPULAR_TYPE = {
    code?: string
    value?: any
}

const popular: POPULAR_TYPE[] = [
    { code: 'USD', value: 0 },
    { code: 'EUR', value: 0 },
    { code: 'JPY', value: 0 },
    { code: 'GBP', value: 0 },
    { code: 'CNY', value: 0 },
    { code: 'AUD', value: 0 },
    { code: 'CAD', value: 0 },
    { code: 'CHF', value: 0 },
    { code: 'HKD', value: 0 },
    { code: 'SGD', value: 0 },
    { code: 'SEK', value: 0 },
    { code: 'KRW', value: 0 }
]

const Home = () => {

    const [fromState, setFromState] = useState<any>("EUR")
    const [toState, setToState] = useState<any>("USD")
    const [isChanged, setIsChanged] = useState<boolean>(false)
    const [amount, setAmount] = useState<any>(1)
    const [symbols, setSymbols] = useState<any>()

    const [result, setResult] = useState<any>()
    const [defaultResult, setDefaultResult] = useState<any>()
    const [popularSymbols, setPopularSymbols] = useState<POPULAR_TYPE[]>(popular)

    const navigate = useNavigate()




    useEffect(() => {
        findLatest()
    }, [])

    useEffect(() => {
        if (fromState && toState) {
            const converted = convert(fromState, toState, 1)
            converted.then(th => {
                console.log('converted: ', th)
                setDefaultResult(th)
                // popular
                for (let item of popularSymbols) {
                    const conv = convert(fromState, item.code, amount)
                    conv.then(th => item.value = th)
                }
            })
        }
    }, [defaultResult, fromState, toState])

    useEffect(() => {
        if (amount === 1) {
            const converted = convert(fromState, toState, amount)
            converted.then(th => {
                console.log('converted: ', th)
                setResult(th)
            })
        }

    }, [amount, fromState, toState])

    const findLatest = async () => {
        const res = await getLatest()
        const currency = await getSymbols()
        console.log("currency:", currency["symbols"])
        setSymbols(currency["symbols"])
        //const convert = await getConvertCurrency('EUR', 'USD', 75)
    }

    const convert = async (from: any, to: any, amount_: any) => {
        const convert_ = await getConvertCurrency(from, to, amount_)
        return convert_['result']
    }
    const handleConvert = (e: any) => {
        e.preventDefault()
        //setResult(convert(fromState, toState, amount))

        const converted = convert(fromState, toState, amount)
        converted.then(th => {
            console.log('currency converted: ', th)
            setResult(th)
            for (let item of popularSymbols) {
                const conv = convert(fromState, item.code, amount)
                conv.then(th => item.value = th)
            }
        })


    }

    const handleChangeAmount = (e: any) => {
        e.preventDefault()
        setAmount(e.target.value)

    }

    const handleSwitchButton = (e: any) => {
        e.preventDefault()
        console.log('switch : ', fromState, toState)
        let temp = fromState
        setFromState(toState)
        setToState(temp)
        temp = ''
        setIsChanged(true)

    }

    const handleSelectFrom = (e: any) => {
        e.preventDefault()
        console.log('handleSelectFrom:', e.target.name, e.target.value)
        setFromState(e.target.value)
    }
    const handleSelectTo = (e: any) => {
        e.preventDefault()
        console.log('handleSelectTo:', e.target.name, e.target.value)
        setToState(e.target.value)

    }
    const navToDetails = (e: any) => {
        const symbol = symbols[fromState]
        const filt = Object.keys(symbols).find((v, i, arr) => v == "EUR")
        console.log('symbol:', symbol, filt)

        navigate('/details/2', { state: { data: { symbols, symbol, popularSymbols, amount, from: fromState, defaultResult, to: toState, result, } } })
    }

    return (
        <Container >

            <Row className='mt-3 border border-primary pb-3'>

                <div className='d-flex flex-column'>
                    <div className='d-flex flex-row justify-content-between'>
                        <Form className='d-flex flex-row justify-content-between'>
                            <Form.Group>
                                <Form.Label>Amount</Form.Label>
                                <Form.Control type='number' placeholder="1" defaultValue={1} onChange={handleChangeAmount} />
                            </Form.Group>

                            <Form.Group controlId="from" className='ms-5'>
                                <Form.Label>From</Form.Label>
                                <Form.Select defaultValue="Choose..." onChange={handleSelectFrom} name="from" >
                                    <option>Choose...</option>
                                    {/*isChanged && <option selected={isChanged} value={fromState}>{fromState}</option>*/}
                                    <option selected={fromState && isChanged ? true : false} value={fromState && fromState}>{fromState && fromState}</option>

                                    {symbols && Object.keys(symbols).map((m: any, i: number) =>
                                    (<option selected={m === fromState} value={m === fromState ? fromState : m} key={i} defaultValue={m === "EUR" && m}>
                                        {m === fromState ? fromState : m}</option>))}

                                </Form.Select>
                            </Form.Group>

                            <span className='ms-5 me-3 mt-4' onClick={handleSwitchButton}>
                                <ImArrowLeft size={20} className='mt-3' />
                                <ImArrowRight size={20} className='mt-3' />
                            </span>


                            <Form.Group controlId="to" className='ms-5'>
                                <Form.Label>To</Form.Label>
                                <Form.Select defaultValue="Choose..." onChange={handleSelectTo} name="to">
                                    <option>Choose...</option>
                                    {/*isChanged && <option selected={isChanged} value={toState}>{toState}</option>*/}
                                    <option selected={toState && isChanged ? true : false} value={toState && toState}>{toState && toState}</option>


                                    {symbols && Object.keys(symbols).map((m: any, i: number) =>
                                    (<option selected={m === toState} value={m === toState ? toState : m} key={i} defaultValue={m === "EUR" && m}>
                                        {m === toState ? toState : m}</option>))}
                                </Form.Select>
                            </Form.Group>

                        </Form>



                    </div>
                    <div className='d-flex flex-row justify-content-end'>
                        <Button onClick={handleConvert}>Convert</Button>
                    </div>
                    <div className='d-flex flex-row justify-content-between mt-3'>

                        <div className='border border-primary rounded-0 ps-5 pe-5 p-1 text-center align-self-center'>
                            1.00 {fromState} = {defaultResult} {toState}
                        </div>
                        <div className='border border-primary rounded-0 ps-5 pe-5 p-3 text-center align-self-center'>
                            {result} {toState}
                        </div>
                        <div>
                            <Button className='' onClick={navToDetails}>More Details</Button>
                        </div>
                    </div>
                </div>
            </Row>
            <Row className='mt-3 border border-secondary pb-3 '>

                <div className="d-flex flex-wrap pt-1 p-0 gap-3 mt-4">
                    {popularSymbols.map((m, i) => (

                        // ((m.code !== fromState && m.code !== toState) && i !== 9) &&

                        (m.code !== fromState && m.code !== toState && i !== 9) &&

                        <div key={i}
                            className='border border-primary p-0 pb-3 mb-1 ms-1 me-1 text-center'
                            style={{ flexGrow: 1, width: "30%" }}>


                            {m.value} {m.code}
                        </div>
                    ))}

                </div>

            </Row>

        </Container>

    )
}

export default Home

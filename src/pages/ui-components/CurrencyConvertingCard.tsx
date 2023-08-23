import React, { useState, useEffect, } from 'react'
import { Button, Form, FormControl, Nav, Navbar, Image, Container, Row, Col, } from 'react-bootstrap'
import { ImArrowLeft, ImArrowRight } from 'react-icons/im'
import { useLocation, useParams } from 'react-router-dom'
import { getSymbols } from '../../services/api/fixer_api/getSymbols'
import { getConvertCurrency } from '../../services/api/api_layer/getConvertCurrency'


const CurrencyConvertingCard = () => {

    const { state } = useLocation()
    const { data } = state

    const [fromState, setFromState] = useState<any>(data.from)
    const [toState, setToState] = useState<any>(data.to)
    const [isChanged, setIsChanged] = useState<boolean>(false)
    const [amount, setAmount] = useState<any>(data.amount)
    const [symbols, setSymbols] = useState<any>(data.symbols)

    const [result, setResult] = useState<any>(data.result)
    const [defaultResult, setDefaultResult] = useState<any>(data.defaultResult)

    const [currencyName, setCurrencyName] = useState<any>()


    useEffect(() => {
        findLatest()
    }, [])


    useEffect(() => {
        if (fromState && toState) {
            const converted = convert(fromState, toState, 1)
            converted.then(th => {
                console.log('converted: ', th)
                setDefaultResult(th)

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

    const getFromState = () => {
        const from = Object.keys(symbols).findIndex((m: any) => m === fromState && symbols[m] === fromState)
        console.log('from: ', from, symbols[fromState])
        setCurrencyName(symbols[fromState])
    }

    const handleSelect = (e: any) => {
        e.preventDefault()
        //setCurrencyName()
    }


    return (
        <div>
            <Container>
                {symbols[fromState] === 'EURO' ? symbols[fromState] + ' - European Union Euro' : symbols[fromState]}
                <Row className=' border border-primary pb-3 '>
                    <Col className='ms-2'>
                        <Row className=''>
                            <Form.Group>
                                <Form.Label>Amount</Form.Label>
                                <Form.Control type='number' placeholder="1" defaultValue={1} value={data.amount} onChange={handleChangeAmount} />
                            </Form.Group>
                        </Row>
                        <Row className='align-self-end mt-5'>
                            <Col className='border border-primary'>
                                <div className='mt-5 text-center'>
                                    1.00 {fromState} = {defaultResult} {toState}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col >
                        <Row className='ms-2'>
                            <Col className='col-5'>
                                <Form.Group controlId="from" className='ms-5'>
                                    <Form.Label>From</Form.Label>
                                    <Form.Select defaultValue="Choose..." onChange={handleSelectFrom} name="from" >
                                        <option>Choose...</option>
                                        {/*isChanged && <option selected={isChanged} value={fromState}>{fromState}</option>*/}
                                        <option selected={fromState && isChanged ? true : false} value={fromState && fromState}>{fromState && fromState}</option>

                                        {symbols && Object.keys(symbols).map((m: any, i: number) =>
                                        (<option selected={m === fromState} value={m === fromState ? fromState : m} key={i} defaultValue={m === fromState && m}>
                                            {m === fromState ? fromState : m}</option>))}

                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col className='col-2 mt-4'>
                                <span className=' me-3 mt-4' onClick={handleSwitchButton}>
                                    <ImArrowLeft size={20} className='mt-3' />
                                    <ImArrowRight size={20} className='mt-3' />
                                </span>
                            </Col>
                            <Col className='col-5'>
                                <Form.Group controlId="to" className='ms-5'>
                                    <Form.Label>To</Form.Label>
                                    <Form.Select defaultValue="Choose..." onChange={handleSelectTo} name="to">
                                        <option>Choose...</option>
                                        {/*isChanged && <option selected={isChanged} value={toState}>{toState}</option>*/}
                                        <option selected={toState && isChanged ? true : false} value={toState && toState}>{toState && toState}</option>

                                        {symbols && Object.keys(symbols).map((m: any, i: number) =>
                                        (<option onSelect={handleSelect} selected={m === toState} value={m === toState ? toState : m} key={i} defaultValue={m === toState && m}>
                                            {m === toState ? toState : m}</option>))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='align-items-end mt-3 ms-4 me-2 '>
                            <Button className='me-2'>Convert</Button>
                        </Row>
                        <Row className='mt-3 me-2 ms-4 align-items-end '>
                            <div className='border border-primary pt-3 pb-3 text-center'>
                                {result} {toState}
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CurrencyConvertingCard

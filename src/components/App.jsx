import React, { useState, useEffect }  from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Container,Row,Col } from "react-bootstrap";
import {Button, Icon} from 'semantic-ui-react'


function App(){
    // main object that would display the currency values
    const [val, setVal] = useState({
        amount: "",
        convertedAmount: ""
    });
    // the object that contains the currency rates for conversion
    const [currency, setCurrency] = useState({
        fromRate: 1,
        toRate: 1
    })

    // stores the conversion rates of all currencies
    const [rates, setRates] = useState([])

    function changeVal(event){
        const value = event.target.value
        if (isNaN(value)){
            setVal(prev => {
                return {
                    amount: "",
                    convertedAmount: prev.convertedAmount
                }
            })
        }else{
            setVal(prev => {
                return {
                    amount: value,
                    convertedAmount: prev.convertedAmount
                }
            })
        }
    }

    function convert(){
        const value = val.amount
        console.log(value)
        if (isNaN(value) || value == ""){
            setVal(prev => {
                return {
                    amount: "",
                    convertedAmount: ""
                }
            })
        }else{
            const convertedValue = ((value/(currency.fromRate))*currency.toRate).toFixed(2)
            setVal(prev => {
                return {
                    amount: prev.amount,
                    convertedAmount: convertedValue
                }
            })
        }
    }

    function changeCurrency(event){
        const name = event.target.name
        if(name == "tocurrency"){
            const value = document.getElementById("tocurrency").value;
            console.log(value)
            setCurrency(prev => {
                return {
                    fromRate: prev.fromRate,
                    toRate: value
                }
            })
        }else if(name == "fromcurrency"){
            const value = document.getElementById("fromcurrency").value;
            console.log(value)
            setCurrency(prev => {
                return {
                    fromRate: value,
                    toRate: prev.toRate
                }
            })
        }
    }

    // Gets the conversion rates with EUR as base currency
    useEffect(() => {
        fetch('https://api.vatcomply.com/rates')
          .then(results => results.json())
          .then(data => {
            setRates(data.rates);
          });
    },[]);

    return(
        <div>
            <Header />
            <Container>
                <Row>
                    <Col sm={5}>
                        <Row>
                            <Col sm={12}>
                            <div className="selectcurrency from">
                                <select name="fromcurrency" id="fromcurrency" className="currency" onChange={changeCurrency}>
                                    {
                                        Object.keys(rates).map((key,value)=>(
                                            <option value={rates[key]}>{key}</option>

                                        ))
                                    }
                                </select>
                            </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <div className="box from">
                                    <input type="number" min="0.01" step="0.01" onChange={changeVal} value={val.amount} placeholder="Enter Amount" />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={2} id="button">
                        <div className="d-flex justify-content-center">
                            <Button icon id="arrowButton" onClick={convert}>
                                <Icon name="right arrow" id="arrowIcon" size="huge" color="black"></Icon>
                            </Button>
                        </div>
                        
                    </Col>
                    <Col sm={5}>
                    <Row>
                            <Col sm={12}>
                                <div className="selectcurrency to">
                                    <select name="tocurrency" id="tocurrency" className="currency" onChange={changeCurrency}>
                                        {
                                            Object.keys(rates).map((key,rate)=>(
                                                <option value={rates[key]}>{key}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <div className="box to">
                                    <input value={val.convertedAmount} placeholder="Conversion" />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default App;
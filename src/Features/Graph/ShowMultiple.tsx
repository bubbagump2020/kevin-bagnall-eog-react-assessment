import React, { useState } from 'react'
import { IState } from '../../store'
import { useSelector } from 'react-redux'
import { Line } from 'recharts'
import { useQuery } from 'urql'
import { GET_MULTIPLE_QUERY, MEASUREMENTS_QUERY } from './Queries'

const getSelectedMetrics = ( state: IState ) => {
    const selectedMetrics = state.metric.selectedMetrics
    return { selectedMetrics }
}
const getLastKnownMeasurement = (state: IState) => {
    const lastMeasurement = state.metric.lastMeasurement
    return { lastMeasurement }
}

const ShowMultiple = () => {

    // const { selectedMetrics } = useSelector(getSelectedMetrics)
    // const { lastMeasurement } = useSelector(getLastKnownMeasurement)
    // const [ measurementArray, setMeasurementArray ] = useState([] as any)
    // const timeLimit = new Date()
    // const dataInput = {
    //     metricName: '',
    //     after: Date.now() - 1800000,
    //     before: timeLimit.getTime() - 10000,
    // }
    // const dataArray = [] as any

    // how to create the array of input/measurements? Function?

    // const createInput = () => {
    //     selectedMetrics.map((metric: string) => {
    //         dataInput.metricName = metric
    //         dataArray.push(dataInput)
    //         console.log(dataArray)
    //     })
    // }

    // const testArray = [
    //     {
    //         metricName: "waterTemp",
    //         after: Date.now() - 1800000,
    //         before: Date.now() - 10000,
    //     },
    //     { 
    //         metricName: "oilTemp",
    //         after: Date.now() - 1800000,
    //         before: Date.now() - 10000,
    //     }
    // ]


    // const input = {
    //     metricName: lastMeasurement.metric,
    //     after: lastMeasurement.at - 1800000,
    //     before: timeLimit.getTime() - 10000,
    // }

    // const [result] = useQuery({
    //     query: MEASUREMENTS_QUERY,
    //     variables: {
    //         input,
    //     },
    //     pause: !lastMeasurement.metric,
    // })

    // measurements needs to be an array of the object below
    // measurements: {
    //     metricName: lastMeasurement.metric,
    //     after: lastMeasurement.at - 1800000,
    //     before: timeLimit.getTime() - 10000,

    // const [resultMulti] = useQuery({
    //     query: GET_MULTIPLE_QUERY,
    //     variables: {
    //         selectedMetrics,
    //     },
        // pause: !lastMeasurement.metric,
    // })

    // const showMultiLines = () => {
    //     return selectedMetrics.map(metric => {
    //         return(
    //             <div>
    //                 {/* <Line datakey="value">

    //                 </Line> */}
    //             </div>
    //         )
    //     })

    // console.log(void createInput())
    // console.log(result)
    return(
        <div>
            {/* {void createInput()}  */}
        </div>
    )
}

export default ShowMultiple;

/*
    breakdown of graphql schema of getMeasurements
    
    getMeasurements(input:MeasurementQuery):[Measurement]

    type Measurement{
        metric: String!
        at: Timestamp!
        value: Float!
        unit: String!
    }

    arguments

    input: MeasurementQuery

    type MeasurementQuery{
        metricName: String!
        after: Timestamp
        before: Timestamp
    }

    =====
    notes
    =====

    [Measurement] is what is being returned from the query

    =========
    end notes
    =========

    ======================
    properly written query
    ======================

    

*/

/*

    breakdown of graphql schema of getMultipleMeasurement

    getMultipleMeasurements(input:[MeasurementQuery]):[MultipleMeasurements]

    type MultipleMeasurements {
        metric: String!
        measurements: [Measurement]
    }

    Arguments

    input: [MeasurementQuery]

    =====
    notes
    =====

    measurements is an array of Measurements as defined in getMeasurements
    the input is not just a MeasurementQuery but an array of MeasurementQuery
    [MultipleMeasurements] is the return data

    =========
    end notes
    =========

    =======================
    Properly written query?
    =======================

    
    const MeasurementQuery = {
        metricName
        after
        before
    }

    const input = [MeasurementQuery, MeasurementQuery]

    const [result] = useQuery({
        query: GET_MULTIPLE,
        variables: {
            input
        }
    })



*/
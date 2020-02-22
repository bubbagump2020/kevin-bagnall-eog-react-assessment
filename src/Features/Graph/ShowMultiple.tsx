import React, { useState } from 'react'
import { IState } from '../../store'
import { useSelector } from 'react-redux'
import { Line } from 'recharts'
import { useQuery } from 'urql'
import { GET_MULTIPLE_QUERY } from './Queries'

const getSelectedMetrics = ( state: IState ) => {
    const selectedMetrics = state.metric.selectedMetrics
    return { selectedMetrics }
}
const getLastKnownMeasurement = (state: IState) => {
    const lastMeasurement = state.metric.lastMeasurement
    return { lastMeasurement }
}

const ShowMultiple = () => {

    const { selectedMetrics } = useSelector(getSelectedMetrics)
    const { lastMeasurement } = useSelector(getLastKnownMeasurement)
    const timeLimit = new Date()

    const input = {
        metric: lastMeasurement.metric,
        measurements: {
            metricName: lastMeasurement.metric,
            after: lastMeasurement.at - 1800000,
            before: timeLimit.getTime() - 10000,
        } 
    }

    const [result] = useQuery({
        query: GET_MULTIPLE_QUERY,
        variables: {
            input,
        },
        pause: !lastMeasurement.metric,
    })
    // const showMultiLines = () => {
    //     return selectedMetrics.map(metric => {
    //         return(
    //             <div>
    //                 {/* <Line datakey="value">

    //                 </Line> */}
    //             </div>
    //         )
    //     })
    

    console.log(result.error)

    return(
        <div>
  
        </div>
    )
}

export default ShowMultiple;
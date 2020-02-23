import React, { useEffect } from 'react'
import moment from 'moment'

import { IState } from '../../store'
import { actions } from './reducer'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from 'urql'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { LinearProgress, Card, CardContent, Typography } from '@material-ui/core'
import { MEASUREMENTS_QUERY, GET_MULTIPLE_QUERY } from './Queries'
import ShowMultiple from './ShowMultiple'

const getLastKnownMeasurement = (state: IState) => {
        const lastMeasurement = state.metric.lastMeasurement
        return { lastMeasurement }
    }

const getMeasurements = ( state: IState ) => {
    const Measurements = state.metric.Measurements
    return { Measurements }
}

// const getSelectedMetrics = ( state: IState ) => {
//     const selectedMetrics = state.metric.selectedMetrics
//     return { selectedMetrics }
// }

const ShowChartData = () => {

    const dispatch = useDispatch()
    const { lastMeasurement } = useSelector(getLastKnownMeasurement) // the last metric selected

    const  Measurements  = useSelector(getMeasurements)
    const visualData = Measurements.Measurements

    const timeLimit = new Date()

    // need array of these for showing multiple data lines 
    const input = {
        metricName: lastMeasurement.metric,
        after: lastMeasurement.at - 1800000,
        before: timeLimit.getTime() - 10000,
    }

    const multiInput = visualData.slice(0, 99)

    const [result] = useQuery({
        // the actual query for data
        query: MEASUREMENTS_QUERY,
        variables: {
            input,
        },
        pause: !lastMeasurement.metric,
    })

    const [multiResult] = useQuery({
        query: GET_MULTIPLE_QUERY,
        variables:{
            multiInput
        },
        pause: !lastMeasurement.metric
    })

    const { data, error } = result
    useEffect(() => {
        if(error){
            console.log(error)
        }
        if (!data) return
        const measurements = data
        dispatch(actions.chartMeasurements({ getMeasurements: measurements.getMeasurements }))
    }, [dispatch, data, error])


    const loadingData = () => {
        if(!data) {
            return <LinearProgress />
        }
    }

    const tickFormatter = (ticks: any) => {
       return moment(ticks).format('HH:mm')
    }

    const renderToolTip = (data: any) => {
        if(data.payload[0] !== undefined){
            const toolTipData = (data.payload[0].payload)
            console.log(data)
            const toolTime = moment(toolTipData.at).format('MMMM do YYYY, h:mm:ss a')
            return(
                <Card>
                    <CardContent>
                        <Typography color="textSecondary">
                            {toolTime}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        {toolTipData.metric}
                    </CardContent>
                    <CardContent>
                        {`${toolTipData.value} ${toolTipData.unit}`}
                    </CardContent>
                </Card>
            )
        }
            
          
    }
    
    // console.log(visualData.slice(0, 49))
    console.log(multiResult)

    return(
        <div>
            {loadingData()}
            <ShowMultiple />
            <ResponsiveContainer width="100%" height={800}>
                <LineChart margin={{ bottom: 20 }}data={visualData.slice(0, 99)}>
                    <Line dataKey="value" type="monotone" animationEasing="ease-out" strokeWidth={4}/>
                    <XAxis
                        dataKey="at"
                        type="number"
                        interval="preserveStart"
                        tickFormatter={tickFormatter}
                        domain={['dataMin', 'dataMax']}   
                    />
                    <YAxis dataKey="value" height={10} domain={[ 0, 'dataMax' ]}/>
                    <Tooltip content={renderToolTip} animationEasing="ease-out" isAnimationActive={true}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default () => {
    return(
        <ShowChartData />
    )
}
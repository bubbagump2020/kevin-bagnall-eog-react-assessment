import React, { useEffect } from 'react'
import moment from 'moment'

import { IState } from '../../store'
import { actions } from './reducer'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from 'urql'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { LinearProgress, Card, CardHeader, CardContent, Typography } from '@material-ui/core'

const MEASUREMENTS_QUERY = `
   query($input: MeasurementQuery){
       getMeasurements(input: $input){
           metric
           at
           value
           unit
       }
   }
`

const getLastKnownMeasurement = (state: IState) => {
        const lastMeasurement = state.metric.lastMeasurement
        return { lastMeasurement }
    }

const getMeasurements = ( state: IState ) => {
    const Measurements = state.metric.Measurements
    return { Measurements }
}

const ShowChartData = () => {

    const { lastMeasurement } = useSelector(getLastKnownMeasurement)
    const  Measurements  = useSelector(getMeasurements)
    const visualData = Measurements.Measurements

    const timeLimit = new Date()
    const input = {
        metricName: lastMeasurement.metric,
        after: lastMeasurement.at - 1800000,
        before: timeLimit.getTime() - 10000,
    }

    const [result] = useQuery({
        query: MEASUREMENTS_QUERY,
        variables: {
            input,
        },
        pause: !lastMeasurement.metric,
    })

    const dispatch = useDispatch()

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
            const toolTime = moment(toolTipData.at).format('MMMM do YYYY, h:mm:ss a')
            console.log(data)
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

    
    return(
        <div>
            {loadingData()}
            <ResponsiveContainer width="100%" height={1080}>
                <LineChart margin={{ top: 20, right: 30, left: 0, bottom: 0 }} data={visualData}>
                    <Line dataKey="value" type="step" dot={false} animationEasing="ease-out" strokeWidth={4}/>
                    <XAxis
                        dataKey="at"
                        type="number"
                        interval="preserveStart"
                        tickFormatter={tickFormatter}
                        domain={['dataMin', 'dataMax']}   
                    />
                    <YAxis dataKey="value" />
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
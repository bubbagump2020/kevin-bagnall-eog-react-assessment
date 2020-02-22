import React, { useEffect } from 'react'
import moment from 'moment'

import { IState } from '../../store'
import { actions } from './reducer'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from 'urql'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts'
import { LinearProgress } from '@material-ui/core'

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

    const timeLimit = new Date()
    const input = {
        metricName: lastMeasurement.metric,
        after: lastMeasurement.at - 3600000,
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

    const { fetching, data, error } = result
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



    const visualData = Measurements.Measurements
    return(
        <div>
            {loadingData()}
            <ResponsiveContainer width="100%" height={720}>
                <LineChart margin={{ top: 20, right: 30, left: 0, bottom: 0 }} data={visualData}>
                    <Line dataKey="value" />
                    <XAxis dataKey="at" type="number" tickFormatter={tickFormatter} domain={['dataMin', 'dataMax']}/>
                    <YAxis dataKey="value" />
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
import React, { useEffect } from 'react'
import { IState } from '../../store'
import { actions } from './reducer'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery, Provider } from 'urql'
import Graph from './Graph'
import { LAST_KNOWN_MEASUREMENT_QUERY, CLIENT } from './Queries'

const getMetric = (state: IState) => {
    const { selectedMetrics } = state.metric
    return { selectedMetrics }
}

const ShowData = () => {

    const dispatch = useDispatch()
    const metricsObjectArray = useSelector(getMetric)
    const metricsArray = metricsObjectArray.selectedMetrics
    const lastKnownMetric = metricsArray[metricsArray.length - 1]


    const [result] = useQuery({
        query: LAST_KNOWN_MEASUREMENT_QUERY,
        variables: {
            metricName: lastKnownMetric,
        },
        pause: !lastKnownMetric,
        pollInterval: 1000,
        requestPolicy: 'network-only',
    })

    const { data, error} = result
    useEffect(() => {
        if(error){
            dispatch(actions.metricApiErrorReceived({ error: error.message}))
        }
        if (!data) return
        const { getLastKnownMeasurement } = data
        dispatch(actions.lastMeasurement(getLastKnownMeasurement))
    }, [dispatch, data, error])

    const showGraph = () => {
        if(metricsArray.length > 0){
            return <Graph />
        } else {
            return 
        }
    }
    
    return(
        <div>
            {showGraph()}
        </div>
    )
}



export default () => {
    return(
        <Provider value={CLIENT}>
            <ShowData />
        </Provider>
    )
}
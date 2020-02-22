import React, {useEffect, useState } from 'react'
import { FormControl, Checkbox, FormControlLabel} from '@material-ui/core'
import { actions } from './reducer'
import { createClient, Provider, useQuery } from 'urql'
import { useDispatch, useSelector } from 'react-redux'
import { IState } from '../../store'
import Chip from '../../components/Chip'
import ShowData from './ShowData'

const client = createClient({
    url: 'https://react.eogresources.com/graphql'
})

const METRICS_QUERY = `
    query{
        getMetrics
    }
`

const getOptions = (state: IState) => {
    const { metrics } = state.metric
    return { metrics }
}

const MetricSelection = () => {

    const [result] = useQuery({
        query: METRICS_QUERY
    })

    const dispatch = useDispatch()
    const {data, fetching, error} = result
    const {metrics} = useSelector(getOptions)
    const [isChecked, setIsChecked] = useState(false)


    useEffect(() => {
        if (error){
            dispatch(actions.metricApiErrorReceived({ error: error.message}))
        }
        if(!data) return
        dispatch(actions.metricTypesReceived({ metricArray: data.getMetrics}))
    }, [dispatch, data, error])

    const showMetricOptions = () => {
        if(!data || metrics.length === 0){
        } else {
            return metrics.map((metric: string) => {
                return(
                    <FormControlLabel key={metric} control={
                        <Checkbox onChange={e => handleChange(e)} value={metric}/>
                    }
                    label={metric}
                    />
                )
            })
        }
        
    }

    const handleChange = (event: any) => {
        if ( isChecked === false ){
            setIsChecked(true)
            dispatch(actions.selectedMetric({ name: event.target.value }))
        }
        if ( isChecked === true ){
            setIsChecked(false)
            dispatch(actions.selectedMetric({ name: "" }))
            dispatch(actions.lastMeasurement({ metric: "", at: 0, value: 0, unit: ""}))
        }
    }


    if (fetching) return <Chip />

    return (
        <div>
            <FormControl >
                {showMetricOptions()}
            </FormControl>
            <ShowData />
        </div>
    )
   
}

export default () => {
    return(
        <Provider value={client}>
         <MetricSelection />
        </Provider>
    )
}
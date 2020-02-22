import React, {useEffect, useState } from 'react'
import { FormControl, Checkbox, FormControlLabel, MenuItem, Select} from '@material-ui/core'
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

const getMetricName = (state: IState) => {
    const { name } = state.metric
    return {name}
}

const MetricSelection = () => {

    const [result] = useQuery({
        query: METRICS_QUERY
    })

    const dispatch = useDispatch()
    const {data, fetching, error} = result
    const {metrics} = useSelector(getOptions)
    const [ selectedMetrics, setSelectedMetrics] = useState([]) 
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
                    <MenuItem key={metric} value={metric}>{metric}</MenuItem>
                )
            })
        }
        
    }

    const handleChange = (event: any) => {
        setSelectedMetrics(event.target.value)
        dispatch(actions.selectedMetrics({ selectedMetrics: event.target.value}))
    }

    if (fetching) return <Chip />

    return (
        <div>
            <FormControl >
                <Select onChange={handleChange} value={ selectedMetrics } multiple>
                    {showMetricOptions()}
                </Select>
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
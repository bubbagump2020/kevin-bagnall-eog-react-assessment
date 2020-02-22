import React from 'react'
import { useSelector } from 'react-redux';
import { IState } from '../../store';
import { Card, Typography, CardContent } from '@material-ui/core';
import ShowChartData from './ShowChartData';

const getLastMeasurement = (state: IState) => {
    const lastMeasurement  = state.metric.lastMeasurement
    return  lastMeasurement 
}


const Graph = () => {

    const lastMeasurement = useSelector(getLastMeasurement)
    
    const renderChart = () => {
        if (lastMeasurement.metric === ""){
            return
        } else {
            return(
                <div>
                    <Card>
                        <CardContent>
                            <Typography variant="h4">
                                {`${lastMeasurement.metric}`}
                            </Typography>
                            <Typography variant="h2">
                                {`${lastMeasurement.value} ${lastMeasurement.unit}`}
                            </Typography>
                        </CardContent>
                        <ShowChartData />
                    </Card>
                </div>
            )
        }
    }

    return(
        <div>
            {renderChart()}
        </div>
    )
}


export default () => {
    return(
        <Graph />
    )
}
import { createClient } from "urql"

export const LAST_KNOWN_MEASUREMENT_QUERY = `
    query($metricName: String!){
        getLastKnownMeasurement(metricName: $metricName){
            metric
            at
            value
            unit
        }
    }
`

export const MEASUREMENTS_QUERY = `
    query($input: MeasurementQuery){
        getMeasurements(input: $input){
            metric
            at
            value
            unit
        }
    }
`

export const GET_METRICS_QUERY = `
    query{
        getMetrics
    }
`
export const GET_MULTIPLE_QUERY = `
    query($input: [MeasurementQuery]){
        getMultipleMeasurements(input: $input){
            metric
            measurements
        }
    }
`


export const CLIENT = createClient({
    url: 'https://react.eogresources.com/graphql'
})
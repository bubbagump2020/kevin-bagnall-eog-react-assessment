import { createSlice, PayloadAction } from "redux-starter-kit";

export type MetricSelection = {
  metricArray: string[];
};

export type selectedMetrics = {
  selectedMetrics: string[];
};

export type selectedMetricsAndMeasurements = {
  selectedMetricsAndMeasurements: any[];
};

export type LastKnownMeasurement = {
  metric: string;
  at: number;
  value: number;
  unit: string;
};

export type Measurements = {
  getMeasurements: Object[];
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  metrics: [] as string[],
  selectedMetrics: [] as string[],
  lastMeasurement: {
    metric: "",
    at: 0,
    value: 0.0,
    unit: ""
  },
  Measurements: [] as Object[],
  selectedMetricsAndMeasurements: [] as any[]
};

const slice = createSlice({
  name: "metric",
  initialState,
  reducers: {
    metricTypesReceived: (state, action: PayloadAction<MetricSelection>) => {
      const { metricArray } = action.payload;
      state.metrics = metricArray;
    },
    selectedMetrics: (state, action: PayloadAction<selectedMetrics>) => {
      const { selectedMetrics } = action.payload;
      state.selectedMetrics = selectedMetrics;
    },
    selectedMetricsAndMeasurements: (
      state,
      action: PayloadAction<selectedMetricsAndMeasurements>
    ) => {
      const { selectedMetricsAndMeasurements } = action.payload;
      state.selectedMetricsAndMeasurements = selectedMetricsAndMeasurements;
    },
    lastMeasurement: (state, action: PayloadAction<LastKnownMeasurement>) => {
      const { metric, at, value, unit } = action.payload;
      state.lastMeasurement.metric = metric;
      state.lastMeasurement.at = at;
      state.lastMeasurement.value = value;
      state.lastMeasurement.unit = unit;
    },
    chartMeasurements: (state, action: PayloadAction<Measurements>) => {
      const { getMeasurements } = action.payload;
      state.Measurements = getMeasurements;
    },
    metricApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) =>
      state
  }
});

export const reducer = slice.reducer;
export const actions = slice.actions;

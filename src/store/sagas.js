import { spawn } from "redux-saga/effects";
import weatherSaga from "../Features/Weather/saga";
import metricSaga from "../Features/Graph/saga";

export default function* root() {
  yield spawn(metricSaga);
  yield spawn(weatherSaga);
}

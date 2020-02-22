import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from './CardHeader';
import MetricSelection from '../Features/Graph/MetricSelection';

export default () => {
  return (
    <div>
    <Card>
      <CardHeader title="Data Visualization"/>
      <MetricSelection />
    </Card>
    </div>
  );
};

import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from './CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import MetricSelection from '../Features/Graph/MetricSelection';

const useStyles = makeStyles({
  card: {
    margin: '5% 25%',
  },
});

export default () => {
  const classes = useStyles();
  return (
    <div>
    <Card>
      <CardHeader title="Data Visualization"/>
      <MetricSelection />
    </Card>
    </div>
  );
};

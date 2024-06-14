'use client';
import { Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { ObjectOfYearsFinished } from 'src/models/PlayedModel';

export function BeatenChart({ beatenSet }: { beatenSet: ObjectOfYearsFinished }) {
  const dataset = Object.keys(beatenSet).map(year => {
    return { year, beaten: beatenSet[parseInt(year)] };
  });
  return (
    <Box sx={{ width: '100%' }}>
      <BarChart
        dataset={dataset}
        height={300}
        xAxis={[{ scaleType: 'band', dataKey: 'year' }]}
        slotProps={{ legend: { hidden: true } }}
        series={[{ dataKey: 'beaten', label: 'Beaten games' }]}
        leftAxis={null}
        bottomAxis={{
          disableLine: true,
          disableTicks: true,
        }}
        margin={{ right: 0, left: 0, bottom: 20 }}
      />
    </Box>
  );
}

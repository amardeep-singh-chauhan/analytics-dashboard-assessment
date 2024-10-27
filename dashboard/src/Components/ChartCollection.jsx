import React from 'react'
import Charts from './Charts'
import { Box, Card, CardContent, Grid } from '@mui/material'

const chartTypes = [
    { label: 'vehicleDistribution', type: 'boxPlot'},
    { label: 'rangeDistribution', type: 'rangeArea'},
    { label: 'vehicleManufacturer', type: 'bar'},
    { label: 'vehicleCountry', type: 'pie'},
    { label: 'cafvEligibility', type: 'pie'},
    { label: 'electricUsage', type: 'line'},
]

function ChartCollection({data}) {
    
  return (
    <section>
        <Box mt={4}>
          <Grid container spacing={2}>
            {chartTypes.map((chart) => <Grid item xs={12} sm={6}>
              <Card elevation={0} sx={{ borderRadius: '25px', cursor: 'pointer' }}>
                <CardContent sx={{ padding: '1rem !important' }}>
                    <Charts data={data} label={chart.label} type={chart.type} />
                </CardContent>
              </Card>
            </Grid>)}
          </Grid>
        </Box>
    </section>
  )
}

export default ChartCollection
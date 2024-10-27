import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'

function DashCards({summary}) {
  return (
    <section>
        <Box mt={2}>
          <Grid container spacing={2}>
            {summary?.map((data) => <Grid item xs={12} sm={2}>
              <Card elevation={0} sx={{ borderRadius: '25px', cursor: 'pointer' }}>
                <CardContent sx={{ padding: '1rem !important' }}>
                  <Typography component="div" sx={{ color: '#A3AED0' }}>
                    {data?.label}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#2B3674', fontSize: 'larger' }}>
                    {data?.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>)}

          </Grid>
        </Box>
      </section>
  )
}

export default DashCards
import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { Users, Activity, DollarSign } from 'lucide-react';

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
}> = ({ title, value, icon }) => (
  <Paper
    sx={{
      p: 3,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <div>
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      <Typography variant="h4" component="p">
        {value}
      </Typography>
    </div>
    {icon}
  </Paper>
);

export const Dashboard: React.FC = () => {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Total Leads"
            value="256"
            icon={<Users size={40} />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Active Campaigns"
            value="12"
            icon={<Activity size={40} />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Revenue"
            value="$45,678"
            icon={<DollarSign size={40} />}
          />
        </Grid>
      </Grid>
    </div>
  );
};
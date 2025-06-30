
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from './ui/Card';

// Mock data for demonstration purposes
const data = [
  { name: 'Week 1', weight: 80, workout_days: 3 },
  { name: 'Week 2', weight: 79.5, workout_days: 4 },
  { name: 'Week 3', weight: 79, workout_days: 3 },
  { name: 'Week 4', weight: 78, workout_days: 5 },
  { name: 'Week 5', weight: 77.5, workout_days: 4 },
  { name: 'Week 6', weight: 77, workout_days: 4 },
];

const ProgressChart: React.FC = () => {
  return (
    <Card>
      <div className="p-6">
        <h3 className="text-xl font-bold text-brand-secondary mb-4">Your Progress</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
              <XAxis dataKey="name" stroke="#E0E0E0" tick={{ fill: '#E0E0E0' }} />
              <YAxis yAxisId="left" stroke="#02C39A" tick={{ fill: '#02C39A' }} />
              <YAxis yAxisId="right" orientation="right" stroke="#F0F3BD" tick={{ fill: '#F0F3BD' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#2C2C2C',
                  border: '1px solid #404040',
                }}
              />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#02C39A" strokeWidth={2} name="Weight (kg)" />
              <Line yAxisId="right" type="monotone" dataKey="workout_days" stroke="#F0F3BD" strokeWidth={2} name="Workouts / Week" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export default ProgressChart;

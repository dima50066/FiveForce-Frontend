import React from 'react';
import { useSelector } from 'react-redux';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { selectMonthWater } from '../../redux/water/selectors';

const Statistics = () => {
  const rawData = useSelector(selectMonthWater);

  const data = rawData.map(item => ({
    date: new Date(item.dateParam).getDate(),
    water: item.totalDayWater,
  }));
const maxValue = Math.ceil(
    data.reduce((max, item) => Math.max(max, item.water), 0) / 1000
  );
  const ticks = Array.from({ length: maxValue * 2 + 1 }, (_, i) => i * 0.5 * 1000);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{
          top: 47, right: 16, bottom: 0, left: 0
          
         }}
      >
        <defs>
          <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        {/* Оновлюємо dataKey */}
        <XAxis dataKey="date"  tick={{ fontSize: 14, fill: '#323f47' }} axisLine={false}
  tickLine={false} />
        <YAxis
          domain={[0, 'dataMax']}
          ticks={ticks}
          tickFormatter={value => `${value / 1000} L`}
          tick={{ fontSize: 14, fill: '#323f47' }}
          axisLine={false} 
          
  tickLine={false}
        />
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length) {
              return (
                <div
                  style={{
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '5px',
                  }}
                >
                  <p>{`${payload[0].value}ml`}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Area
          type="linear"
          dataKey="water"
          stroke="#82ca9d"
          fill="url(#colorWater)"
          strokeWidth={2}
          dot={{ r: 6, stroke: '#82ca9d', strokeWidth: 2, fill: 'white' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Statistics;

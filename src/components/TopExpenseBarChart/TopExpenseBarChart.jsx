import "./styles.css";
import React from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getExpenseGroupedDataFromArrayOfObjects } from "../../utils/";

const TopExpenseBarChart = ({ expenses }) => {
  const data = getExpenseGroupedDataFromArrayOfObjects(expenses);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        layout="vertical"
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 0,
          left: 20,
        }}
        width={200}
        height={330}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" hide />
        <YAxis
          dataKey="name"
          type="category"
          scale="none"
          axisLine={false}
          tickLine={false}
          padding={{
            top: 30,
            bottom: 30,
          }}
        />
        <Tooltip />

        <Bar
          dataKey="value"
          barSize={20}
          fill="#8784D2"
          radius={[0, 10, 10, 0]}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default TopExpenseBarChart;

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./styles.css";
import { PIE_VALUE } from "../../constants";
import { expenseItemColors } from "../../utils/colorUtils.js";
import { getExpenseGroupedDataFromArrayOfObjects } from "../../utils/";
const RADIAN = Math.PI / PIE_VALUE;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      style={{
        fontSize: "12px",
        fontWeight: 700,
        lineHeight: "13.79px",
        textAlign: "left",
      }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ExpensesPieChart = ({ expenses }) => {
  const data = getExpenseGroupedDataFromArrayOfObjects(expenses);
  return (
    <div className="recharts-wrapper-container">
      <ResponsiveContainer className="recharts-responsive-container">
        <PieChart width={199} height={199}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={expenseItemColors[index % expenseItemColors.length]}
                stroke={""}
              />
            ))}
          </Pie>
          <Tooltip />

          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensesPieChart;

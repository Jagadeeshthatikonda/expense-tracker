import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip,ResponsiveContainer } from "recharts";
import "./styles.css";
import { expenseItemColors } from "../../utils/colorUtils.js";

const RADIAN = Math.PI / 180;

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
  const modifiedData = expenses.reduce((acc, curr) => {
    const { category, price } = curr;
    acc[category] = (acc[category] || 0) + price;
    return acc;
  }, {});

  const modifiedArray = Object.entries(modifiedData).map(
    ([category, price]) => ({
      name: category,
      value: price,
    })
  );
  return (
    <div className="recharts-wrapper-container">
      <ResponsiveContainer className="recharts-responsive-container">
        <PieChart width={199} height={199}>
          <Pie
            data={modifiedArray}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {modifiedArray.map((entry, index) => (
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

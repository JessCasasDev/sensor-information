import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
} from "recharts";

export interface ChartData {
  name: string;
  value: number;
}

export const Chart = (props: { data: ChartData[] }) => {
  const { data } = props;
  const values = data.map((info) => info.value);
  const range = {
    maxRange: Math.max(...values),
    minRange: Math.min(...values),
  };

  const renderLineChart = (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width={1000}>
        <LineChart
          data={data}
       
        >
          <Line type="monotone" dataKey="value" stroke="#0069b4" />
          <CartesianGrid stroke="#ccc" />
          <XAxis label={{
              value: "Time (HH:mm)",
              position: "bottom", offset: -15
              
            }} 
            dataKey="name"
            height={40}
           />
          <YAxis
            label={{
              value: "Degrees Celsius",
              angle: -90,
              position: "left",
              offset: -2,
            }}
            type="number"
            domain={[range.minRange, range.maxRange]}
          />
          <Tooltip />
          <Brush dataKey="name" y={270} height={30} stroke="#0069b4"/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return renderLineChart;
};

import { useEffect, useState, memo } from "react";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import { IOrder } from "../../types/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title
);

const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
  },
};

const labels: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface props {
  orders: IOrder[];
}

const Chart = memo(({ orders }: props): JSX.Element => {
  const [data, setData] = useState<ChartData<"line">>({
    labels,
    datasets: [
      {
        label: "Number of orders",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  useEffect(() => {
    const orderData: number[] = new Array(12).fill(0);
    orders.forEach((order) => {
      orderData[new Date(order.orderDate).getMonth()] += 1;
    });
    data.datasets[0].data = Object.values(orderData);
    setData({
      labels,
      datasets: [
        {
          data: Object.values(orderData),
          label: "Number of orders",
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });
  }, [orders]);

  return (
    <>
      <h1 className="font-bold text-base" data-cy="dashboardChart_title">
        Number of orders
      </h1>
      <div className="inline-block relative w-full pt-4 h-60 md:h-auto">
        <Line data-cy="chart" height={"auto"} options={options} data={data} />
      </div>
    </>
  );
});

export default Chart;

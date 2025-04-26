// components/DonutChart.jsx
import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import MKCard from "./MKCard.jsx";
import MKTypography from "./MKTypography.jsx";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA00FF", "#FF4081"];

function DonutChart({ students }) {
  const data = useMemo(() => {
    const counts = {};
    students.forEach(student => {
      counts[student.department] = (counts[student.department] || 0) + 1;
    });
    return Object.entries(counts).map(([dept, count]) => ({ name: dept, value: count }));
  }, [students]);

  return (
    <MKCard sx={{ height: 300, width: "100%" }}>
      <MKTypography variant="h6" textAlign="center" mb={2}>
        Students by Department
      </MKTypography>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </MKCard>
  );
}

export default DonutChart;

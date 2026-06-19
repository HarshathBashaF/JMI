import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend
} from "recharts";
import { MapPin } from "lucide-react";
import { useState } from "react";

const COLORS = [
  "#059669",
  "#0ea5e9",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700">
        <p className="font-semibold text-sm">{payload[0].name}</p>
        <p className="text-emerald-400 text-lg font-bold">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const LocationChart = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-50 rounded-lg">
          <MapPin size={18} className="text-emerald-600" />
        </div>
        <div>
          <h2 className="font-bold text-lg text-slate-900">Job Distribution by Location</h2>
          <p className="text-sm text-slate-500">{data.length} Regions tracked</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={105}
              paddingAngle={4}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              labelStyle={{ fill: "#475569", fontSize: 12, fontWeight: 600 }}
              onMouseEnter={(_, index) => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animationBegin={100}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#fff"
                  strokeWidth={3}
                  style={{
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    filter: hoveredIndex === index 
                      ? "drop-shadow(0 8px 20px rgba(0,0,0,0.15)) brightness(1.05)" 
                      : hoveredIndex !== null 
                        ? "brightness(0.85)" 
                        : "none",
                    transform: hoveredIndex === index ? "scale(1.03)" : "scale(1)",
                    transformOrigin: "center",
                    cursor: "pointer",
                    opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.7 : 1
                  }}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />

            <Legend
              verticalAlign="bottom"
              height={40}
              iconType="circle"
              iconSize={10}
              formatter={(value, entry, index) => (
                <span 
                  className="text-sm transition-colors duration-300"
                  style={{ 
                    color: hoveredIndex === index ? COLORS[index % COLORS.length] : "#475569",
                    fontWeight: hoveredIndex === index ? 600 : 400
                  }}
                >
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LocationChart;
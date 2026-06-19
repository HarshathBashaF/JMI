import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";
import { BarChart3 } from "lucide-react";
import { useState } from "react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700">
        <p className="font-semibold text-sm">{payload[0].payload.name}</p>
        <p className="text-emerald-400 text-lg font-bold">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const SkillChart = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const maxValue = Math.max(...data.map(d => d.value));

  const getBarColor = (value, index) => {
    if (hoveredIndex !== null && hoveredIndex !== index) return "#e2e8f0";
    const intensity = value / maxValue;
    if (intensity > 0.7) return "#059669";
    if (intensity > 0.4) return "#10b981";
    return "#6ee7b7";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      {/* Clean Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-50 rounded-lg">
          <BarChart3 size={18} className="text-emerald-600" />
        </div>
        <div>
          <h2 className="font-bold text-lg text-slate-900">Skill Demand</h2>
          <p className="text-sm text-slate-500">Market distribution by volume</p>
        </div>
      </div>

      {/* Pure Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barCategoryGap="12%"
          >
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#f1f5f9"
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(16, 185, 129, 0.06)" }}
            />

            <Bar
              dataKey="value"
              radius={[10, 10, 0, 0]}
              maxBarSize={72}
              onMouseEnter={(_, index) => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animationDuration={600}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(entry.value, index)}
                  style={{
                    transition: "all 0.3s ease",
                    filter: hoveredIndex === index 
                      ? "drop-shadow(0 8px 16px rgba(16, 185, 129, 0.25))" 
                      : "none"
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SkillChart;
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ResponsiveContainer, PieChart, Pie, Cell, Sector } from "recharts";
import { useState } from "react";

interface DonutChartProps {
  data: {
    name: string;
    value: number;
    color: string;
    tooltip?: string;
  }[];
  onSegmentClick?: (name: string) => void;
}

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 4}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export function DonutChart({ data, onSegmentClick }: DonutChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();

  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  const percentages = data.map(entry => ({
    ...entry,
    percentage: Math.round((entry.value / total) * 100)
  }));

  return (
    <TooltipProvider>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={percentages}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(undefined)}
              onClick={(entry) => onSegmentClick?.(entry.name)}
            >
              {percentages.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color}>
                  <Tooltip>
                    <TooltipContent>
                      <div className="text-sm">
                        <div className="font-medium">{entry.name}</div>
                        <div className="text-muted-foreground">
                          Score: {entry.value}
                        </div>
                        {entry.tooltip && (
                          <div className="text-xs mt-1 max-w-xs">
                            {entry.tooltip}
                          </div>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </Cell>
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </TooltipProvider>
  );
}
import { Label, Pie, PieChart } from "recharts";

import { CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { mapToPieChart } from "@/lib/utils";

const chartConfig = {
  deliverable: {
    label: "Deliverable",
    color: "#22c55e",
  },
  undeliverable: {
    label: "Undeliverable",
    color: "#ef4444",
  },
  risky: {
    label: "Risky",
    color: "#eab308",
  },
  duplicate: {
    label: "Duplicate",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

const OverviewPichart = ({ data }: { data: GetOverview }) => {
  return (
    <CardContent className="h-full w-full flex-1 pb-0">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[390px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={mapToPieChart(data)}
            dataKey="value"
            nameKey="name"
            innerRadius={100}
            outerRadius={140}
            strokeWidth={5}
            cx="50%"
            cy="50%"
            fill="#8884d8"
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {data.deliverable}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Deliverable
                      </tspan>
                    </text>
                  );
                }
                return null;
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </CardContent>
  );
};

export default OverviewPichart;

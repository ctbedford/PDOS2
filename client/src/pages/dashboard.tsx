import Layout from "@/components/layout";
import { DonutChart } from "@/components/donut-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const metricsData = [
    { name: "Self-Awareness", value: 75, color: "hsl(var(--chart-1))" },
    { name: "Resilience", value: 60, color: "hsl(var(--chart-2))" },
    { name: "Adaptive Capacity", value: 82, color: "hsl(var(--chart-3))" },
    { name: "Decision Making", value: 68, color: "hsl(var(--chart-4))" },
    { name: "Emotional Regulation", value: 70, color: "hsl(var(--chart-5))" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Emergent Properties Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <DonutChart data={metricsData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <h3 className="font-medium">Resilience Needs Focus</h3>
                    <p className="text-sm text-muted-foreground">
                      Your Resilience score is lower than average. Explore
                      strategies to improve it.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Great Self-Awareness!</h3>
                    <p className="text-sm text-muted-foreground">
                      Your Self-Awareness is strong! Keep reflecting.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="reflect" className="w-full">
              <TabsList className="w-full rounded-none border-b">
                <TabsTrigger value="reflect" className="flex-1">Reflect</TabsTrigger>
                <TabsTrigger value="plan" className="flex-1">Plan</TabsTrigger>
                <TabsTrigger value="learn" className="flex-1">Learn</TabsTrigger>
              </TabsList>
              <TabsContent value="reflect" className="p-6">
                <h3 className="text-lg font-medium mb-4">Daily Reflection</h3>
                {/* Add reflection content */}
              </TabsContent>
              <TabsContent value="plan" className="p-6">
                <h3 className="text-lg font-medium mb-4">Action Planning</h3>
                {/* Add planning content */}
              </TabsContent>
              <TabsContent value="learn" className="p-6">
                <h3 className="text-lg font-medium mb-4">Learning Resources</h3>
                {/* Add learning content */}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

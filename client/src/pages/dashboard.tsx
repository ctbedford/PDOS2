import Layout from "@/components/layout";
import { DonutChart } from "@/components/donut-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, TrendingUp, BookText, Target, GraduationCap } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { type Metrics } from "@shared/schema";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: metrics } = useQuery<Metrics[]>({
    queryKey: ["/api/metrics"],
  });

  // Transform metrics data for the donut chart
  const metricsData = [
    {
      name: "Self-Awareness",
      value: metrics?.[0]?.selfAwareness ?? 75,
      color: "hsl(var(--chart-1))",
      tooltip: "Your understanding of yourself and your internal states.",
    },
    {
      name: "Resilience",
      value: metrics?.[0]?.resilience ?? 60,
      color: "hsl(var(--chart-2))",
      tooltip: "Your ability to bounce back from setbacks and stress.",
    },
    {
      name: "Adaptive Capacity",
      value: metrics?.[0]?.adaptiveCapacity ?? 82,
      color: "hsl(var(--chart-3))",
      tooltip: "Your capacity to learn and adapt to new situations.",
    },
    {
      name: "Decision Making",
      value: metrics?.[0]?.decisionMaking ?? 68,
      color: "hsl(var(--chart-4))",
      tooltip: "The quality of your choices aligned with your goals and values.",
    },
    {
      name: "Emotional Regulation",
      value: metrics?.[0]?.emotionalRegulation ?? 70,
      color: "hsl(var(--chart-5))",
      tooltip: "Your ability to manage and regulate your emotions effectively.",
    },
  ];

  const handleSegmentClick = (name: string) => {
    // TODO: Navigate to detailed view
    console.log(`Clicked ${name}`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Track your personal development metrics and insights
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Emergent Properties Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <DonutChart 
                data={metricsData} 
                onSegmentClick={handleSegmentClick}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metricsData
                  .sort((a, b) => a.value - b.value)
                  .slice(0, 2)
                  .map((metric) => (
                    <div key={metric.name} className="flex items-start gap-4">
                      {metric.value < 65 ? (
                        <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                      ) : (
                        <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                      )}
                      <div>
                        <h3 className="font-medium">
                          {metric.value < 65
                            ? `${metric.name} Needs Focus`
                            : `Great ${metric.name}!`}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {metric.value < 65
                            ? `Your ${metric.name} score is lower than average. Explore strategies to improve it.`
                            : `Your ${metric.name} is strong! Keep up the good work.`}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="reflect" className="w-full">
              <TabsList className="w-full rounded-none border-b">
                <TabsTrigger value="reflect" className="flex-1">
                  <BookText className="h-4 w-4 mr-2" />
                  Reflect
                </TabsTrigger>
                <TabsTrigger value="plan" className="flex-1">
                  <Target className="h-4 w-4 mr-2" />
                  Plan
                </TabsTrigger>
                <TabsTrigger value="learn" className="flex-1">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Learn
                </TabsTrigger>
              </TabsList>
              <TabsContent value="reflect" className="p-6">
                <h3 className="text-lg font-medium mb-4">Daily Reflection</h3>
                <p className="text-muted-foreground">
                  Reflect on a recent situation where you felt your resilience was tested. 
                  What strategies did you use? What did you learn?
                </p>
              </TabsContent>
              <TabsContent value="plan" className="p-6">
                <h3 className="text-lg font-medium mb-4">Action Planning</h3>
                <p className="text-muted-foreground">
                  Consider scheduling 15 minutes for mindfulness meditation today to boost 
                  your emotional regulation.
                </p>
              </TabsContent>
              <TabsContent value="learn" className="p-6">
                <h3 className="text-lg font-medium mb-4">Learning Resources</h3>
                <div className="space-y-4">
                  <h4 className="font-medium">Strategy Spotlight: Cognitive Restructuring</h4>
                  <p className="text-muted-foreground">
                    Cognitive restructuring helps challenge and change negative thought patterns. 
                    Try to identify a negative thought and reframe it in a more positive or 
                    realistic way.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
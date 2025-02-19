import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "@/components/line-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, TrendingUp, BookText, Target } from "lucide-react";
import { type Metrics } from "@shared/schema";

type MetricDetailData = {
  history: { date: string; value: number }[];
  strategies: {
    id: string;
    title: string;
    description: string;
    difficulty: "easy" | "medium" | "hard";
  }[];
  insights: {
    type: "trend" | "comparison" | "suggestion";
    message: string;
  }[];
};

export default function MetricDetail() {
  const { metricName } = useParams<{ metricName: string }>();
  const formattedMetricName = metricName
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const { data: metricDetail, isLoading } = useQuery<MetricDetailData>({
    queryKey: [`/api/metrics/${metricName}/detail`],
    enabled: !!metricName,
  });

  const { data: currentMetrics } = useQuery<Metrics[]>({
    queryKey: ["/api/metrics"],
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="h-64 bg-muted rounded" />
            <div className="h-64 bg-muted rounded" />
          </div>
        </div>
      </Layout>
    );
  }

  const currentValue = currentMetrics?.[0]?.[
    metricName?.toLowerCase().replace("-", "") as keyof Metrics
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{formattedMetricName}</h1>
          <p className="text-muted-foreground mt-2">
            Detailed analysis and improvement strategies
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Historical Trend</CardTitle>
            </CardHeader>
            <CardContent>
              {metricDetail?.history && (
                <LineChart
                  data={metricDetail.history.map((point) => ({
                    date: new Date(point.date),
                    value: point.value,
                  }))}
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{currentValue}</span>
                  <div className="flex items-center gap-2">
                    {(currentValue ?? 0) >= 75 ? (
                      <TrendingUp className="h-5 w-5 text-primary" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-destructive" />
                    )}
                    <span className="text-sm text-muted-foreground">
                      {(currentValue ?? 0) >= 75
                        ? "Strong Performance"
                        : "Needs Attention"}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  {metricDetail?.insights.map((insight, index) => (
                    <p key={index} className="text-sm text-muted-foreground">
                      {insight.message}
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="strategies" className="w-full">
              <TabsList className="w-full rounded-none border-b">
                <TabsTrigger value="strategies" className="flex-1">
                  <Target className="h-4 w-4 mr-2" />
                  Improvement Strategies
                </TabsTrigger>
                <TabsTrigger value="insights" className="flex-1">
                  <BookText className="h-4 w-4 mr-2" />
                  Detailed Insights
                </TabsTrigger>
              </TabsList>
              <TabsContent value="strategies" className="p-6">
                <div className="space-y-4">
                  {metricDetail?.strategies.map((strategy) => (
                    <div
                      key={strategy.id}
                      className="p-4 border rounded space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{strategy.title}</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-muted">
                          {strategy.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {strategy.description}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="insights" className="p-6">
                <div className="space-y-4">
                  {metricDetail?.insights.map((insight, index) => (
                    <div key={index} className="p-4 border rounded">
                      <div className="flex items-start gap-4">
                        {insight.type === "trend" ? (
                          <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                        ) : insight.type === "comparison" ? (
                          <Target className="h-5 w-5 text-primary mt-0.5" />
                        ) : (
                          <BookText className="h-5 w-5 text-primary mt-0.5" />
                        )}
                        <p className="text-sm text-muted-foreground">
                          {insight.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

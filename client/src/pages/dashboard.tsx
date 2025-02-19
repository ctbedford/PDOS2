import Layout from "@/components/layout";
import { DonutChart } from "@/components/donut-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, TrendingUp, BookText, Target, GraduationCap } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { type Metrics } from "@shared/schema";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reflection, setReflection] = useState("");
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<{ id: number; description: string }[]>([]);

  const { data: metrics } = useQuery<Metrics[]>({ queryKey: ["/api/metrics"] });
  const { data: historicalMetrics } = useQuery<Metrics[]>({ queryKey: ["/api/historical-metrics"] });
  const { data: userGoals } = useQuery<{ metric: string; target: number }[]>({ queryKey: ["/api/user-goals"] });
  const { data: recentActivities } = useQuery<{ id: number; description: string; date: string }[]>({ queryKey: ["/api/recent-activities"] });

  const saveReflectionMutation = useMutation({
    mutationFn: (text: string) => fetch("/api/reflections", {
      method: "POST",
      body: JSON.stringify({ userId: user?.id, text, date: new Date().toISOString() }),
      headers: { "Content-Type": "application/json" },
    }),
  });

  const saveTaskMutation = useMutation({
    mutationFn: (task: string) => fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ userId: user?.id, description: task }),
      headers: { "Content-Type": "application/json" },
    }),
  });

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
    navigate(`/metrics/${name.toLowerCase().replace(" ", "-")}`);
  };

  const generateInsights = (currentMetrics: typeof metricsData, historicalMetrics?: Metrics[], userGoals?: { metric: string; target: number }[]) => {
    const insights = [];

    currentMetrics.forEach(metric => {
      if (metric.value < 65) {
        insights.push({
          type: "warning",
          message: `${metric.name} needs attention. Try exploring strategies in the Learn tab.`,
          icon: <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
        });
      }
    });

    if (historicalMetrics?.length) {
      currentMetrics.forEach(metric => {
        const previous = historicalMetrics[0]?.[metric.name.toLowerCase().replace(" ", "") as keyof Metrics];
        if (previous && metric.value > previous + 10) {
          insights.push({
            type: "positive",
            message: `Great improvement in ${metric.name}! Keep it up.`,
            icon: <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
          });
        }
      });
    }

    if (userGoals?.length) {
      userGoals.forEach(goal => {
        const relatedMetric = currentMetrics.find(m => m.name === goal.metric);
        if (relatedMetric) {
          insights.push({
            type: "goal",
            message: `Progress on your ${goal.metric} goal: ${relatedMetric.value}/${goal.target}.`,
            icon: <Target className="h-5 w-5 text-primary mt-0.5" />
          });
        }
      });
    }

    return insights.length ? insights : [{
      type: "neutral",
      message: "Looking good! Keep tracking your progress.",
      icon: <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
    }];
  };

  const handleSaveReflection = () => {
    saveReflectionMutation.mutate(reflection, {
      onSuccess: () => setReflection("")
    });
  };

  const handleAddTask = () => {
    saveTaskMutation.mutate(newTask, {
      onSuccess: () => {
        setTasks([...tasks, { id: Date.now(), description: newTask }]);
        setNewTask("");
      },
    });
  };

  const recommendedResources = [
    { id: 1, title: "Cognitive Restructuring", link: "#", metric: "Emotional Regulation" },
    { id: 2, title: "Resilience Building", link: "#", metric: "Resilience" },
  ];

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
                {generateInsights(metricsData, historicalMetrics, userGoals).map((insight, index) => (
                  <div key={index} className="flex items-start gap-4">
                    {insight.icon}
                    <div>
                      <h3 className="font-medium">
                        {insight.type === "warning" ? `${insight.message.split(".")[0]}` : insight.message.split(":")[0]}
                      </h3>
                      <p className="text-sm text-muted-foreground">{insight.message}</p>
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
                <textarea
                  className="w-full p-2 border rounded h-32 mb-4"
                  placeholder="Reflect on a recent situation..."
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                />
                <button
                  onClick={handleSaveReflection}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50"
                  disabled={saveReflectionMutation.isLoading || !reflection.trim()}
                >
                  {saveReflectionMutation.isLoading ? "Saving..." : "Save Reflection"}
                </button>
              </TabsContent>
              <TabsContent value="plan" className="p-6">
                <h3 className="text-lg font-medium mb-4">Action Planning</h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a new task..."
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      className="flex-1 p-2 border rounded"
                    />
                    <button
                      onClick={handleAddTask}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50"
                      disabled={saveTaskMutation.isLoading || !newTask.trim()}
                    >
                      {saveTaskMutation.isLoading ? "Adding..." : "Add Task"}
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {tasks.map(task => (
                      <li key={task.id} className="flex items-center gap-2 text-sm">
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        {task.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="learn" className="p-6">
                <h3 className="text-lg font-medium mb-4">Learning Resources</h3>
                <div className="space-y-4">
                  {recommendedResources
                    .filter(r => r.metric === metricsData.sort((a, b) => a.value - b.value)[0].name)
                    .map(resource => (
                      <div key={resource.id} className="p-4 border rounded">
                        <h4 className="font-medium">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground mt-2">
                          <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Explore this strategy
                          </a> to improve your {resource.metric}.
                        </p>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recentActivities?.slice(0, 5).map(activity => (
                <li key={activity.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  {activity.description} - {new Date(activity.date).toLocaleDateString()}
                </li>
              )) || (
                <li className="text-sm text-muted-foreground">No recent activities yet.</li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
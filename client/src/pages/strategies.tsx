import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, ShieldCheck, Rocket, HeartPulse, Star, Target } from "lucide-react";

const strategies = [
  {
    icon: Brain,
    title: "Executive Function",
    description: "Enhance planning, focus, control",
  },
  {
    icon: ShieldCheck,
    title: "Cognitive Bias Mitigation",
    description: "Overcome mental shortcuts",
  },
  {
    icon: Rocket,
    title: "Motivation Enhancement",
    description: "Increase your drive & commitment",
  },
  {
    icon: HeartPulse,
    title: "Emotional Regulation",
    description: "Manage emotions effectively",
  },
  {
    icon: Star,
    title: "Self-Efficacy Building",
    description: "Boost your belief in success",
  },
  {
    icon: Target,
    title: "Goal-Setting & Planning",
    description: "Effective goal achievement",
  },
];

export default function Strategies() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Strategies & Resources</h1>
          <p className="text-muted-foreground mt-2">
            Explore strategies to enhance your Personal OS
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {strategies.map((strategy) => (
            <Card
              key={strategy.title}
              className="hover:bg-accent transition-colors cursor-pointer"
            >
              <CardContent className="p-6">
                <strategy.icon className="h-8 w-8 mb-4 text-primary" />
                <h3 className="font-medium mb-2">{strategy.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {strategy.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Book, Target, Heart, Brain, User, Lightbulb, AlertTriangle, Rocket, RotateCcw } from "lucide-react";

const visionComponents = [
  {
    icon: Book,
    title: "Personal Narrative",
    description: "Your life story & meaning-making",
  },
  {
    icon: Target,
    title: "Goals & Aspirations",
    description: "What you aim to achieve",
  },
  {
    icon: Heart,
    title: "Values & Beliefs",
    description: "Your core guiding principles",
  },
  {
    icon: Brain,
    title: "Skills",
    description: "Your abilities & areas for growth",
  },
  {
    icon: User,
    title: "Identity",
    description: "How you see yourself shaped by influences",
  },
  {
    icon: Lightbulb,
    title: "Thinking Style",
    description: "Planning, focus, impulse control",
  },
  {
    icon: AlertTriangle,
    title: "Biases",
    description: "Mental shortcuts & decision pitfalls",
  },
  {
    icon: Rocket,
    title: "Motivation",
    description: "What drives & inspires you",
  },
  {
    icon: RotateCcw,
    title: "Feedback Loops",
    description: "Self-reflection & external feedback",
  },
];

export default function Vision() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Vision of Self</h1>
          <p className="text-muted-foreground mt-2">
            Explore and refine your internal landscape
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visionComponents.map((component) => (
            <Card
              key={component.title}
              className="hover:bg-accent transition-colors cursor-pointer"
            >
              <CardContent className="p-6">
                <component.icon className="h-8 w-8 mb-4 text-primary" />
                <h3 className="font-medium mb-2">{component.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {component.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

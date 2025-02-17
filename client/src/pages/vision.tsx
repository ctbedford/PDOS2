import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import {
  Book,
  Target,
  Heart,
  Brain,
  User,
  Lightbulb,
  AlertTriangle,
  Rocket,
  RotateCcw
} from "lucide-react";

const visionComponents = [
  {
    icon: Book,
    title: "Personal Narrative",
    description: "Your life story & meaning-making",
    route: "/vision/narrative"
  },
  {
    icon: Target,
    title: "Goals & Aspirations",
    description: "What you aim to achieve",
    route: "/vision/goals"
  },
  {
    icon: Heart,
    title: "Values & Beliefs",
    description: "Your core guiding principles",
    route: "/vision/values"
  },
  {
    icon: Brain,
    title: "Skills",
    description: "Your abilities & areas for growth",
    route: "/vision/skills"
  },
  {
    icon: User,
    title: "Identity",
    description: "How you see yourself shaped by influences",
    route: "/vision/identity"
  },
  {
    icon: Lightbulb,
    title: "Thinking Style",
    description: "Planning, focus, impulse control",
    route: "/vision/thinking"
  },
  {
    icon: AlertTriangle,
    title: "Biases",
    description: "Mental shortcuts & decision pitfalls",
    route: "/vision/biases"
  },
  {
    icon: Rocket,
    title: "Motivation",
    description: "What drives & inspires you",
    route: "/vision/motivation"
  },
  {
    icon: RotateCcw,
    title: "Feedback Loops",
    description: "Self-reflection & external feedback",
    route: "/vision/feedback"
  }
];

export default function Vision() {
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Vision of Self</h1>
          <p className="text-muted-foreground text-lg">
            Explore and refine your internal landscape
          </p>
        </div>

        {/* Vision Components Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visionComponents.map((component) => (
            <Card
              key={component.title}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary"
              onClick={() => setLocation(component.route)}
            >
              <CardContent className="p-6 text-center">
                <component.icon className="h-12 w-12 mb-4 mx-auto text-primary group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {component.title}
                </h3>
                <p className="text-muted-foreground">
                  {component.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guiding Prompt Section */}
        <div className="mt-8 text-center max-w-2xl mx-auto">
          <p className="text-muted-foreground italic">
            Tap on each component to explore it further. Consider reflecting on which areas of your Vision of Self you'd like to develop.
          </p>
        </div>
      </div>
    </Layout>
  );
}
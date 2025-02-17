import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Hourglass, Users, Globe2, Cpu } from "lucide-react";

const contextFactors = [
  {
    icon: Hourglass,
    title: "Life Stage",
    description: "Student, Professional, Parent, etc.",
  },
  {
    icon: Users,
    title: "Life Domains",
    description: "Career, Relationships, Health, Growth",
  },
  {
    icon: Globe2,
    title: "Social & Cultural Context",
    description: "Culture, Socioeconomic factors",
  },
  {
    icon: Cpu,
    title: "Technology",
    description: "Impact of social media, AI, etc.",
  },
];

export default function Context() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Context of Life Building</h1>
          <p className="text-muted-foreground mt-2">
            Understand your external influences and environment
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {contextFactors.map((factor) => (
            <Card
              key={factor.title}
              className="hover:bg-accent transition-colors cursor-pointer"
            >
              <CardContent className="p-6">
                <factor.icon className="h-8 w-8 mb-4 text-primary" />
                <h3 className="font-medium mb-2">{factor.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {factor.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

import { useLocation } from "wouter";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Book, RotateCcw, ExternalLink, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { type PersonalNarrative } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";

const narrativeSchema = z.object({
  keyChapters: z.string().min(1, "Please share at least one key chapter of your life"),
  connectingThemes: z.string().min(1, "Please identify at least one connecting theme"),
  narrativeSummary: z.string().min(1, "Please provide a narrative summary"),
  culturalStories: z.string().min(1, "Please reflect on cultural influences"),
  languageInfluence: z.string().min(1, "Please reflect on language influence"),
});

type NarrativeForm = z.infer<typeof narrativeSchema>;

export default function PersonalNarrative() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();

  const { data: narrative, isLoading } = useQuery<PersonalNarrative>({
    queryKey: ["/api/narrative"],
    enabled: !!user,
  });

  const form = useForm<NarrativeForm>({
    resolver: zodResolver(narrativeSchema),
    defaultValues: {
      keyChapters: narrative?.keyChapters ?? "",
      connectingThemes: narrative?.connectingThemes ?? "",
      narrativeSummary: narrative?.narrativeSummary ?? "",
      culturalStories: narrative?.culturalStories ?? "",
      languageInfluence: narrative?.languageInfluence ?? "",
    },
  });

  const saveNarrativeMutation = useMutation({
    mutationFn: async (data: NarrativeForm) => {
      const res = await apiRequest("POST", "/api/narrative", {
        ...data,
        userId: user!.id,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/narrative"] });
      toast({
        title: "Narrative Updated",
        description: "Your personal narrative has been saved successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to save",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-border" />
        </div>
      </Layout>
    );
  }

  const onSubmit = (data: NarrativeForm) => {
    saveNarrativeMutation.mutate(data);
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Personal Narrative</h1>
          <p className="text-muted-foreground text-lg">
            Understanding your life story and meaning-making
          </p>
        </div>

        {/* Explanatory Text Section */}
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">
              Your Personal Narrative is the story you tell yourself about your life.
              A coherent narrative helps you make sense of your past, understand your present,
              and envision your future. It's a foundation for self-awareness and direction.
            </p>
          </CardContent>
        </Card>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Key Chapters Input */}
            <FormField
              control={form.control}
              name="keyChapters"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Life Chapters/Periods</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Childhood, Education, Early Career, Family Life..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Connecting Themes Input */}
            <FormField
              control={form.control}
              name="connectingThemes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Connecting Themes/Threads</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Resilience, Learning, Relationships, Independence..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Current Narrative Summary */}
            <FormField
              control={form.control}
              name="narrativeSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Narrative Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a concise summary of your life story as you understand it now..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Cultural Stories */}
            <FormField
              control={form.control}
              name="culturalStories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Cultural stories or societal expectations that have shaped your narrative:
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your reflections on cultural influences..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Language Influence */}
            <FormField
              control={form.control}
              name="languageInfluence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    How language influences the way you frame your past, present, and future:
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your reflections on language influence..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reflect Again
              </Button>
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Save Narrative
              </Button>
              <Button
                type="button"
                variant="link"
                onClick={() => {
                  // Add resource link logic here
                }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Learn More about Narrative Coherence
              </Button>
            </div>
          </form>
        </Form>

        <div className="text-center text-muted-foreground text-sm pt-6">
          <p>
            Take your time to reflect deeply on each prompt. Your narrative is a living story
            that can be reframed and reshaped as you grow.
          </p>
        </div>
      </div>
    </Layout>
  );
}
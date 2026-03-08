import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowRight } from "lucide-react";
import type { ChildProfile } from "@/pages/Onboarding";

const schema = z.object({
  name: z.string().min(1, "Please enter a name").max(50),
  age: z.number({ required_error: "Please select an age" }).min(1).max(12),
  readingLevel: z.string().min(1, "Please select a reading level"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  profile: ChildProfile;
  onChange: (p: ChildProfile) => void;
  onNext: () => void;
  onBack: () => void;
}

const readingLevels = [
  { value: "Early Reader", hint: "Ages 2–4, simple words" },
  { value: "Beginner", hint: "Ages 4–6, short sentences" },
  { value: "Intermediate", hint: "Ages 6–9, paragraphs" },
  { value: "Advanced", hint: "Ages 9+, rich vocabulary" },
];

const BasicDetailsStep = ({ profile, onChange, onNext, onBack }: Props) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: profile.name,
      age: profile.age,
      readingLevel: profile.readingLevel,
    },
  });

  useEffect(() => {
    // Auto-focus name field
    setTimeout(() => nameRef.current?.focus(), 100);
  }, []);

  const onSubmit = (values: FormValues) => {
    onChange({ ...profile, ...values });
    onNext();
  };

  return (
    <Card className="border-0 shadow-soft">
      <CardContent className="p-6 sm:p-8">
        <h2 className="text-xl font-bold text-foreground mb-1">Tell Us About Your Child</h2>
        <p className="text-sm text-muted-foreground mb-6">
          These basics help us tailor the story's language and themes.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Child's Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Mira"
                      {...field}
                      ref={(e) => {
                        field.ref(e);
                        (nameRef as any).current = e;
                      }}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <Select
                    value={String(field.value)}
                    onValueChange={(v) => field.onChange(Number(v))}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select age" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n} {n === 1 ? "year old" : "years old"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="readingLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reading Level</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {readingLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          <span>{level.value}</span>
                          <span className="text-muted-foreground ml-1 text-xs">— {level.hint}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end pt-2">
              <Button type="submit" className="rounded-full px-8 gap-1">
                Next <ArrowRight size={16} />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BasicDetailsStep;

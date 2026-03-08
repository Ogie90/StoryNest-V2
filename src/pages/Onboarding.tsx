import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeStep from "@/components/onboarding/WelcomeStep";
import BasicDetailsStep from "@/components/onboarding/BasicDetailsStep";
import InterestsStep from "@/components/onboarding/InterestsStep";
import { Progress } from "@/components/ui/progress";

export interface ChildProfile {
  name: string;
  age: number;
  readingLevel: string;
  interests: string[];
  favoriteThings: string;
}

const PROFILE_KEY = "storynest-child-profile";
const STEP_KEY = "storynest-onboarding-step";

const defaultProfile: ChildProfile = {
  name: "",
  age: 5,
  readingLevel: "Beginner",
  interests: [],
  favoriteThings: "",
};

const Onboarding = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem(STEP_KEY);
    return saved ? Number(saved) : 0;
  });

  const [profile, setProfile] = useState<ChildProfile>(() => {
    const saved = localStorage.getItem(PROFILE_KEY);
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem(STEP_KEY, String(step));
  }, [step]);

  useEffect(() => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }, [profile]);

  const handleFinish = () => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    localStorage.removeItem(STEP_KEY);
    navigate("/example");
  };

  const progressValue = step === 0 ? 0 : Math.round((step / 3) * 100);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Step indicator */}
      {step > 0 && (
        <div className="max-w-lg mx-auto w-full px-5 pt-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Step {step} of 3
            </span>
          </div>
          <Progress value={progressValue} className="h-1.5" />
        </div>
      )}

      <div className="flex-1 flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-lg">
          {step === 0 && <WelcomeStep onNext={() => setStep(1)} />}
          {step === 1 && (
            <BasicDetailsStep
              profile={profile}
              onChange={setProfile}
              onNext={() => setStep(2)}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <InterestsStep
              profile={profile}
              onChange={setProfile}
              onFinish={handleFinish}
              onBack={() => setStep(1)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

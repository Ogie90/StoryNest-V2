import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import WelcomeStep from "@/components/onboarding/WelcomeStep";
import BasicDetailsStep from "@/components/onboarding/BasicDetailsStep";
import InterestsStep from "@/components/onboarding/InterestsStep";
import AvoidStep from "@/components/onboarding/AvoidStep";
import PhotoUploadStep from "@/components/onboarding/PhotoUploadStep";
import StoryDirectionStep from "@/components/onboarding/StoryDirectionStep";
import ReviewStep from "@/components/onboarding/ReviewStep";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen } from "lucide-react";
import {
  getProfileById,
  getStoryById,
  toStoredProfile,
  setActiveProfile,
} from "@/lib/storage";
import {
  upsertProfile,
  fetchStoryById as fetchStoryByIdAsync,
  createStoryFromProfileAsync,
} from "@/lib/supabase-storage";

export interface ChildProfile {
  name: string;
  age: number;
  readingLevel: string;
  interests: string[];
  favoriteThings: string;
  avoidTopics: string[];
  avoidFreeText: string;
  photos: string[]; // base64 data URLs
  storyTone: string;
}

const PROFILE_KEY = "storynest-child-profile";
const STEP_KEY = "storynest-onboarding-step";
const TOTAL_STEPS = 7; // 0=welcome, 1-6 = actual steps

const STEP_LABELS = ["", "Details", "Interests", "Avoid", "Photos", "Tone", "Review"];

const defaultProfile: ChildProfile = {
  name: "",
  age: 5,
  readingLevel: "Beginner",
  interests: [],
  favoriteThings: "",
  avoidTopics: [],
  avoidFreeText: "",
  photos: [],
  storyTone: "Adventurous",
};

const Onboarding = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const editProfileId = searchParams.get("edit");
  const isNew = searchParams.get("new") === "true";
  const resumeStoryId = searchParams.get("story");

  const [step, setStep] = useState(() => {
    if (editProfileId || isNew) return 1;
    const saved = localStorage.getItem(STEP_KEY);
    return saved ? Number(saved) : 0;
  });

  const [animDir, setAnimDir] = useState<"forward" | "back">("forward");

  const [profile, setProfile] = useState<ChildProfile>(() => {
    if (editProfileId) {
      const existing = getProfileById(editProfileId);
      if (existing) return existing;
    }
    if (resumeStoryId) {
      const story = getStoryById(resumeStoryId);
      if (story) {
        const linked = getProfileById(story.profileId);
        if (linked) return linked;
      }
    }
    if (isNew) return defaultProfile;
    const saved = localStorage.getItem(PROFILE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultProfile, ...parsed };
    }
    return defaultProfile;
  });

  const goTo = (target: number) => {
    setAnimDir(target > step ? "forward" : "back");
    setStep(target);
  };

  useEffect(() => {
    if (!editProfileId && !isNew && !resumeStoryId) {
      localStorage.setItem(STEP_KEY, String(step));
    }
  }, [step, editProfileId, isNew, resumeStoryId]);

  useEffect(() => {
    if (!editProfileId && !isNew && !resumeStoryId) {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    }
  }, [profile, editProfileId, isNew, resumeStoryId]);

  const handleFinish = async () => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    localStorage.removeItem(STEP_KEY);

    if (editProfileId) {
      const stored = toStoredProfile(profile, editProfileId);
      await upsertProfile(stored);
      navigate("/profiles");
      return;
    }

    if (resumeStoryId) {
      const story = getStoryById(resumeStoryId);
      if (story) {
        const stored = toStoredProfile(profile, story.profileId);
        await upsertProfile(stored);
        setActiveProfile(stored);
        navigate(`/generating?story=${resumeStoryId}`);
      } else {
        navigate("/generating");
      }
      return;
    }

    if (isNew) {
      const stored = toStoredProfile(profile);
      await upsertProfile(stored);
      setActiveProfile(stored);
      const story = await createStoryFromProfileAsync(stored.id, profile.storyTone, "preview");
      navigate(`/generating?story=${story.id}`);
      return;
    }

    const stored = toStoredProfile(profile);
    await upsertProfile(stored);
    setActiveProfile(stored);
    navigate("/generating");
  };

  const progressValue = step === 0 ? 0 : Math.round((step / (TOTAL_STEPS - 1)) * 100);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with progress */}
      {step > 0 && (
        <div className="max-w-lg mx-auto w-full px-5 pt-6 pb-2">
          {/* Top bar: back + branding */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => goTo(Math.max(0, step - 1))}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={14} />
              Back
            </button>
            <Link to="/" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <BookOpen size={16} />
              <span className="text-sm font-semibold">StoryNest</span>
            </Link>
          </div>

          {/* Step indicator dots */}
          <div className="flex items-center gap-1 mb-2">
            {STEP_LABELS.slice(1).map((label, i) => {
              const stepNum = i + 1;
              const isActive = stepNum === step;
              const isDone = stepNum < step;
              return (
                <div key={label} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`h-1.5 w-full rounded-full transition-all duration-300 ${
                      isDone
                        ? "bg-primary"
                        : isActive
                        ? "bg-primary/70"
                        : "bg-border"
                    }`}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-primary">
              {STEP_LABELS[step]}
            </span>
            <span className="text-xs text-muted-foreground">
              {step} of {TOTAL_STEPS - 1}
            </span>
          </div>
        </div>
      )}

      {/* Step content */}
      <div className="flex-1 flex items-center justify-center px-5 py-8 sm:py-12">
        <div
          key={step}
          className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          {step === 0 && <WelcomeStep onNext={() => goTo(1)} />}
          {step === 1 && (
            <BasicDetailsStep
              profile={profile}
              onChange={setProfile}
              onNext={() => goTo(2)}
              onBack={() => goTo(0)}
            />
          )}
          {step === 2 && (
            <InterestsStep
              profile={profile}
              onChange={setProfile}
              onNext={() => goTo(3)}
              onBack={() => goTo(1)}
            />
          )}
          {step === 3 && (
            <AvoidStep
              profile={profile}
              onChange={setProfile}
              onNext={() => goTo(4)}
              onBack={() => goTo(2)}
            />
          )}
          {step === 4 && (
            <PhotoUploadStep
              profile={profile}
              onChange={setProfile}
              onNext={() => goTo(5)}
              onBack={() => goTo(3)}
            />
          )}
          {step === 5 && (
            <StoryDirectionStep
              profile={profile}
              onChange={setProfile}
              onNext={() => goTo(6)}
              onBack={() => goTo(4)}
            />
          )}
          {step === 6 && (
            <ReviewStep
              profile={profile}
              onEdit={goTo}
              onFinish={handleFinish}
            />
          )}
        </div>
      </div>

      {/* Footer microcopy */}
      {step > 0 && (
        <div className="text-center pb-6 px-5">
          <p className="text-xs text-muted-foreground">
            Your data stays private and is only used to personalise the story.
          </p>
        </div>
      )}
    </div>
  );
};

export default Onboarding;

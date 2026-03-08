import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import WelcomeStep from "@/components/onboarding/WelcomeStep";
import BasicDetailsStep from "@/components/onboarding/BasicDetailsStep";
import InterestsStep from "@/components/onboarding/InterestsStep";
import AvoidStep from "@/components/onboarding/AvoidStep";
import PhotoUploadStep from "@/components/onboarding/PhotoUploadStep";
import StoryDirectionStep from "@/components/onboarding/StoryDirectionStep";
import ReviewStep from "@/components/onboarding/ReviewStep";
import { Progress } from "@/components/ui/progress";
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
    if (editProfileId || isNew) return 1; // skip welcome for edit/new
    const saved = localStorage.getItem(STEP_KEY);
    return saved ? Number(saved) : 0;
  });

  const [profile, setProfile] = useState<ChildProfile>(() => {
    // Edit existing profile
    if (editProfileId) {
      const existing = getProfileById(editProfileId);
      if (existing) return existing;
    }

    // Resume a draft story — load linked profile
    if (resumeStoryId) {
      const story = getStoryById(resumeStoryId);
      if (story) {
        const linked = getProfileById(story.profileId);
        if (linked) return linked;
      }
    }

    // New profile — start fresh
    if (isNew) return defaultProfile;

    // Legacy behavior
    const saved = localStorage.getItem(PROFILE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultProfile, ...parsed };
    }
    return defaultProfile;
  });

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

  const handleFinish = () => {
    // Always save to legacy for backward compat
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    localStorage.removeItem(STEP_KEY);

    if (editProfileId) {
      // Update existing profile in storage (same id = update, not duplicate)
      const stored = toStoredProfile(profile, editProfileId);
      saveProfile(stored);
      navigate("/profiles");
      return;
    }

    if (resumeStoryId) {
      // Resume draft story — update linked profile and story status
      const story = getStoryById(resumeStoryId);
      if (story) {
        const stored = toStoredProfile(profile, story.profileId);
        saveProfile(stored);
        setActiveProfile(stored);
        navigate(`/generating?story=${resumeStoryId}`);
      } else {
        navigate("/generating");
      }
      return;
    }

    if (isNew) {
      // Save new profile and create a story
      const stored = toStoredProfile(profile);
      saveProfile(stored);
      setActiveProfile(stored);
      const story = createStoryFromProfile(stored.id, profile.storyTone, "preview");
      navigate(`/generating?story=${story.id}`);
      return;
    }

    // Legacy flow — also save to new storage
    const stored = toStoredProfile(profile);
    saveProfile(stored);
    setActiveProfile(stored);
    navigate("/generating");
  };

  const progressValue = step === 0 ? 0 : Math.round((step / (TOTAL_STEPS - 1)) * 100);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {step > 0 && (
        <div className="max-w-lg mx-auto w-full px-5 pt-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Step {step} of {TOTAL_STEPS - 1}
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
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <AvoidStep
              profile={profile}
              onChange={setProfile}
              onNext={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <PhotoUploadStep
              profile={profile}
              onChange={setProfile}
              onNext={() => setStep(5)}
              onBack={() => setStep(3)}
            />
          )}
          {step === 5 && (
            <StoryDirectionStep
              profile={profile}
              onChange={setProfile}
              onNext={() => setStep(6)}
              onBack={() => setStep(4)}
            />
          )}
          {step === 6 && (
            <ReviewStep
              profile={profile}
              onEdit={setStep}
              onFinish={handleFinish}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  migrateFromLegacy,
  getProfiles,
  deleteProfile,
  getStoriesForProfile,
  deleteStory,
  type StoredProfile,
} from "@/lib/storage";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, Pencil, Plus, Trash2, User } from "lucide-react";

const Profiles = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<StoredProfile[]>([]);

  useEffect(() => {
    migrateFromLegacy();
    setProfiles(getProfiles());
  }, []);

  const handleDelete = (id: string) => {
    // Delete associated stories first
    const stories = getStoriesForProfile(id);
    stories.forEach((s) => deleteStory(s.id));
    deleteProfile(id);
    setProfiles(getProfiles());
  };

  if (profiles.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-5">
        <div className="text-center space-y-6 max-w-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">No Profiles Yet</h1>
            <p className="text-sm text-muted-foreground">
              Create a child profile to start building personalised stories.
            </p>
          </div>
          <Button className="rounded-full px-8" onClick={() => navigate("/onboarding?new=true")}>
            <Plus size={16} className="mr-2" /> Add New Profile
          </Button>
          <div>
            <Link to="/library" className="text-sm text-muted-foreground hover:text-foreground underline">
              Back to Library
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="bg-primary/5 py-10 px-5">
        <div className="max-w-2xl mx-auto">
          <Link
            to="/library"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft size={14} /> Library
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Child Profiles</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {profiles.length} {profiles.length === 1 ? "profile" : "profiles"}
              </p>
            </div>
            <Button
              className="rounded-full gap-2"
              onClick={() => navigate("/onboarding?new=true")}
            >
              <Plus size={16} /> Add Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 mt-6 space-y-4">
        {profiles.map((profile) => {
          const storyCount = getStoriesForProfile(profile.id).length;
          return (
            <Card key={profile.id}>
              <CardContent className="p-5 flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  {profile.photos?.length ? (
                    <img
                      src={profile.photos[0]}
                      alt={profile.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <User size={20} className="text-primary" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">{profile.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Age {profile.age} · {profile.readingLevel}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {(profile.interests || []).slice(0, 3).map((i) => (
                      <Badge key={i} variant="secondary" className="text-[10px]">
                        {i}
                      </Badge>
                    ))}
                    {storyCount > 0 && (
                      <span className="text-[10px] text-muted-foreground ml-1">
                        · {storyCount} {storyCount === 1 ? "story" : "stories"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(`/onboarding?edit=${profile.id}`)}
                  >
                    <Pencil size={14} />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 size={14} className="text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete {profile.name}'s profile?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will also delete all stories created for {profile.name}. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(profile.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Profiles;

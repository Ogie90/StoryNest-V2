export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          child_name: string;
          age: number | null;
          reading_level: string | null;
          interests: string[] | null;
          favorites: string | null;
          avoid_topics: string[] | null;
          avoid_free_text: string | null;
          story_tone: string | null;
          avatar_url: string | null;
          photos: string[] | null;
          user_id: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          child_name: string;
          age?: number | null;
          reading_level?: string | null;
          interests?: string[] | null;
          favorites?: string | null;
          avoid_topics?: string[] | null;
          avoid_free_text?: string | null;
          story_tone?: string | null;
          avatar_url?: string | null;
          photos?: string[] | null;
          user_id?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          child_name?: string;
          age?: number | null;
          reading_level?: string | null;
          interests?: string[] | null;
          favorites?: string | null;
          avoid_topics?: string[] | null;
          avoid_free_text?: string | null;
          story_tone?: string | null;
          avatar_url?: string | null;
          photos?: string[] | null;
          user_id?: string | null;
        };
      };
      stories: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          profile_id: string;
          title: string;
          subtitle: string | null;
          summary: string | null;
          dedication: string | null;
          tone: string | null;
          status: string;
          pages: Json | null;
          edits: Json | null;
          user_id: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          profile_id: string;
          title: string;
          subtitle?: string | null;
          summary?: string | null;
          dedication?: string | null;
          tone?: string | null;
          status?: string;
          pages?: Json | null;
          edits?: Json | null;
          user_id?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          profile_id?: string;
          title?: string;
          subtitle?: string | null;
          summary?: string | null;
          dedication?: string | null;
          tone?: string | null;
          status?: string;
          pages?: Json | null;
          edits?: Json | null;
          user_id?: string | null;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}

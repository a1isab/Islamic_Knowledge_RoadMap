export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          goals: string[] | null
          study_minutes_daily: number | null
          created_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          goals?: string[] | null
          study_minutes_daily?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          goals?: string[] | null
          study_minutes_daily?: number | null
          created_at?: string
        }
      }
      roadmaps: {
        Row: {
          id: string
          slug: string
          title: string
          description: string | null
          category: string
          icon: string | null
          sort_order: number
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description?: string | null
          category: string
          icon?: string | null
          sort_order?: number
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string | null
          category?: string
          icon?: string | null
          sort_order?: number
        }
      }
      nodes: {
        Row: {
          id: string
          roadmap_id: string
          title: string
          description: string | null
          difficulty: string
          estimated_hours: number | null
          prerequisites: Json | null
          position: Json | null
          sort_order: number
          stage: number | null
        }
        Insert: {
          id?: string
          roadmap_id: string
          title: string
          description?: string | null
          difficulty: string
          estimated_hours?: number | null
          prerequisites?: Json | null
          position?: Json | null
          sort_order?: number
          stage?: number | null
        }
        Update: {
          id?: string
          roadmap_id?: string
          title?: string
          description?: string | null
          difficulty?: string
          estimated_hours?: number | null
          prerequisites?: Json | null
          position?: Json | null
          sort_order?: number
          stage?: number | null
        }
      }
      resources: {
        Row: {
          id: string
          node_id: string
          title: string
          type: string
          url: string | null
          author: string | null
          description: string | null
          is_verified: boolean | null
        }
        Insert: {
          id?: string
          node_id: string
          title: string
          type: string
          url?: string | null
          author?: string | null
          description?: string | null
          is_verified?: boolean | null
        }
        Update: {
          id?: string
          node_id?: string
          title?: string
          type?: string
          url?: string | null
          author?: string | null
          description?: string | null
          is_verified?: boolean | null
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          node_id: string
          status: string
          notes: string | null
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          node_id: string
          status?: string
          notes?: string | null
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          node_id?: string
          status?: string
          notes?: string | null
          completed_at?: string | null
        }
      }
      study_plans: {
        Row: {
          id: string
          user_id: string
          title: string | null
          weekly_schedule: Json
          is_ai_generated: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title?: string | null
          weekly_schedule: Json
          is_ai_generated?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string | null
          weekly_schedule?: Json
          is_ai_generated?: boolean | null
          created_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          slug: string
          title: string
          description: string | null
          icon: string | null
          criteria: Json
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description?: string | null
          icon?: string | null
          criteria: Json
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string | null
          icon?: string | null
          criteria?: Json
        }
      }
      user_achievements: {
        Row: {
          user_id: string
          achievement_id: string
          earned_at: string
        }
        Insert: {
          user_id: string
          achievement_id: string
          earned_at?: string
        }
        Update: {
          user_id?: string
          achievement_id?: string
          earned_at?: string
        }
      }
      bookmarks: {
        Row: {
          id: string
          user_id: string
          resource_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          resource_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          resource_id?: string
          created_at?: string
        }
      }
    }
  }
}

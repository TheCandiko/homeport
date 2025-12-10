export type Database = {
  public: {
    Tables: {
      logged_days: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          leetcode_problems: number;
          dsa_hours: number;
          workout: boolean;
          project_hours: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          leetcode_problems?: number;
          dsa_hours?: number;
          workout?: boolean;
          project_hours?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          leetcode_problems?: number;
          dsa_hours?: number;
          workout?: boolean;
          project_hours?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};

export type LoggedDay = Database['public']['Tables']['logged_days']['Row'];

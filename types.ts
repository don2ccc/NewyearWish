export interface Wish {
  id: number | string;
  content: string;
  name: string;
  created_at: string;
  is_mock?: boolean;
}

export interface SupabaseConfig {
  url: string;
  key: string;
}
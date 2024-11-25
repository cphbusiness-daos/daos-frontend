export type Ensemble = {
  _id: string;
  __v: number;
  name: string;
  imageUrl: string;
  description: string;
  website: string;
  zip_code: string;
  city: string;
  active_musicians: "1-4" | "5-9" | "10-24" | "25-49" | "50+";
  practice_frequency:
    | "daily"
    | "weekly"
    | "bi-weekly"
    | "monthly"
    | "bi-monthly";
  ensemble_type: Array<"continuous" | "project_based">;
  genre: Array<
    | "baroque"
    | "folk"
    | "chamber"
    | "romantic"
    | "late-modern"
    | "late-romantic"
    | "symphonic"
  >;
  admin_user_id: string;
  created_at: string;
  updated_at?: string;
  deactivated_at?: string;
};

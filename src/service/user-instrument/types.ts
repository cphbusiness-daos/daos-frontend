export type UserInstrument = {
  _id: string;
  __v: number;
  name: string;
  userId: string;
  instrumentId: string;
  experience: string;
  description: string;
  genre: Array<
    | "baroque"
    | "folk"
    | "chamber"
    | "romantic"
    | "late-modern"
    | "late-romantic"
    | "symphonic"
  >;
  createdAt: string;
  updatedAt?: string;
  deactivatedAt?: string;
};

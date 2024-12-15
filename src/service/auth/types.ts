export type User = UserBase & {
  updatedAt?: string;
  address?: string;
  bio?: string;
  deactivatedAt?: string;
  newsletterOptInAt?: string;
  phoneNumber?: string;
  birthDate?: string;
};

export type UserBase = {
  _id: string;
  __v: number;
  email: string;
  fullName: string;
  acceptedTocAt: string;
  created_at: string;
};

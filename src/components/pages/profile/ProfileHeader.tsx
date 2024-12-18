import { Link } from "@tanstack/react-router";
import { UserIcon } from "lucide-react";

import { Button } from "~/components/Button";
import type { User } from "~/service/auth/types";

export function ProfileHeader({ user }: { user: User }) {
  const { created_at, fullName } = user;

  return (
    <div className="flex flex-col gap-y-6 border-b border-gray-normal bg-white p-10">
      <div className="flex items-center gap-x-6">
        <div className="flex size-24 items-center justify-center rounded-2xl border-4 border-white bg-neutral-200 shadow-md">
          <UserIcon size={40} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xl font-bold text-primary-red">{fullName}</p>
          <p className="text-primary-blue">
            Created {new Date(created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="flex max-w-md gap-x-4">
        <Link resetScroll={true} to="/profile/edit" className="w-full">
          <Button variant="secondary" className="w-full">
            Rediger profil
          </Button>
        </Link>
        <Button variant="secondary" className="w-full">
          Indstillinger
        </Button>
      </div>
    </div>
  );
}

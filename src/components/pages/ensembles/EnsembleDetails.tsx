import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

import { Badge } from "~/components/Badge";
import { Button } from "~/components/Button";
import { Heading } from "~/components/Heading";
import { Route } from "~/routes/ensembles/$ensembleId";
import { EnsembleService } from "~/service/ensembles/ensemble-service";
import { useSession } from "~/stores/AuthStore";

export function EnsembleDetails() {
  const { ensemble, userEnsemble } = Route.useLoaderData();
  const router = useRouter();
  const { session } = useSession();

  const { mutateAsync: joinEnsemble } = useMutation({
    mutationFn: async () =>
      await EnsembleService.addUserToEnsemble({
        ensembleId: ensemble!._id,
      }),
    onSuccess: async () => {
      await router.invalidate();
      toast.success("Du er nu medlem af ensemblet");
    },
    onError: (error) => toast.error(error.message),
  });

  if (!ensemble) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-4 border-y border-gray-normal bg-white p-4">
      <EnsembleDetail title="Beskrivelse" children={ensemble.description} />
      <EnsembleDetail
        title="Antal aktive musikere"
        children={ensemble.active_musicians}
      />
      <EnsembleDetail
        title="Øvefrekvens"
        children={ensemble.practice_frequency}
      />
      <EnsembleDetail
        title="Ensemblet spiller..."
        children={ensemble.ensemble_type
          .map((type) =>
            type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
          )
          .join(", ")}
      />

      <EnsembleDetail
        title="Genre"
        children={
          <div className="flex flex-wrap gap-2">
            {ensemble.genre.map((genre) => (
              <Badge key={genre} variant="genre">
                {genre}
              </Badge>
            ))}
          </div>
        }
      />

      {ensemble.admin && (
        <EnsembleDetail
          title="Kontaktperson"
          children={
            <div className="flex items-center justify-between">
              <p>{ensemble.admin?.fullName}</p>
              <Link
                resetScroll={true}
                to="/users/$userId"
                params={{ userId: ensemble.admin._id }}
                search={{ page: 1 }}
              >
                <Button variant="secondary" size="sm">
                  Vis profil
                </Button>
              </Link>
            </div>
          }
        />
      )}

      <a href={ensemble.website} target="_blank">
        <Button variant="secondary" size="lg" className="w-full">
          Vis hjemmeside
        </Button>
      </a>
      {!userEnsemble && (
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={async () => await joinEnsemble()}
        >
          Bliv medlem
        </Button>
      )}
      {session?.user?.id === ensemble.admin?._id && (
        <Link
          to="/ensembles/$ensembleId/edit"
          params={{ ensembleId: ensemble._id }}
        >
          <Button variant="primary" size="lg" className="w-full">
            Rediger ensemble
          </Button>
        </Link>
      )}
    </div>
  );
}

function EnsembleDetail({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-y-2">
      <Heading variant="h3" className="text-lg">
        {title}
      </Heading>
      <p className="text-gray-dark">{children}</p>
    </div>
  );
}

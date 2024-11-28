import { Link } from "@tanstack/react-router"

import { Badge } from "~/components/Badge"
import { Button } from "~/components/Button"
import { Heading } from "~/components/Heading"
import { Route } from "~/routes/ensembles/$ensembleId"

export function EnsembleDetails() {
  const ensemble = Route.useLoaderData()

  let x: number | undefined
  x = 2
  x ||= 1
  x ??= 1

  if (!ensemble) {
    return null
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
        children={ensemble.ensemble_type.join(", ")}
      />

      <EnsembleDetail
        title="Genre"
        children={
          <div className="flex gap-2">
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
              {/* TODO: add correct href */}
              <Link>
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
      {/* TODO: add join ensemble logic */}
      <Button variant="primary" size="lg" className="w-full">
        Bliv medlem
      </Button>
    </div>
  )
}

function EnsembleDetail({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-y-2">
      <Heading variant="h3" className="text-lg">
        {title}
      </Heading>
      <p className="text-gray-dark">{children}</p>
    </div>
  )
}

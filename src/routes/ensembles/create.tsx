import { createFileRoute } from "@tanstack/react-router"
import { useCallback } from "react"

import { Button } from "~/components/Button"
import { Heading } from "~/components/Heading"
import { CheckBox, Input } from "~/components/Input"
import { Label } from "~/components/Label"
import { Select } from "~/components/Select"
import { Textarea } from "~/components/TextArea"

export const Route = createFileRoute("/ensembles/create")({
  component: RouteComponent,
})

const activeMusicians = ["1-4", "5-9", "10-24", "25-49", "50+"] as const
const practiceFrequency = [
  "daily",
  "weekly",
  "bi-weekly",
  "monthly",
  "bi-monthly",
] as const
const genres = [
  "baroque",
  "folk",
  "chamber",
  "romantic",
  "late-modern",
  "late-romantic",
  "symphonic",
] as const
const ensembleTypes = ["continuous", "project_based"] as const

function RouteComponent() {
  const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    console.log(data)
  }, [])

  return (
    <form className="flex flex-col gap-y-6 p-4 pb-16 pt-8" onSubmit={onSubmit}>
      <Heading variant="h1">Create Ensemble</Heading>

      <div>
        <Label htmlFor="name">Ensemble name</Label>
        <Input name="name" placeholder="Ensemble name" id="name" />
      </div>

      <div>
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input name="imageUrl" placeholder="Image URL" id="imageUrl" />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          placeholder="Skriv en kort beskrivelse af jeres ensemble eller orkester..."
          id="description"
          className="max-h-32"
        />
      </div>

      <div>
        <Label htmlFor="homepage">Homepage</Label>
        <Input name="homepage" placeholder="Homepage" id="homepage" />
      </div>

      <div className="flex gap-x-4">
        <div className="w-1/3">
          <Label htmlFor="zip">Zip</Label>
          <Input name="zip" placeholder="Zip" id="zip" />
        </div>
        <div className="flex-1">
          <Label htmlFor="city">City</Label>
          <Input name="city" placeholder="City" id="city" />
        </div>
      </div>

      <div>
        <Label htmlFor="activeMusicians">Active musicians</Label>
        <Select name="activeMusicians" id="activeMusicians">
          {activeMusicians.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="practiceFrequency">Practice frequency</Label>
        <Select name="practiceFrequency" id="practiceFrequency">
          {practiceFrequency.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="ensembleType">Ensemble type</Label>
        {ensembleTypes.map((value) => (
          <div key={value} className="flex items-center gap-x-2">
            <CheckBox name="ensembleType" value={value} id={value} />
            <p className="text-primary-blue">
              {value
                .split("_")
                .map((word) => word[0].toUpperCase() + word.slice(1))
                .join(" ")}
            </p>
          </div>
        ))}
      </div>

      <div>
        <Label htmlFor="genres">Genres</Label>
        <Select name="genres" id="genres">
          {genres.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </div>

      <Button type="submit" className="mt-5">
        Create ensemble
      </Button>
    </form>
  )
}

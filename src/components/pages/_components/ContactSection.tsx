import { Mail } from "lucide-react";

export function IndexContact() {
  return (
    <section className="flex h-40 flex-col items-center justify-center gap-3 bg-white text-center text-primary-blue lg:flex-row lg:gap-6 lg:text-left">
      <Mail size={32} />
      <div className="flex max-w-96 flex-col justify-center lg:gap-3">
        <h2 className="font-bold">Hvad synes du om Musik Samspil?</h2>
        <p>
          Vi vil gerne høre fra dig, hvis du har ideer til hvordan vi kan gøre
          oplevelsen bedre.
        </p>
      </div>
    </section>
  );
}

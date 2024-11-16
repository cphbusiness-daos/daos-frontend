import { ratings } from "./ratings-list";

export function Ratings() {
  return (
    <section className="h-[calc(100vh-25rem)] bg-primary-blue px-6 py-10 lg:h-[calc(100vh-20rem)] lg:px-36">
      <h1 className="pb-6 text-3xl font-bold text-white">
        Det siger vores brugere
      </h1>
      <div className="flex flex-row gap-4 overflow-x-auto lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible">
        {ratings.map((rating, index) => (
          <RatingCard
            key={index}
            imageSrc={rating.reviewImg}
            text={rating.reviewText}
            reviewerName="Sofie"
            reviewerDescription="Fra kvartetten Klassisk Amok"
          />
        ))}
      </div>
    </section>
  );
}

function RatingCard({
  imageSrc,
  reviewerDescription,
  reviewerName,
  text,
}: {
  text: string;
  imageSrc: string;
  reviewerName: string;
  reviewerDescription: string;
}) {
  return (
    <div className="flex h-[360px] w-[90%] flex-shrink-0 flex-col items-center justify-between rounded-md bg-white p-6 text-center lg:h-[420px] lg:w-full">
      <div className="relative py-5">
        <p className="text-start text-[60px] leading-3 text-primary-blue opacity-10">
          “
        </p>
        <p className="break-words text-primary-blue">{text}</p>
        <p className="absolute h-fit text-end text-[60px] leading-10 text-primary-blue opacity-10">
          ”
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-1">
        <img
          src={imageSrc}
          alt="Reviewer's profile picture"
          width={40}
          height="auto"
        />
        <p className="max-w-[90%] truncate text-base font-bold text-primary-red md:max-w-[80%]">
          {reviewerName}
        </p>
        <p className="max-w-[90%] truncate text-base text-gray-dark md:max-w-[80%]">
          {reviewerDescription}
        </p>
      </div>
    </div>
  );
}

import RatingCard from "./atoms/ratingCard";

export default function Ratings() {
  return (
    <div className="bg-blue text-5xl py-10 px-16">
        <h1 className="font-bold mb-6">Det siger vores brugere</h1>
        <div className="flex flex-row justify-between gap-6">
            <RatingCard reviewImg="../../img/rating1.png" reviewText="Musik Samspil hjalp os med at finde sammen. Først var det meningen, at vi bare skulle mødes en enkelt gang, men det var bare så fedt, at nu mødes vi hver anden uge!" reviewName="Sofie" ReviewBand="Fra kvartetten Klassisk Amok"></RatingCard>
            <RatingCard reviewImg="../../img/rating2.png" reviewText="“Vi stod over for at mangle både en trompetist og en fløjtenist til vores nytårskoncert - men med Musik Samspil fandt vi assistenter i løbet af få timer. Noget der ellers kan holde mig søvnløs i flere nætter!" reviewName="Anitta" ReviewBand="Koordinator i VirumOrkestret"></RatingCard>
            <RatingCard reviewImg="../../img/rating1.png" reviewText="Musik Samspil hjalp os med at finde sammen. Først var det meningen, at vi bare skulle mødes en enkelt gang, men det var bare så fedt, at nu mødes vi hver anden uge!" reviewName="Sofie" ReviewBand="Fra kvartetten Klassisk Amok"></RatingCard>
        </div>
    </div>
  )
}

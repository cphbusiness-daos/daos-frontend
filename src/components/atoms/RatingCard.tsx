type reviewCard = {
    reviewText: string;
    reviewImg: string;
    reviewName: string;
    ReviewBand: string
}

export default function RatingCard({reviewImg, reviewName, reviewText, ReviewBand}: reviewCard) {
    return (
        <div className="bg-white w-2/5 flex flex-col rounded-xl">
            <p className="text-7xl text-darkGrey2 self-start w-4/6 ml-8 mt-2">"</p>
            <p className="relative text-blue -top-8 text-base self-center w-5/6 text-center">{reviewText}</p>
            <p className=" relative text-7xl text-darkGrey2 -top-8 w-1/6 self-end">"</p>
            <div className="relative flex items-center justify-end flex-col w-6/6 -top-8">
                <img src={reviewImg} className="w-10" alt="" />
                <p className="text-base font-bold text-red">{reviewName}</p>
                <p className="text-base text-darkGrey2 font-light">{ReviewBand}</p>
            </div>
        </div>
    )
}

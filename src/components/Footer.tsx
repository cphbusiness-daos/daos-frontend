import Button from "./atoms/button";

export default function Footer() {
    function handleSeePostsClick() {
        console.log("Hello from see posts button");
    }

    function handleProfileClick() {
        console.log("Hello from see posts button");
    }

    return (
        <div className="h-60 bg-red flex justify-around items-center">
            <div className=" flex flex-col gap-10">
                <h1 className="font-bold text-2xl text-white">Musik Samspil</h1>
                <div className="flex gap-10">
                    <Button buttonText="Se opslag" onClick={handleSeePostsClick} variant="noBGWhite"></Button>
                    <Button buttonText="Profil" onClick={handleProfileClick} variant="noBGWhite"></Button>
                </div>
                <div className="flex flex-row gap-4">
                    <img src="../../img/footer-facebook.svg" className="h-5" alt="" />
                    <img src="../../img/footer-instagram.svg" className="h-5" alt="" />
                    <img src="../../img/footer-linkedin.svg" className="h-5" alt="" />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center h-60">
                <img src="../../img/notes.svg" className="h-20" alt="" />
                <p className="text-lightGrey2">Privatlivspolitik</p>
            </div>
            <div className="h-60 flex items-center">
                <div className="flex flex-col bg-white p-8 rounded-2xl">
                    <p className="text-black">BRAGT TIL DIG AF</p>
                    <img src="../../img/DAOS_Seethrough.png" className="h-14" alt="" />
                </div>
            </div>
        </div>
    )
}

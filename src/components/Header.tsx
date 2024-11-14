import Button from "./atoms/Button";

function handlePostClick() {
    console.log("hello from post button");
}
function handleProfileClick() {
    console.log("hello from profile button");
}
function handleCreateUserClick() {
    console.log("hello from create user button");
}
function handleLoginClick() {
    console.log("hello login button");
}


export default function Header() {
    return (
        <header className="bg-white h-20 px-10 border-b-2 border-darkGrey2">
            <div className="flex items-center justify-between h-20">
                <div className="flex flex-col">
                    <h1 className="text-red font-bold text-3xl">Musik Samspil</h1>
                    <p className="text-blue">Skabt af DAOS - Dansk Amatørorkester Samvirke</p>
                </div>
                <div className="flex gap-6 items-center content-end h-20">
                    <Button buttonText="Opslag" onClick={handlePostClick} variant="noBGBlue" />
                    <Button buttonText="Profil" onClick={handleProfileClick} variant="noBGBlue" />
                    <Button buttonText="Opret bruger" onClick={handleCreateUserClick} variant="blueBG" />
                    <Button buttonText="Log ind" onClick={handleLoginClick} variant="whiteBG" />
                </div>
            </div>
        </header>

    )
}

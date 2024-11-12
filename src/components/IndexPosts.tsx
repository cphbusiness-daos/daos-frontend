import Button from "./atoms/button";

export default function IndexPosts() {

  function handleSeeAllPostClick() {
    console.log("Hello from see all posts button");

  }
  return (
    <div>
      <article className="flex justify-between my-10 px-10 h-96">
        <h1 className="text-4xl text-blue font-bold">Seneste Opslag</h1>
        <div>
          <Button buttonText="Se alle opslag" onClick={handleSeeAllPostClick} variant="noBGRed"></Button>
        </div>
      </article>
    </div>
  )
}

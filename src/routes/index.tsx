import { createFileRoute } from "@tanstack/react-router";

import Button from "../components/atoms/button";
import IndexContact from "../components/indexContact";
import IndexPosts from "../components/indexPosts";
import Ratings from "../components/ratings";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {

  function handleSeePostsClick() {
    console.log("Hello from see posts button");

  }

  return (
    <div className="flex bg-white flex-col">
      <main className="flex bg-white w-full items-center justify-center gap-24 h-96 my-40">
        <div className="flex flex-col w-3/6 gap-10">
          <p className="text-5xl text-red font-bold">Stedet hvor amatørmusikere finder hinanden og spiller musik sammen</p>
          <div className="flex gap-16">
            <Button buttonText="Se Opslag" onClick={handleSeePostsClick} variant="blueBG"></Button>
            <Button buttonText="Se Opslag" onClick={handleSeePostsClick} variant="blueBG"></Button>
          </div>
        </div>

        <img src="../../public/img/index_figure1.png" alt="" />
      </main>
      <Ratings></Ratings>
      <IndexPosts></IndexPosts>
      <IndexContact></IndexContact>
    </div>
  );
}

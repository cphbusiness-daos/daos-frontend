import { Link } from "@tanstack/react-router";

export function MobileFooter() {
  return (
    <footer className="flex h-[calc(100vh-55vh)] flex-col justify-between bg-primary-red p-10 text-xl text-white lg:hidden">
      <p className="text-2xl font-bold uppercase">Musik samspil</p>
      <div className="flex flex-col font-semibold">
        <Link to="/">Hjem</Link>
        <Link to="/">Find musiker</Link>
        <Link to="/ensembles" search={{ page: 1 }}>
          Find ensemble
        </Link>
        <Link to="/profile">Profil</Link>
      </div>
      <div className="flex flex-row gap-4">
        <Link href="https://facebook.com/" target="_blank">
          <img
            src="/img/footer-facebook.svg"
            width={20}
            height="auto"
            alt="Facebook icon"
          />
        </Link>
        <Link href="https://instagram.com/" target="_blank">
          <img
            src="/img/footer-instagram.svg"
            width={20}
            height="auto"
            alt="Instagram icon"
          />
        </Link>
        <Link href="https://linkedin.com/" target="_blank">
          <img
            src="/img/footer-linkedin.svg"
            width={20}
            height="auto"
            alt="Linkedin icon"
          />
        </Link>
      </div>

      <img
        src="/img/notes.svg"
        width={250}
        height="auto"
        alt="Illustration of a collection of musical sheet notes"
        className="mx-auto"
      />
    </footer>
  );
}

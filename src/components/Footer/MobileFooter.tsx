import { Link } from "@tanstack/react-router";

export function MobileFooter() {
  return (
    <footer className="flex h-[calc(100vh-55vh)] flex-col justify-between bg-primary-red p-10 text-xl text-white lg:hidden">
      <p className="text-2xl font-bold uppercase">Musik samspil</p>
      <div className="flex flex-col font-semibold">
        <Link resetScroll={true} to="/">
          Hjem
        </Link>
        <Link resetScroll={true} to="/">
          Find musiker
        </Link>
        <Link resetScroll={true} to="/ensembles" search={{ page: 1 }}>
          Find ensemble
        </Link>
        <Link resetScroll={true} to="/profile">
          Profil
        </Link>
      </div>
      <div className="flex flex-row gap-4">
        <a
          href="https://facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/img/footer-facebook.svg"
            width={20}
            height="auto"
            alt="Facebook icon"
          />
        </a>
        <a
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/img/footer-instagram.svg"
            width={20}
            height="auto"
            alt="Instagram icon"
          />
        </a>
        <a
          href="https://linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/img/footer-linkedin.svg"
            width={20}
            height="auto"
            alt="Linkedin icon"
          />
        </a>
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

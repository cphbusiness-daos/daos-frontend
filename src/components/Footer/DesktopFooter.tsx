import { Link } from "@tanstack/react-router";

export function DesktopFooter() {
  return (
    <footer className="hidden h-[calc(100vh-70vh)] flex-col items-center justify-between bg-primary-red px-12 text-white lg:flex">
      <div className="grid w-full flex-1 grid-cols-3 items-center gap-8">
        {/* Column 1 */}
        <div className="flex flex-col items-start justify-center gap-6">
          <p className="text-2xl font-bold uppercase">Musik samspil</p>
          <div className="flex gap-4 font-semibold">
            <Link resetScroll={true} to="/">
              Se opslag
            </Link>
            <Link resetScroll={true} to="/profile" search={{ page: 1 }}>
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
        </div>

        {/* Column 2 */}
        <div className="flex items-center justify-center">
          <img
            src="/img/notes.svg"
            width={250}
            height="auto"
            alt="Illustration of a collection of musical sheet notes"
          />
        </div>

        {/* Column 3 */}
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="flex h-32 w-60 items-center justify-center rounded-md bg-white text-center text-primary-blue">
            DAOS
          </div>
        </div>
      </div>

      {/* Privacy Policy */}
      <div className="py-4 text-center text-sm">
        <Link resetScroll={true} to="/" className="text-white">
          Privatlivspolitik
        </Link>
      </div>
    </footer>
  );
}

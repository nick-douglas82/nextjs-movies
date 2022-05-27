import Link from "next/link"
import { useRouter } from "next/router"

export type SiteHeaderProps = {
  hideNav?: boolean
}

const SiteHeader: React.FC<SiteHeaderProps> = ({ hideNav }) => {
  const router = useRouter();

  return (
    <>
      <Link href="/">
        <a>
          <h1 className="text-6xl font-bold tracking-tighter text-center">
            <span className="text-orange-400">NextJS</span> Movies
          </h1>
        </a>
      </Link>
      {!hideNav && <nav className="w-full my-5">
        <ul className="flex items-center justify-center w-full">
          <li className={router.pathname == "/movies" ? "text-orange-400" : ""}>
            <Link href="/movies">
              <a className="mx-2"><span className="font-bold">Movies</span></a>
            </Link>
          </li>
          <li className={router.pathname == "/tv" ? "text-orange-400" : ""}>
            <Link href="/tv">
              <a className="mx-2"><span className="font-bold">TV</span></a>
            </Link>
          </li>
          <li className={router.pathname == "/people" ? "text-orange-400" : ""}>
            <Link href="/people">
              <a className="mx-2"><span className="font-bold">People</span></a>
            </Link>
          </li>
        </ul>
      </nav>}
    </>
  )
}
export default SiteHeader
import Head from 'next/head'
import Image from 'next/image'
import { GetStaticPaths, GetStaticProps } from 'next/types'
import { formatAge, formatLongMonthDate, formatYear } from '../../lib/helpers/date';
import SiteHeader from '../../components/SiteHeader'
import { formatPersonCredits } from '../../lib/helpers/format';
import List from '../../components/List';

export interface PersonData {
  person: {
    name: string;
    biography: string;
    birthday: string;
    deathday: string;
    known_for_department: string;
    place_of_birth: string;
    profile_path: string;
    gender: number;
  },
  credits: []
}

const Person = ({ person, credits }: PersonData) => {
  return (
    <div>
      <Head>
        <title>NextJs Movies</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto mt-10 max-w-7xl">
        <SiteHeader />

        <div className="flex">
          <div className="w-full max-w-[300px]">
            <div className="relative z-20 flex-shrink-0 mb-4 mr-9">
              <Image
                src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
                alt=""
                layout="raw"
                width={1024}
                height={768}
              />
            </div>
            <div className="mb-4 text-lg font-bold tracking-tighter">Gender:
              <div className="text-base font-normal tracking-normal">{person.gender === 1 ? 'Female' : 'Male'}</div>
            </div>
            <div className="mb-4 text-lg font-bold tracking-tighter">Born:
              <div className="text-base font-normal tracking-normal">{formatLongMonthDate(person.birthday)} {!person.deathday ? <span>({formatAge(person.birthday)} years old)</span> : null}</div>
            </div>
            {person.deathday ? <div className="mb-4 text-lg font-bold tracking-tighter">Died:
              <div className="text-base font-normal tracking-normal">{formatLongMonthDate(person.deathday)} <span>({formatAge(person.birthday, person.deathday)} years old)</span></div>
            </div> : null}
            <div className="mb-4 text-lg font-bold tracking-tighter">Known for:
              <div className="text-base font-normal tracking-normal">{person.known_for_department}</div>
            </div>
          </div>
          <div className="w-full mb-8">
            <h1 className="text-3xl font-bold tracking-tighter">{person.name}</h1>
            <h1 className="text-xl font-bold tracking-tighter text-orange-400">{person.place_of_birth}</h1>
            <h3 className="text-xl font-bold tracking-tighter mt-7">Biography</h3>
            <p className="text-gray-500">{person.biography}</p>

            <List title="Known for" listData={credits.slice(0, 6)} />
          </div>
        </div>
      </main>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context?.params?.id;

  let [personData, creditsData] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/person/${id}?api_key=e0c577647a14eae09f07aa14fee7caeb`),
    fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=e0c577647a14eae09f07aa14fee7caeb`),
  ]);

  const [person, creditsRaw] = await Promise.all([personData.json(), creditsData.json()]);

  const credits = formatPersonCredits(creditsRaw)

  return {
    props: {
      person,
      credits
    },
  };
};

export default Person
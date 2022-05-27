import Head from 'next/head'
import { InferGetStaticPropsType } from 'next'
import { Data, dataMutation } from '../lib/helpers/dataMutation'
import List from '../components/List'
import SiteHeader from '../components/SiteHeader'

const Tv = ({ tv }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <Head>
        <title>NextJs Movies</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto mt-10 max-w-7xl">
        <SiteHeader />
        <List title="Popular TV" listData={tv} />
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const results = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=e0c577647a14eae09f07aa14fee7caeb&page=1')
  const tvData = await results.json();

  const tv = tvData.results.map((data: Data) => dataMutation(data, "tv"));

  return {
    props: {
      tv
    }
  }
}



export default Tv
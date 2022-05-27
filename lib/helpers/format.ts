import parseISO from "date-fns/parseISO";
import compareDesc from "date-fns/compareDesc";
import type { MovieResponse, MovieResult, PersonCombinedCreditsResponse } from "moviedb-promise/dist/request-types";

export interface IListItem {
  id: number;
  type: string;
  poster: string;
  title: string;
  date?: string | null;
}

export interface Movie {
  id: number;
  type: string;
  poster_path: string;
  title: string;
  release_date: string;
}

export interface TvShow {
  id: number;
  type: string;
  poster_path: string;
  name: string;
  first_air_date: string;
}

export interface Person {
  id: number;
  name: string;
  birthday?: string;
  profile_path: string;
}

export const formatMovie = (movie: Movie): IListItem => {
  return {
    id: movie.id,
    type: "movie",
    poster: `https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`,
    title: movie.title,
    date: movie.release_date,
  };
};

export const formatTvShow = (tvShow: TvShow): IListItem => {
  return {
    id: tvShow.id,
    type: "tv",
    poster: `https://www.themoviedb.org/t/p/w220_and_h330_face${tvShow.poster_path}`,
    title: tvShow.name,
    date: tvShow.first_air_date,
  };
};

export const formatPerson = (person: Person): IListItem => {
  return {
    id: person.id,
    type: "person",
    poster: `https://www.themoviedb.org/t/p/w220_and_h330_face${person.profile_path}`,
    title: person.name,
    date: person.birthday || null,
  };
};

export const formatPersonCredits = (data: PersonCombinedCreditsResponse): IListItem[] => {
  const { cast } = data;

  if (!cast) {
    return [];
  }

  const sortedData = cast
    .filter((item) => item.release_date || item.first_air_date)
    .sort((a, b) => {
      const aDate = a.release_date ? parseISO(a.release_date) : a.first_air_date ? parseISO(a.first_air_date) : new Date();
      const bDate = b.release_date ? parseISO(b.release_date) : b.first_air_date ? parseISO(b.first_air_date) : new Date();

      return compareDesc(aDate, bDate);
    });

  return sortedData
    .map((result): IListItem | undefined => {
      if ("media_type" in result) {
        if (result.media_type === "movie") {
          return formatMovie(result as Movie);
        } else if (result.media_type === "tv") {
          return formatTvShow(result as TvShow);
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    })
    .filter((item: IListItem | undefined): item is IListItem => {
      return item !== undefined;
    });
};

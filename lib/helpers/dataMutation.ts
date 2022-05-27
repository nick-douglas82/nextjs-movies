export interface Data {
  title?: string;
  name?: string;
  poster_path: string;
  profile_path: string;
  media_type?: string;
  id: number;
  release_date?: string | null;
  first_air_date?: string | null;
}
const posterURL = "https://www.themoviedb.org/t/p/w220_and_h330_face";
export const dataMutation = (data: Data, type: string | null = null) => {
  let poster = "https://placehold.co/220x330";
  if (data.poster_path) {
    poster = `${posterURL}${data.poster_path}`;
  } else if (!data.poster_path && data.profile_path !== null) {
    poster = `${posterURL}${data.profile_path}`;
  }

  return {
    title: data.title ?? data.name,
    poster: poster,
    type: data.media_type || type || null,
    id: data.id,
    date: data.release_date || data.first_air_date || null,
  };
};

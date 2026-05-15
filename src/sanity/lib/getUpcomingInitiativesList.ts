import { sanityFetch } from './live';

export interface UpcomingInitiativeItem {
  _id: string;
  title: string;
  launchMonth?: string;
  launchYear: number;
  shortDescription: string;
  initialBackgroundColor: string;
}

export async function getUpcomingInitiativesList() {
  const query = `*[_type == "upcomingInitiative"]{
    _id,
    title,
    launchMonth,
    launchYear,
    shortDescription,
    initialBackgroundColor
  } | order(
    launchYear asc,
    select(
      launchMonth == "january" => 1,
      launchMonth == "february" => 2,
      launchMonth == "march" => 3,
      launchMonth == "april" => 4,
      launchMonth == "may" => 5,
      launchMonth == "june" => 6,
      launchMonth == "july" => 7,
      launchMonth == "august" => 8,
      launchMonth == "september" => 9,
      launchMonth == "october" => 10,
      launchMonth == "november" => 11,
      launchMonth == "december" => 12,
      0
    ) asc,
    _createdAt asc
  )`;

  const { data } = await sanityFetch({
    query,
    tags: ['upcomingInitiative'],
  });

  return data as UpcomingInitiativeItem[];
}

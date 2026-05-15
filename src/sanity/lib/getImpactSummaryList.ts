import { sanityFetch } from './live';

export interface ImpactSummaryItem {
  _id: string;
  impactNo: string;
  description: string;
  order: number;
}

export async function getImpactSummaryList() {
  const query = `*[_type == "impactSummary"]{
    _id,
    impactNo,
    description,
    order
  } | order(order asc, _createdAt asc)`;

  const { data } = await sanityFetch({
    query,
    tags: ['impactSummary'],
  });

  return data as ImpactSummaryItem[];
}

import { Approaches } from "./components/homepage/Approaches";
import EnockBanner from "./components/homepage/EnockBanner";
import { Ewfsf } from "./components/homepage/Ewfsf";
import { Give } from "./components/homepage/Give";
import HomepageHero from "./components/homepage/HomepageHero";
import { ImpactNumbers } from "./components/homepage/ImpactNumbers";
import { Newsletter } from "./components/homepage/Newsletter";
import { NewsStories } from "./components/homepage/NewsStories";
import { UpcomingInitiatives } from "./components/homepage/UpcomingInitiatives";
import Padgirl from "./components/homepage/Padgirl";
import { Sdg } from "./components/homepage/Sdg";


export default function Home() {
  return (
    <div>
      <HomepageHero />
      <Approaches />
      {/* <EnockBanner/> */}
      <Give/>
      <ImpactNumbers />
      <UpcomingInitiatives />
      {/* <Padgirl/> */}
      {/* <Ewfsf /> */}
      <NewsStories />
      <Sdg />
      {/* <Newsletter /> */}
    </div>
  );
}

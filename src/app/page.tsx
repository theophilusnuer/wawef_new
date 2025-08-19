import { EconomicPrograms } from "./components/homepage/EconomicPrograms";
import { Ewfsf } from "./components/homepage/Ewfsf";
import { Give } from "./components/homepage/Give";
import HomepageHero from "./components/homepage/HomepageHero";
import { ImpactNumbers } from "./components/homepage/ImpactNumbers";
import { Newsletter } from "./components/homepage/Newsletter";
import Padgirl from "./components/homepage/Padgirl";
import { Sdg } from "./components/homepage/Sdg";


export default function Home() {
  return (
    <div>
      <HomepageHero />
      <EconomicPrograms />
      <Give/>
      <ImpactNumbers />
      <Padgirl/>
      <Ewfsf />
      <Sdg />
      <Newsletter />
    </div>
  );
}

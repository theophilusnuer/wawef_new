import { EconomicPrograms } from "./components/homepage/EconomicPrograms";
import { Ewfsf } from "./components/homepage/Ewfsf";
import { Give } from "./components/homepage/Give";
import HomepageHero from "./components/homepage/HomepageHero";
import { ImpactNumbers } from "./components/homepage/ImpactNumbers";
import { Newsletter } from "./components/homepage/Newsletter";
import { Sdg } from "./components/homepage/Sdg";


export default function Home() {
  return (
    <div>
      <HomepageHero />
      <EconomicPrograms />
      <Give />
      <ImpactNumbers />
      <Ewfsf />
      <Sdg />
      <Newsletter />
    </div>
  );
}

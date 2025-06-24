import React from 'react'
import ImpactHerHero from '../components/impactHerSeries/ImpactHerHero'
import AboutSeries from '../components/impactHerSeries/AboutSeries'
import WhatToExpect from '../components/impactHerSeries/WhatToExpect'
import WhoThisIsFor from '../components/impactHerSeries/WhoThisIsFor'
import ImpactPartners from '../components/impactHerSeries/ImpactPartners'
import EventFlyer from '../components/impactHerSeries/EventFlyer'
import Testimonials from '../components/impactHerSeries/Testimonials'
import GHLForms from '../components/impactHerSeries/GHLForms'
import ImpactFooter from '../components/impactHerSeries/ImpactHerFooter'

const ImpactHerSeries = () => {
  return (
    <div>
        <ImpactHerHero/>
        <AboutSeries/>
        <WhatToExpect/>
        <WhoThisIsFor/>
        <ImpactPartners/>
        <EventFlyer/>
        <Testimonials/>
        <GHLForms/>
        <ImpactFooter/>
    </div>
  )
}

export default ImpactHerSeries
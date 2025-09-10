import Head from 'next/head'
import React from 'react'
import { AboutusHero } from '../components/aboutUs/AboutusHero'
import { Whoweare } from '../components/aboutUs/Whoweare'
import { Vision } from '../components/aboutUs/Vision'
import { Ewfsf } from '../components/homepage/Ewfsf'
import { Team } from '../components/aboutUs/Team'
import Enock from '../components/aboutUs/Enock'


const page = () => {
  return (
    <div>
      {/* SEO Meta Tags */}
      <Head>
        <title>Who We Are at WAWEF</title>
        <meta name="description" content="A team of experts that work relentlessly to empower and transform women livelihoods" />
      </Head>

      <AboutusHero/>
      <Whoweare/>
      <Vision/>
      <Enock/>
      <Ewfsf/>
      <Team/>
    </div>
  )
}

export default page
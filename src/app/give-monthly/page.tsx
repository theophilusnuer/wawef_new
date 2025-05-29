import React from 'react'
import { GiveMonthlyHero } from '../components/giveMonthly/GiveMonthlyHero'
import { Motivation } from '../components/giveMonthly/Motivation'
import { GalleryOfImpact } from '../components/giveMonthly/GalleryOfImpact'

const page = () => {
  return (
    <div>
      <GiveMonthlyHero />
      <Motivation/>
      <GalleryOfImpact/>
    </div>
  )
}

export default page
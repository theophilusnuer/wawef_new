import React from 'react'
import { ProgramsHero } from '../components/programs/ProgramsHero'
import { ProgramCard } from '../components/programs/ProgramsCard'
import { programsData } from '../components/programs/programsData'

const page = () => {
  return (
    <div>
      <ProgramsHero/>
      <div>
      {programsData.map((program, index) => (
            <ProgramCard key={index} program={program} />
          ))}
      </div>
    </div>
  )
}

export default page
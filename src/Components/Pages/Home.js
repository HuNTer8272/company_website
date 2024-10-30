

import React from 'react'
import Slider from '../Slider.js'
import WhyUS from "../WhyUs.js"
import Products from "../Products.js"

function Home({uid}) {
  return (
    <>
      <Slider/>
      <WhyUS/>
      <Products uid={uid}/>
    </>
  )
}

export default Home;
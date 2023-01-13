import React, { useState, useEffect } from 'react'
import GridLayout from 'react-grid-layout'
import { Carousel } from 'react-carousel-minimal'

function ImageCarousel({images}) {

  return (
    <Carousel 
      data={images}
      time={2000}
      slideNumber={false}
      width="800px"
      height="512px"
      automatic={false}
      dots={true}
      thumbnails={true}
      thumbnailWidth="100px"
      thumbnailPosition="left"
      slideImageFit="cover"
      pauseIconSize="0px"
      radius="12px"
      style={{
        textAlign: "center",
        alignItems: "center",
      }}
      
      />
  )
}

export default ImageCarousel;
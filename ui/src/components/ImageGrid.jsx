import React, { useState, useEffect } from 'react'
import GridLayout from 'react-grid-layout'

function ImageGrid({images}) {
  const [gridLayout, setGridLayout] = useState([])
  useEffect(() => {
    let temp = []
    images.forEach((image, index) => {
      temp.push({
        i: `image-${index}`,
        x: index % 2,
        y: Math.floor(index / 2),
        w: 1,
        h: 1
      })
    })
    setGridLayout(temp)
  }, [images])

  return (
    <GridLayout className="layout" layout={gridLayout} cols={2} rowHeight={300} width={600}>
      {images.map((image, index) => (
        <div key={`image-${index}`}>
          <img src={image.url} alt={image.name} />
        </div>
      ))}
    </GridLayout>
  )
}

export default ImageGrid;
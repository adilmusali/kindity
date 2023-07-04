import React from 'react'
import ImgGallery from '../components/Gallery/ImgGallery'
import Images from '../components/Gallery/Images'
import { Helmet } from 'react-helmet'

const Gallery = () => {
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Gallery</title>
    </Helmet>
    <ImgGallery />
    <Images />
    </>
  )
}

export default Gallery
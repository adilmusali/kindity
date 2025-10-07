import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ImgGallery from '../components/Gallery/ImgGallery'
import Images from '../components/Gallery/Images'
import { Helmet } from 'react-helmet'

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/gallery`);
        setImages(data);
      } catch (error) {
        console.error("Failed to fetch gallery images", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Gallery</title>
    </Helmet>
    <ImgGallery />
    {loading ? <div>Loading images...</div> : <Images data={images} />}
    </>
  )
}

export default Gallery
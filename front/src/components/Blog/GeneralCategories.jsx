import React from 'react'

const GeneralCategories = () => {
  return (
    <section className='bg-[#f9f9ff]'>
        <div className="container">
            <div className='flex lg:justify-between flex-col items-center gap-[30px] lg:gap-0 lg:flex-row py-[80px]'>
                <div className='cursor-pointer bg-no-repeat p-[20px] bg-[url("https://preview.colorlib.com/theme/kindity/img/blog/cat-post/cat-post-3.jpg.webp")]'>
                    <div className='bg-black hover:bg-[#ea2c58] duration-500 hover:bg-opacity-70 bg-opacity-70 text-center text-white px-[30px] py-[30px] sm:w-[300px] sm:py-[50px] lg:w-[250px] lg:py-[30px] xl:w-[300px] xl:py-[50px]'>
                        <h4 className='text-[18px] uppercase font-semibold mb-[20px]'>social life</h4>
                        <span className='text-[14px] border-t-2 border-t-white font-light pt-[10px]'>Enjoy your social life together</span>
                    </div>
                </div>
                <div className='cursor-pointer bg-no-repeat p-[20px] bg-[url("https://preview.colorlib.com/theme/kindity/img/blog/cat-post/cat-post-2.jpg.webp")]'>
                    <div className='bg-black hover:bg-[#ea2c58] duration-500 hover:bg-opacity-70 bg-opacity-70 text-center text-white px-[30px] py-[30px] sm:w-[300px] sm:py-[50px] lg:w-[250px] lg:py-[30px] xl:w-[300px] xl:py-[50px]'>
                        <h4 className='text-[18px] uppercase font-semibold mb-[20px]'>politics</h4>
                        <span className='text-[14px] border-t-2 border-t-white font-light pt-[10px]'>Be a part of politics</span>
                    </div>
                </div>
                <div className='cursor-pointer bg-no-repeat p-[20px] bg-[url("https://preview.colorlib.com/theme/kindity/img/blog/cat-post/cat-post-1.jpg.webp")]'>
                    <div className='bg-black hover:bg-[#ea2c58] duration-500 hover:bg-opacity-70 bg-opacity-70 text-center text-white px-[30px] py-[30px] sm:w-[300px] sm:py-[50px] lg:w-[250px] lg:py-[30px] xl:w-[300px] xl:py-[50px]'>
                        <h4 className='text-[18px] uppercase font-semibold mb-[20px]'>food</h4>
                        <span className='text-[14px] border-t-2 border-t-white font-light pt-[10px]'>Let the food be finished</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default GeneralCategories
import React from 'react'
import DemoLabel from "../DemoLabel";

const Testimonial = ({ data }) => {
  const reviewedTestimonials = data?.filter((d) => typeof d.isDemo === "boolean") ?? [];
  if (reviewedTestimonials.length === 0) return null;

  return (
    <section className='bg-[#f9f9ff]'>
        <div className="container">
            <div className='flex gap-[80px] py-[120px] justify-center items-center flex-wrap lg:flex-nowrap'>
                <div className='w-[70%] md:w-[50%] lg:w-[28%] flex flex-col gap-5 text-center lg:text-0'>
                    <h2 className='text-[28px] xl:text-[36px] font-semibold'>Community voices</h2>
                    <p className='text-[14px] text-[#777777] font-light leading-6'>Demo-labeled accounts are illustrative examples.</p>
                </div>
                <div className='flex justify-between gap-[50px] flex-wrap sm:flex-nowrap w-full lg:w-[70%]'>
                    {reviewedTestimonials.map((d) => {
                        return(
                            <div key={d._id} className='flex w-full sm:w-none flex-col gap-[30px] text-center bg-white p-[40px]'>
                        <div className='mx-auto'><img src={d.img} alt="" /></div>
                        <p className='text-[14px] text-[#777777] font-light leading-6'>{d.desc}</p>
                        {d.isDemo === true && <DemoLabel />}
                        <div className='mb-[10px]'>
                            <h4 className='mb-[5px] text-[18px] font-semibold'>{d.name}</h4>
                            <span className='text-[14px] text-[#777777] font-light'>{d.job}</span>
                        </div>
                    </div>
                        )
                    })}                               
                </div>
            </div>
        </div>
    </section>
  )
}

export default Testimonial

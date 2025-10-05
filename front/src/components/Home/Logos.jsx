import React from 'react'

const Logos = ({ data }) => {
  return (
    <section>
        <div className="container">
            <div className="flex flex-wrap justify-center gap-[80px] lg:gap-0 lg:justify-between py-[120px] px-[30px]">
                {data && data.map((d) => {
                    return(
                        <div key={d._id}>
                            <img className='opacity-50 hover:opacity-100 transition duration-500' src={d.img} alt="" />
                        </div>
                    )
                })}
            </div>
        </div>
    </section>
  )
}

export default Logos
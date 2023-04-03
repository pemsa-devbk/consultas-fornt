import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper'
import 'swiper/css';
import "swiper/css/pagination";

export const Slider = () => {
    return (

        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            pagination={true}
            modules={[Pagination, Autoplay]}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false
            }}
            loop={true}
            
        >
            <SwiperSlide>
                <div className='slide'>
                    <h3>Administra tus usuarios</h3>
                    <p>Ahora puedes registrar usuarios, sin la necesidad de una solicitud.</p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='slide'>
                    <h3>Administra tus usuarios</h3>
                    <p>Ahora puedes registrar usuarios, sin la necesidad de una solicitud.</p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='slide'>
                    <h3>Administra tus usuarios</h3>
                    <p>Ahora puedes registrar usuarios, sin la necesidad de una solicitud.</p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='slide'>
                    <h3>Administra tus usuarios</h3>
                    <p>Ahora puedes registrar usuarios, sin la necesidad de una solicitud.</p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='slide'>
                    <h3>Administra tus usuarios</h3>
                    <p>Ahora puedes registrar usuarios, sin la necesidad de una solicitud.</p>
                </div>
            </SwiperSlide>

        </Swiper>
    )
}

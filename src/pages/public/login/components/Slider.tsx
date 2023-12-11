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
                    <h3>Tu información en el momento</h3>
                    <p>Consulta los eventos de tu panel de alarma recibidos en la central de monitoreo en cualquier momento.</p>
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
                    <h3>Nueva interfaz</h3>
                    <p>Una interfaz mas intuitiva, disfruta de una nueva experiencia al visualizar tus reportes.</p>
                </div>
            </SwiperSlide>
             {/* <SwiperSlide>
                <div className='slide'>
                    <h3>Misma seguridad</h3>
                    <p>Sabemos lo importante que son tus datos, por lo tanto el acceso a para co</p>
                </div>
            </SwiperSlide> */}
            {/*<SwiperSlide>
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
            </SwiperSlide> */}

        </Swiper>
    )
}

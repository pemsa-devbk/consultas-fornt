import React from 'react'
import logo from '../../../assets/PEMSA.png'
import Icons from '../../../assets/icons.svg'

const Home = () => {
  return (
    <div className='container-fpw container-fph center center-width center-height'>
      <div className='home'>
        <img src={logo} alt="" />
        <div className='links'>
          <a href='https://www.pem-sa.com/'>
            <svg className={`icon`}>
              <use xlinkHref={`${Icons}#icon-globe`}></use>
            </svg>
          </a>
          <a href='https://www.facebook.com/people/PEMSA-Protecci%C3%B3n-Electr%C3%B3nica-Monterrey-SA-de-CV/100063501522534/?ref=bookmarks'>
            <svg className={`icon`}>
              <use xlinkHref={`${Icons}#icon-facebook`}></use>
            </svg>
          </a>
          <a href='https://twitter.com/PEMSA_85'>
            <svg className={`icon`}>
              <use xlinkHref={`${Icons}#icon-twitter`}></use>
            </svg>
          </a>
          <a href='https://www.instagram.com/pemsa_85/'>
            <svg className={`icon`}>
              <use xlinkHref={`${Icons}#icon-instagram`}></use>
            </svg>
          </a>
        </div>
        
        <p>CENTRAL MONITOREO 24 HRS</p>
        <p>222 141 12 30</p>
      </div>
     
    </div>
  )
}

export default Home;

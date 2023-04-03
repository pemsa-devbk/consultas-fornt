import React, { useRef } from 'react'
import { useThemeStore } from '../../../../hooks/useThemeStore';
import Icons from '../../../../assets/icons.svg'


export const Theme = () => {
    const toggleRef = useRef<HTMLDivElement>(null);
    const { isDark, applyDarkTheme, applyLigthTheme } = useThemeStore();

    const changeTheme = () => {
        document.body.classList.toggle('dark-theme');
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            applyDarkTheme();
        } else {
            applyLigthTheme();
            localStorage.setItem('theme', 'light');
        }
        toggleRef.current?.querySelectorAll('div').forEach(el => el.classList.toggle('active'))
    }

  return (
      <div className='theme'>
          <div className='theme-toggler' ref={toggleRef} onClick={changeTheme}>
              <div className={`${!isDark && 'active'}`}>
                  <svg className='side-nav__icon'>
                      <use xlinkHref={`${Icons}#icon-weather-sunny`}></use>
                  </svg>
              </div>

              <div className={`${isDark && 'active'}`}>
                  <svg className='side-nav__icon'>
                      <use xlinkHref={`${Icons}#icon-weather-night`}></use>
                  </svg>
              </div>
          </div>
      </div>
  )
}

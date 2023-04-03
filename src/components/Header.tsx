import React, {useRef} from 'react'
import Icons from '../assets/icons.svg';
import { useAuthStore, useThemeStore } from '../hooks';
import { Roles } from '../models';


interface Props {
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header = ({setOpenMenu}:Props) => {

    const {user: {fullName, roles}} = useAuthStore();
    const {applyDarkTheme, applyLigthTheme, isDark} = useThemeStore();
    const toggleRef = useRef<HTMLDivElement>(null);
    const showMenu = () => {
        setOpenMenu((old) => !old)
    }

    const changeTheme = () => {
        document.body.classList.toggle('dark-theme');
        if (document.body.classList.contains('dark-theme')){
            localStorage.setItem('theme', 'dark');
            applyDarkTheme();
        }else{
            applyLigthTheme();
            localStorage.setItem('theme', 'light');
        }
        toggleRef.current?.querySelectorAll('div').forEach(el => el.classList.toggle('active'))
    }
    return (
        <div className='right'>
            <div className='top'>
                <button id='menu-btn' onClick={showMenu}>
                    <svg className='side-nav__icon'>
                        <use xlinkHref={`${Icons}#icon-menu`}></use>
                    </svg>
                </button>
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
                <div className='profile'>
                    <div className='info'>
                        <p>Hola, <b>{fullName.split(' ')[0]}</b></p>
                        <small className='text-muted'>
                            {
                                roles.includes(Roles.ADMIN)
                                ? 'Administrador'
                                :
                                    roles.includes(Roles.HOLDER)
                                    ? 'Titular'
                                    : 'Usuario'
                            }
                        </small>
                    </div>
                    <div className='profile-photo'>
                        <p>{fullName[0].toUpperCase()}</p>
                        {/* <img src="" alt="" /> */}
                    </div>
                </div>
            </div>

        </div>
    )
}

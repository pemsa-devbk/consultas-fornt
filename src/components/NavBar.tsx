import React, { useEffect, useRef } from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import logo from '../assets/logo.png'
import Icons from '../assets/icons.svg';
import { PrivateRoutes, Roles } from '../models';
import { useAuthStore } from '../hooks/useAuthStore';
import { useQueryClient } from '@tanstack/react-query';
import { useOutsideClick } from '../hooks';


interface Props{
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>
}
export const NavBar = ({openMenu, setOpenMenu}: Props) => {
  const navRef = useRef<HTMLElement>(null);
  const {finishCheckAuth, user:{roles}, company: {shortName}} = useAuthStore();
  const queryClient = useQueryClient();

  
  useEffect(() => {
      navRef.current!.classList.add('visible');
  }, [openMenu])
  
  
  const closeNav = () => {
    navRef.current!.classList.remove('visible');
  }
  
  useOutsideClick(navRef, 'visible')

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('RF-token');
    queryClient.clear();
    finishCheckAuth();
  }

  return (
    <>
      <nav className='nav-primary' ref={navRef}>
        <div className='top'>
          <div className='logo'>
            <img src={ logo} alt="Logo" />
            <h2>{shortName.substring(0,3)}<span className='danger'>{shortName.substring(3)}</span></h2>
          </div>
          <div className='close' onClick={closeNav}>
            <svg className='side-nav__icon'>
              <use xlinkHref={`$6{Icons}#icon-x`}></use>
            </svg>
          </div>
        </div>

        <div className='sidebar'>
          <NavLink to={PrivateRoutes.HOME} className="sidebar__link">
            <svg className='side-nav__icon'>
              <use xlinkHref={`${Icons}#icon-home-outline`}></use>
            </svg>
            <p className='sidebar__link-text'>Inicio</p>
          </NavLink>
          <NavLink to={PrivateRoutes.INFO} className="sidebar__link">
            <svg className='side-nav__icon'>
              <use xlinkHref={`${Icons}#icon-info-large-outline`}></use>
            </svg>
            <p className='sidebar__link-text'>PRELMO</p>
          </NavLink>

          <p className='sidebar__section'>Administración</p>

          {
            (roles.includes(Roles.ADMIN) || roles.includes(Roles.HOLDER))
            &&
            <>
              <NavLink to={PrivateRoutes.USERS} className="sidebar__link">
                <svg className='side-nav__icon'>
                  <use xlinkHref={`${Icons}#icon-group-outline`}></use>
                </svg>
                <p className='sidebar__link-text'>Usuarios</p>
              </NavLink>
              <NavLink to={PrivateRoutes.GROUPS} className="sidebar__link">
                <svg className='side-nav__icon'>
                  <use xlinkHref={`${Icons}#icon-th-list-outline`}></use>
                </svg>
                <p className='sidebar__link-text'>Grupos</p>
              </NavLink>
            </>
          }
          <NavLink to={PrivateRoutes.PROFILE} className="sidebar__link">
            <svg className='side-nav__icon'>
              <use xlinkHref={`${Icons}#icon-user-outline`}></use>
            </svg>
            <p className='sidebar__link-text'>Perfil</p>
          </NavLink>

          <p className='sidebar__section'>Consultas</p>

          <NavLink to={PrivateRoutes.Q_ACCOUNT} className="sidebar__link">
            <svg className='side-nav__icon'>
              <use xlinkHref={`${Icons}#icon-lightbulb`}></use>
            </svg>
            <p className='sidebar__link-text'>Individual</p>
          </NavLink>
          <NavLink to={PrivateRoutes.Q_GROUP} className="sidebar__link">
            <svg className='side-nav__icon'>
              <use xlinkHref={`${Icons}#icon-lightbulb`}></use>
            </svg>
            <p className='sidebar__link-text'>Grupal</p>
          </NavLink>

          <NavLink to={PrivateRoutes.Q_ADVANCED} className="sidebar__link">
            <svg className='side-nav__icon'>
              <use xlinkHref={`${Icons}#icon-lightbulb`}></use>
            </svg>
            <p className='sidebar__link-text'>Avanzado</p>
          </NavLink>

          <p className='sidebar__section'>Sesión</p>

          <a href='#' onClick={() => logout()} className='sidebar__link'>
            <svg className='side-nav__icon'>
              <use xlinkHref={`${Icons}#icon-power-outline`}></use>
            </svg>
            <p className='sidebar__link-text'>Salir</p>
          </a>
        </div>

      </nav>
      <Outlet />
    </>
  )
}

import React from 'react';
import Adri from '../../assets/adri2.jpg';
import Matt from '../../assets/matt2.jpg';
import Erika from  '../../assets/erika3.jpg';
import glendis from '../../assets/glendis.jpg';
import hugo from '../../assets/hugo2.jpg';

const Ours = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 grid gap-x-8 gap-y-20 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nuestro Equipo </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">El resultado de dedicación, pasión y trabajo en equipo. ¡Conoce al equipo detrás de nuestro proyecto!</p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          <li>
            <div className="flex items-center gap-x-6">
              <img className="h-16 w-16 rounded-full" src={Adri} alt="" />
              <div>
                <h3 className="text-xl font-semibold leading-7 tracking-tight text-gray-900 w-100 pb-1">Adriana Paredes S</h3>
                <p className="text-sm font-semibold leading-6 text-indigo-600">BackEnd - Infraestructura</p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-6">
              <img className="h-16 w-16 rounded-full" src={Matt} alt="" />
              <div>
                <h3 className="text-xl font-semibold leading-7 tracking-tight text-gray-900 w-100 pb-1">Matteo Lovatto</h3>
                <p className="text-sm font-semibold leading-6 text-indigo-600">FrontEnd</p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-6">
              <img className="h-16 w-16 rounded-full" src={hugo} alt="" />
              <div>
                <h3 className="text-xl font-semibold leading-7 tracking-tight text-gray-900 w-100 pb-1">Hugo Dominguez</h3>
                <p className="text-sm font-semibold leading-6 text-indigo-600">Infraestructura - FrontEnd</p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-6">
              <img className="h-16 w-16 rounded-full" src={Erika} alt="" />
              <div>
                <h3 className="text-xl font-semibold leading-7 tracking-tight text-gray-900 w-100 pb-1">Erika Guarín</h3>
                <p className="text-sm font-semibold leading-6 text-indigo-600">Testing - FrontEnd</p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-6">
              <img className="h-16 w-16 rounded-full" src={glendis} alt="" />
              <div>
                <h3 className="text-xl font-semibold leading-7 tracking-tight text-gray-900 w-100 pb-1">Glendis Piña</h3>
                <p className="text-sm font-semibold leading-6 text-indigo-600">Bases de datos</p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-6">
              <img className="h-16 w-16 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              <div>
                <h3 className="text-xl font-semibold leading-7 tracking-tight text-gray-900 w-100 pb-1">Liz Gabriela Nova</h3>
                <p className="text-sm font-semibold leading-6 text-indigo-600">Scrum Master - Ux</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Ours;

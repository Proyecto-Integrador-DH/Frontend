import React from "react";
import Searcher from "../components/searcher/Searcher";
import Header from "../components/header/Header";
import perrito from "../assets/perroCard.jpg";
import flecha from "../assets/arrowRightflecha.png";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
 
  return (
    <>
      <Searcher />
      <div className="flex flex-col items-center my-10">
        <p className="text-rosa font-bold tracking-widest text-2xl mb-5">
          NUESTROS
        </p>
        <h1 className="text-3xl font-bold tracking-wide">
          Tours & experiencias
        </h1>
      </div>
      <div className="flex gap-1  pl-40">
        <div className="w-6/12 rounded-md">
          <img className="rounded-md" src={perrito} alt="" />
        </div>
        <div className="flex justify- flex-wrap w-7/12 gap-1 rounded-md">
          <img className="w-2/6 rounded-md" src={perrito} alt="" />
          <img className="w-2/6 rounded-md" src={perrito} alt="" />
          <img className="w-2/6 rounded-md" src={perrito} alt="" />
          <img className="w-2/6 rounded-md" src={perrito} alt="" />
        </div>
      </div>
      <div className="flex justify-center gap-40">
        <div className="w-1/3 flex flex-col items-start my-20">
          <p className="text-rosa font-bold tracking-widest text-2xl mb-5">
            COLOMBIA
          </p>
          <h1 className="text-3xl font-bold tracking-wide">
            Experiencia natural y sensible
          </h1>
        </div>
        <div className="w-1/3 flex my-20 pr-20 justify-end">
          <button onClick={()=>navigate(-1)} className="flex pt-5">
            <img className=" w-10 h-10" src={flecha} alt="" />
            <p className="pt-2 text-gray-300 font-medium">Volver</p>
          </button>
        </div>
      </div>
      <p className="pl-40 pr-56">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim doloremque
        facere perspiciatis, exercitationem deleniti expedita voluptatem nemo,
        ab optio, earum debitis ullam alias asperiores cum corrupti quibusdam
        voluptate dolores voluptas.Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Enim doloremque facere perspiciatis, exercitationem
        deleniti expedita voluptatem nemo, ab optio, earum debitis ullam alias
        asperiores cum corrupti quibusdam voluptate dolores voluptas.Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Enim doloremque facere
        perspiciatis, exercitationem deleniti expedita voluptatem nemo, ab
        optio, earum debitis ullam alias asperiores cum corrupti quibusdam
        voluptate dolores voluptas.Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Enim doloremque facere perspiciatis, exercitationem
        deleniti expedita voluptatem nemo, ab optio, earum debitis ullam alias
        asperiores cum corrupti quibusdam voluptate dolores voluptas.Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Enim doloremque facere
        perspiciatis, exercitationem deleniti expedita voluptatem nemo, ab
        optio, earum debitis ullam alias asperiores cum corrupti quibusdam
        voluptate dolores voluptas.Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Enim doloremque facere perspiciatis, exercitationem
        deleniti expedita voluptatem nemo, ab optio, earum debitis ullam alias
        asperiores cum corrupti quibusdam voluptate dolores voluptas.Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Enim doloremque facere
        perspiciatis, exercitationem deleniti expedita voluptatem nemo, ab
        optio, earum debitis ullam alias asperiores cum corrupti quibusdam
        voluptate dolores voluptas.
      </p>
    </>
  );
};

export default Details;

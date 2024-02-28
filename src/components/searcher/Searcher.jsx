import React from "react";
import SearcherStyles from "./Searcher.module.css"


const Searcher = () => {

        return (
            <div className='flex justify-center'>
                <form className="flex justify-center mt-10 w-full" id="searchForm">
                    <label htmlFor="desde"></label>
                    <input className="w-1/3 h-full border-2 shadow-md" type="text" id="desde" name="desde" placeholder="Desde" required />
                    <label htmlFor="hasta"></label>
                    <input className="w-1/3 h-full border-2 shadow-md" type="text" id="hasta" name="hasta" placeholder="Destino" required />
                    <button class="bg-blue-400 text-white font-bold py-2 px-4 rounded" type="submit" >Buscar</button>
                </form>
            </div>
        );
    };

export default Searcher;
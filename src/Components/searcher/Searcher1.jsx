import React from "react";
import SearcherStyles from "./Searcher.module.css"
import Button from "../button/Button";


const Searcher = () => {

        return (
            <div className='flex justify-center mt-6 w-full'>
                <form className={SearcherStyles.searcherContainer}>
                    <label htmlFor="desde"></label>
                    <input className="w-1/3 h-full border-2 shadow-md" type="text" id="desde" name="desde" placeholder="Desde" required />
                    <label htmlFor="hasta"></label>
                    <input className="w-1/3 h-full border-2 shadow-md" type="text" id="hasta" name="hasta" placeholder="Destino" required />
                    <Button type="submit" className={SearcherStyles.boton}>Buscar</Button>
                </form>
            </div>
        );
    };

export default Searcher;
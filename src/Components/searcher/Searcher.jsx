import React from "react";
import SearcherStyles from "./Searcher.module.css"


const Searcher = () => {

        return (
            <div className={SearcherStyles.searcherContainer}>
                <form id="searchForm">
                    <label htmlFor="desde"></label>
                    <input type="text" id="desde" name="desde" placeholder="Desde" required />
                    <label htmlFor="hasta"></label>
                    <input type="text" id="hasta" name="hasta" placeholder="Hasta" required />
                    <button type="submit" >Buscar</button>
                </form>
            </div>
        );
    };

export default Searcher;
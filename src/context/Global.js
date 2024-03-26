import {createContext, useContext, useEffect, useReducer} from "react";

const GlobalContext =createContext();
export const GlobalProvider =({children}) =>{

    const baseUrl = "https://pokeapi.co/api/v2/";

    const reducer = (state,action)=> {
        switch (action.type) {
            case "LOADING":{
                return {...state,loading: true}
            }

        }
        return state;
    }

    const initState = {
        allPokemons: [],
        pokemon:[],
        pokemonDB:[],
        searchResults: [],
        next:"",
        loading:false
    }

    const [state, dispatch ] = useReducer(reducer,initState);

    const allPokemon = async ()=> {
        dispatch({type:"LOADING"});
        const res = await fetch(`${baseUrl}pokemon?limit=151`);
        console.log( await res.json())
    }

    useEffect(() => {
        allPokemon()
    }, []);

    return(
        <GlobalContext.Provider
            value={{...state}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}
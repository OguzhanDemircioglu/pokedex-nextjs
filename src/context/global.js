import React, {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";

const GlobalContext = createContext();

const LOADING = "LOADING";
const GET_POKEMON = "GET_POKEMON";
const GET_ALL_POKEMON = "GET_ALL_POKEMON";
const GET_SEARCH = "GET_SEARCH";
const GET_POKEMON_DATABASE = "GET_POKEMON_DATABASE";
const NEXT = "NEXT";

const reducer = (state, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true };

        case GET_ALL_POKEMON:
            return {
                ...state,
                allPokemon: action.payload.results,
                next: action.payload.next,
                loading: false,
            };

        case GET_POKEMON:
            return { ...state, pokemon: action.payload, loading: false };

    }

    return state;
};

export const GlobalProvider = ({ children }) => {
    const baseUrl = "https://pokeapi.co/api/v2/";

    const intitialState = {
        allPokemon: [],
        pokemon: {},
        pokemonDataBase: [],
        searchResults: [],
        next: "",
        loading: false,
    };

    const [state, dispatch] = useReducer(reducer, intitialState);
    const [allPokemonData, setAllPokemonData] = useState([]);

    const allPokemon = async () => {
        dispatch({ type: "LOADING" });

        const res = await fetch(`${baseUrl}pokemon?limit=200`);
        const data = await res.json();
        dispatch({ type: "GET_ALL_POKEMON", payload: data });

        const allPokemonData = [];

        for (const pokemon of data.results) {
            const pokemonRes = await fetch(pokemon.url);
            const pokemonData = await pokemonRes.json();
            allPokemonData.push(pokemonData);
        }

        setAllPokemonData(allPokemonData);
    };

    const getPokemon = async (name) => {
        dispatch({ type: "LOADING" });

        const res = await fetch(`${baseUrl}pokemon/${name}`);
        const data = await res.json();

        dispatch({ type: "GET_POKEMON", payload: data });
    };

    useEffect(() => {
        allPokemon();
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                ...state,
                allPokemonData
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

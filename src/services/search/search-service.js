import axios from "axios";

const SEARCH_URL = 'https://twelve-data1.p.rapidapi.com/symbol_search?'
const DETAILS_URL = 'https://omdbapi.com/?apikey=852159f0&i='
const API_KEY = '249ccaf1eamshf53cc28facd0888p1d76d3jsn29ef4514da90'
const API_HOST = 'twelve-data1.p.rapidapi.com'

export const findStockBySearchTerm = async (term) => {
    const config = {
        headers: {
            'X-RapidAPI-Key' : API_KEY,
            'X-RapidAPI-Host' : API_HOST
        },
        params: {
            'symbol' : term,
            'outputsize' : '1000'
        }
    }
    const response = await axios.get(`${SEARCH_URL}${term}`, config)
        .then(response => {
            // console.log("Response from API :",response.data)
            return response.data
        })
        .catch(error => {
            console.log("Error from API :",error)
            throw error
        })

    const symbols = new Set();
    const result = [];
    response.data.filter(i => i['currency'] === 'USD').forEach((i) => {
        if(!symbols.has(i.symbol)) {
            symbols.add(i.symbol);
            result.push(i);
        }
    })
    return result;
}

export const findMovieByImdbId = async (imdbID) => {
    const response = await axios.get(`${DETAILS_URL}${imdbID}`)
    return response.data
}
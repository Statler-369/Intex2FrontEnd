import React from 'react'
import axios from 'axios'
import AppContext from './context'
import App from './App'
//import {produce} from 'immer'

/** The context provider for our app */
export default class AppProvider extends React.Component {

    constructor(props) {
        super(props)
        this.actions = {
            keywordSearch: this.keywordSearch,
            locationSearch: this.locationSearch,
            performSearches: this.performSearches
        }
        this.state = {
            campaigns: {}
        }
    }



    performSearches = (values) =>{
        let searchArr = Object.values(this.state.campaigns)
        let returnArr = []
        let numFilters = 0
        if(values.keyword !== ''){
            console.log('Received Keyword')
            numFilters += 1
            returnArr = returnArr.concat(this.keywordSearch(values.keyword, searchArr))
        }
        if(values.location !== ""){
            console.log('Received location')
            numFilters += 1
            returnArr = returnArr.concat(this.locationSearch(values.location, searchArr))
        }
        console.log('All found entries', returnArr)
        if(numFilters > 1){
            console.log(numFilters)
            returnArr = this.consolidateResults(returnArr)
            console.log('Consolidated entries', returnArr)
        }

        return returnArr
    }

    render() {        
        return (
            <AppContext.Provider value={{...this.state, ...this.actions}}>
                <App />
            </AppContext.Provider>
        )
    }

    async componentDidMount() {
        // Pull in the data here.
        const resp = await axios.get('https://goanalyzeme.herokuapp.com/api/campaign/')
        //console.log(resp) // https://goanalyzeme.herokuapp.com
        //http://localhost:8000
        this.setState({...this.state, campaigns: resp.data})
        
        //const resp = await axios.get(/* url here */)
        //this.setState({...this.state, categories: resp.data}) // this sets the categories state.
    }


    // Bunch of functions after this.

    keywordSearch = (keyword, searchArr) =>{
        let returnArr = []
        let keywords = keyword.split(' ')
        for(let i = 0; i < keywords.length; i++){
            keywords[i] = keywords[i].toLowerCase()
            console.log('Searching for ', keywords[i])
            searchArr.map(camp =>{
                if(camp.user_first_name.toLowerCase() === keywords[i]){
                    returnArr.push(camp)
                }
                else if(camp.user_last_name.toLowerCase() === keywords[i]){
                    returnArr.push(camp)
                }
                else
                {
                    let tempArr = camp.title.split(' ')
                    for(let i = 0; i < tempArr.length; i++){
                        if(tempArr[i].toLowerCase() === keywords[i]){
                            returnArr.push(camp)
                        }
                    }
                }
                return null
            })
        }
        console.log('Found ', returnArr)
        return returnArr
    }

    locationSearch = (location, searchArr) =>{
        let returnArr = []
        console.log('Searching for ', location)
        searchArr.map(camp =>{
            let tempArr = camp.location_city.split(',')
            for(let i = 0; i < tempArr.length; i++){
                let last2 = tempArr[i].slice(-2)
                if(last2 === location){
                    returnArr.push(camp)
                }
            }
            return null
        })
        console.log('Found ', returnArr)
        return returnArr
    }


    consolidateResults = (allResults) => {
        let campIDs = []
        let returnArr = []
        console.log('Reached Function')
        allResults.map(camp =>{
            if(campIDs.includes(camp.campaign_id)){
                if(!returnArr.includes(camp)){
                    returnArr.push(camp)
                }
            }
            campIDs.push(camp.campaign_id)
            return null
        })
        return returnArr
    }


    
}
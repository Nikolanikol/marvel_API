import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBounadry from "../ErrorBoundary/ErrorBounadary";
import decoration from '../../resources/img/vision.png';

class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedChar : null,
        }
    }
    onCharSelected = (id)=>{
        this.setState({
            selectedChar : id,
        })
    }

    render(){
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList onCharSelected = {this.onCharSelected}/>
                        <ErrorBounadry>
                            <CharInfo charId = {this.state.selectedChar}/>
                        </ErrorBounadry>
                        
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
} 

export default App;
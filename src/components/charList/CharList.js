import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import './charList.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

class CharList extends Component{
    constructor(props){
        super(props)
        this.state = {
            charList : [],
            loading : true,
            error : false,
            newItemLoading : false,
            offset : 210,
            charEnded : false
        }
    }
    MarvelService = new MarvelService();
    componentDidMount(){
        this.onCharListLoading();
        this.onRequest();
    }
    onCharListLoaded = (newCharList)=>{
        let ended = false;
        if(newCharList.length < 9){
            ended = true
        }
        this.setState(({offset, charList})=>({
                charList : [...charList, ...newCharList],
                loading : false,
                newItemLoading : false,
                offset : offset+9,
                charEnded : ended
        }))


    }
    onCharListLoading = ()=>{
        this.setState({
            newItemLoading : true
        })
    }
    onRequest = (offset)=>{
        this.MarvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
        }
    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    renderCharList = ()=>{
        const {charList} = this.state
        const item = charList.map((item)=>{
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            return(
                <li className="char__item"
                    key={item.id}
                    onClick={()=>this.props.onCharSelected(item.id)}
                >
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )

        })
        return (
            <ul className="char__grid">
                {item}
            </ul>
        )
    }

    render(){
        const { loading, error, offset, newItemLoading, charEnded} = this.state;
        const itemList = this.renderCharList()
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? itemList : null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}                
                <button 
                    disabled = {newItemLoading}
                    style={{'display' : charEnded ? 'none' : 'block'}}
                    onClick={()=>this.onRequest(offset)}
                    className="button button__main button__long"
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )

    }
}
export default CharList;
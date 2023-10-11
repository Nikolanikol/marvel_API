


class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=a2229ccb06d8d97b20b5dea7ecc03dd7';
    _baseOffset = 210;

    getResource = async (url)=>{
        let res = await fetch(url)

        if(!res.ok){
            throw new Error (`Couldnt fetch ${url}, status ${res.status}`)
        }
        return await res.json()
    }

    getAllCharacters = async(offset = this._baseOffset)=>{
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`)
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (offset = this._baseOffset)=>{
        const res = await this.getResource(`${this._apiBase}characters/${offset}?${this._apiKey}`)
        return this._transformCharacter(res.data.results[0])
    }
    _transformCharacter = (res) =>{
        let desc = res.description
        if (res.description.length > 100){
            desc = res.description.slice(0, 100) + '...'
        }else{
            desc = res.description
        }
        return {
            id : res.id,
            name : res.name,
            description : desc ? desc : 'not found',
            thumbnail : res.thumbnail.path + '.' +res.thumbnail.extension,
            homepage : res.urls[0].url,
            wiki : res.urls[1].url,
            comics : res.comics.items
        }
    }
}

// `${this._apiBase} + characters/+${id}+? + ${this._apiKey}`
// https://gateway.marvel.com:443/v1/public/characters/1011005?apikey=a2229ccb06d8d97b20b5dea7ecc03dd7
// `${this._apiBase}characters/${id}?&${this._apiBase}`

export default MarvelService




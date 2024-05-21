import { useHttp } from '../hooks/http.hook'

const useMarvelService = () => {
	const { loading, request, error, clearError } = useHttp()

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
	const _apiKey = 'apikey=93f100f32a709b185b53e61657e81944'
	const _baseOffset = 210

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
		return res.data.results.map(_transformCharacter)
	}

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
		return _transformCharacter(res.data.results[0])
	}

	const _transformCharacter = (res) => {
		return {
			name: res.name,
			description: res.description
				? `${res.description.slice(0, 210)}...`
				: 'There is no description for this character',
			thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
			homepage: res.urls[0].url,
			wiki: res.urls[1].url,
			id: res.id,
			comics: res.comics.items,
		}
	}

	return { loading, error, getAllCharacters, getCharacter, clearError }
}

export default useMarvelService

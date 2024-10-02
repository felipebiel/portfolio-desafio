
import { NewsListResponse, News, NewsGroupResponse } from '../../interfaces/news-interfaces.js';
import { BASE_URL, ENDPOITS } from '../../utils/services/api-urls.js'

export async function getNews(page:number = 1, type: string = 'materia'): Promise<NewsListResponse | NewsGroupResponse> {
    let response = await fetch(`${BASE_URL}${ENDPOITS.FEED}/${ENDPOITS.PAGE}/${page}`);
    let data = await response.json();

    return data.filter((el: News) => el.type === type);
}

export async function getNewsGroup(): Promise<NewsGroupResponse> {
    let data = await getNews(1, 'agrupador-materia') as NewsGroupResponse;
    return data;
}

export async function getMainNews(): Promise<NewsListResponse>  {
    let data = await getNews(1, 'materia') as NewsListResponse;
    return data.slice(0, 2);
}
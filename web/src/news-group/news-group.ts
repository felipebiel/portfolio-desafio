import { NewsGroup } from '../interfaces/news-interfaces.js';
import { getNewsGroup } from '../services/api/news.js'
import { loadTemplate } from "../utils/dom-functions.js";
import { timer } from "../utils/helpers.js";
import { removeSkeleton } from "../utils/news-functions.js";

const newsGroups = await getNewsGroup();
const newsListGroup = document.getElementById('new-group-box') as HTMLElement;
newsListGroup.innerHTML = await loadTemplate('./assets/templates/news-skeleton.html');

async function createNewsGroupItem(newsItem: NewsGroup) {
    const newsContent = document.createElement('div');

    try {
        if (newsItem.group && newsItem.group.length > 0) {

            const templateText = await loadTemplate('./assets/templates/news-group.html');
            newsContent.innerHTML = templateText;

            // trata o titulo do card
            const titleCard = newsContent.querySelector('.new-group-box__title') as HTMLElement;
            titleCard.textContent = newsItem.header;

            // trata a listagem das noticias
            const contentList = newsContent.querySelector('.new-group-box__content-list') as HTMLElement;
            const liElement = newsContent.querySelector('.new-group-box__content-item') as HTMLElement;
            contentList.innerHTML = '';

            newsItem.group.forEach(news => {
                const cloneLi = liElement.cloneNode(true) as HTMLElement;
                const link = cloneLi.querySelector('a') as HTMLAnchorElement;
                link.href = news.content.url;
                link.textContent = news.content.title;
                contentList.appendChild(cloneLi);
            })
        }

    } catch (error) {
        newsContent.textContent = "Erro ao carregar as noticias, por favor tente novamente mais tarde.";
    }

    newsListGroup.appendChild(newsContent);
}

// simula um timer da api
await timer(3500)

for (const newsItem of newsGroups) {
    await createNewsGroupItem(newsItem)
}

// remove skeleton ao final do processamento
removeSkeleton(newsListGroup, '.news-skeleton')
import { loadTemplate } from "./dom-functions.js";
import { formatDateByTime, formatTimeByMs } from "./dates-functions.js";
import { News } from '../interfaces/news-interfaces.js';

export function prepareLink(newsContent: HTMLElement, newsItem: News): void {
    // trata os links
    const links = newsContent.querySelectorAll<HTMLAnchorElement>('a')

    if (!newsItem.video) {
        links.forEach(linkElement => {
            linkElement.href = newsItem.url;
            linkElement.addEventListener("click", linkOpen)
        })
    } else {
        links.forEach(linkElement => {
            linkElement.setAttribute('video-source', newsItem.video.source)
            linkElement.setAttribute('program-title', newsItem.video.programTitle)
            linkElement.addEventListener("click", linkOpen)
        });
    }
}

export async function linkOpen(this:HTMLAnchorElement, event: Event) {
    if (this.hasAttribute('video-source')) {
        event.preventDefault();
        prepareModal(this);
    }
};

async function prepareModal(linkElement: HTMLAnchorElement) {
    const modalContent = document.createElement('div');
    const templateTextModal = await loadTemplate('./assets/templates/news-video-modal.html');
    modalContent.innerHTML = templateTextModal;

    // coloca diretamente no body
    document.body.insertBefore(modalContent, document.body.lastChild);

    // prepara o vídeo
    const modalElement = modalContent.querySelector<HTMLElement>('#modal-video') as HTMLElement;
    const video = modalContent.querySelector<HTMLVideoElement>('source') as HTMLVideoElement;
    video.src = linkElement?.getAttribute('video-source') as string;

    const caption = modalContent.querySelector<HTMLElement>('#caption') as HTMLElement;
    caption.textContent = linkElement.getAttribute('program-title') as string;

    openModal(modalElement);
    prepareCloseModalEvent(modalContent, modalElement);
}

function openModal(modalElement: HTMLElement) {
    modalElement.style.display = 'block';
}

function closeModal(modalElement: HTMLElement) {
    modalElement.style.display = 'none';
}

function prepareCloseModalEvent(modalContent: HTMLElement, modalElement: HTMLElement) {
    const closeModalButton = modalContent.querySelector('.close') as HTMLElement

    closeModalButton.addEventListener('click', () => {
        closeModal(modalElement)
        modalContent.remove()
    })
}

export function removeSkeleton(mainElement: HTMLElement, querySelectorName: string) {
    const skeleton = mainElement.querySelector(querySelectorName) as HTMLElement;
    skeleton.remove()
}


export async function prepareNewsElement(newsContent: HTMLElement, newsItem: News) {
    try {
        const templateText = await loadTemplate('./assets/templates/news-item.html');
        newsContent.innerHTML = templateText;

        // trata a imagem
        const image = newsContent.querySelector('.new-list-item__img-tag') as HTMLImageElement;
        image.src = newsItem.image ? newsItem.image : './assets/imgs/G1-placeholder.webp';
        image.alt = newsItem.title;

        // trata o figcaption
        const figcaptionImage = newsContent.querySelector('figcaption') as HTMLElement;
        figcaptionImage.textContent = newsItem.title;

        // trata as informações da noticia
        const label = newsContent.querySelector('.new-list-item__label') as HTMLElement;
        label.textContent = newsItem.section;

        const title = newsContent.querySelector('.new-list-item__title') as HTMLElement;
        title.textContent = newsItem.title;

        const description = newsContent.querySelector('.new-list-item__description') as HTMLElement;
        description.textContent = newsItem.summary;

        const createAt = newsContent.querySelectorAll('.new-list-item__when') as NodeListOf<Element>;
        createAt.forEach(when => {
            when.textContent = formatDateByTime(newsItem.created);
        })

        const player = newsContent.querySelector('.new-list-item__play') as HTMLElement;
        player.style.display = 'none';

        prepareLink(newsContent, newsItem);


        if (newsItem.video) {
            image.classList.add('new-list-item__img-tag--video')
            player.style.display = 'flex';
            const playerTime = newsContent.querySelector('.new-list-item__play-time') as HTMLElement;
            playerTime.textContent = formatTimeByMs(newsItem.video.duration);
        }
    } catch (error) {
        newsContent.textContent = "Erro ao carregar as noticias, por favor tente novamente mais tarde.";
    }

    return newsContent;
}
import { FunctionComponent } from 'react'
import style from './Document.module.css'


export const Document: FunctionComponent<IDocumentsResponse> = (props) => {

    const techNews = props.ok.attributes.isTechNews ? 'Техническая новость' : ''
    const anons = props.ok.attributes.isAnnouncement ? 'Анонс' : ''
    const digest = props.ok.attributes.isDigest ? 'Дайджест' : ''
    const show = techNews || anons || digest

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(props.ok.content.markup, "text/xml");
    const txt = (xmlDoc.querySelector("scandoc")?.textContent)

    var regex = /<[^<>]+>/g;
    let text = txt?.replace(regex, "");
    text = text?.replace(/\s+/g, ' ');

    const imgReg = /<img[^<>]+>/g;
    const img = txt?.match(imgReg)

    const srcReg = /src=\"https:\/\/storage(\S+)\"/g;
    const srcs = txt?.match(srcReg)
    let src: string = ''
    if (srcs?.length) { src = srcs[0].slice(5, -1) }

    const issueDate = new Date(props.ok.issueDate.toString()).toLocaleDateString()

    return (
        <div className={style.wrapper}>
            <div className={style.head}>
                <div>{issueDate}</div>
                <div>{props.ok.source.name}</div>
            </div>
            <div className={style.title}>
                {props.ok.title.text}
            </div>
            <div className={style.genre} style={!show ? { opacity: 0 } : {}}>
                {`${techNews} ${anons} ${digest}`}
            </div>
            {src ? <div className={style.image}>
                <img src={src} alt="photo" />
            </div> :
                <div>{src}</div>
            }
            <div className={style.content}>
                <div>
                    {text}
                </div>
            </div>
            <div className={style.down}>
                <a href={props.ok.url} target='_blank' ><button >читать в источнике</button> </a>
                <div>
                    {props.ok.attributes.wordCount} слов
                </div>
            </div>
        </div>
    )
}
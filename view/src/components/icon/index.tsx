import * as React from 'react';
import BACK from '../../static/icon/back.svg';
import CATEGORY from '../../static/icon/cate.svg';
import SEARCH from '../../static/icon/search.svg';
import SOURCE from '../../static/icon/source.svg';
import ARTICLE from '../../static/icon/article.svg';
import SINGLE from '../../static/icon/single.svg';
import USER from '../../static/icon/user.svg';
import VOL from '../../static/icon/vol.svg';
import './index.scss';


enum IconTypes {
    BACK,
    CATEGORY,
    SEARCH,
    SOURCE,
    ARTICLE,
    SINGLE,
    USER,
    VOL
}

export interface Props {
    type: IconTypes,
    className?: string;
}

function Icon(props: Props) {
    const { type, className } = props;
    let src;
    switch (type) {
        case IconTypes.BACK: src = BACK; break;
        case IconTypes.CATEGORY: src = CATEGORY; break;
        case IconTypes.SEARCH: src = SEARCH; break;
        case IconTypes.SOURCE: src = SOURCE; break;
        case IconTypes.ARTICLE: src = ARTICLE; break;
        case IconTypes.SINGLE: src = SINGLE; break;
        case IconTypes.USER: src = USER; break;
        case IconTypes.VOL: src = VOL; break;
        default: throw "Invalid icon type"
    }
    return (
        <img
            className={className ? `icon ${className}` : 'icon'}
            src={src}
        />
    );
}


export {
    Icon,
    IconTypes
}
import React from 'react';
import style from './tags_server.module.css';

function Tags_name_from_server({ selectedTagNames }) {
    return (
        <div className={style.tag_wrapper}>
            {selectedTagNames.map((tagName, index) => (
                <div key={index} className={style.tag}>
                    {tagName}
                </div>
            ))}
        </div>
    );
}

export default Tags_name_from_server
import { useState, useEffect, useRef, } from 'react';
import tagsData from './tagsData.json';
import style from './tag_selector.module.css';

function TagsSelector(props) {
  const [selectedCategory, setSelectedCategory] = useState('Design   ');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showGradient, setShowGradient] = useState(true);
  const containerRef = useRef(null); //we need this to get the height of the tags container

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    setSelectedTags([]);
  };

  const handleTagSelection = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((selectedTag) => selectedTag !== tag)
        : [...prevTags, tag]
    );
  };

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    const threshold = 2; // Set a small threshold value, else we never hit the bottom of the container due to margins and paddings that doesnt goes into account
    const atBottom = scrollTop + clientHeight + threshold >= scrollHeight; //when the scrolltop(the current pos of the visible part) and clientheight is the same or more then the containers height we hide the gradient
    setShowGradient(!atBottom);
};

  return (
    <div className={props.className}>
        <div className={style.header}>
            <p>How do we work?</p>
        </div>
        <div className={style.category_buttons}>
            {tagsData.map((category) => (
            <button
                key={category.title}
                onClick={() => handleCategorySelection(category.title)}
                className={`${selectedCategory === category.title ? style.selected : ''}`}
            >
            {category.title}
            </button>
            ))}
        </div>
        <div className={style.tags_wrapper}>
            <div className={style.tag_container} ref={containerRef} onScroll={handleScroll}>
                {selectedCategory &&
                tagsData
                    .find((category) => category.title === selectedCategory)
                    .tags.map((tag) => (
                    <button
                        key={tag}                
                        className={`${selectedTags.includes(tag) ? style.selected_tag : ''} ${style.tag_buttons}`}
                        onClick={() => handleTagSelection(tag)}
                    >
                    {tag}
                    </button>
                    ))}
            </div>
            {showGradient && <div className={style.gradientOverlay} />}
        </div>
    </div>
  );
}

export default TagsSelector;
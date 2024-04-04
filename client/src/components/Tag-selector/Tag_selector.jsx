import { useState, useEffect, useRef, } from 'react';
import tagsData from './tagsData.json';
import style from './tag_selector.module.css';

function TagsSelector(props) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showGradient, setShowGradient] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {    
    if (tagsData.length > 0) {
      setSelectedCategory(tagsData[0].title);
    }
  }, []);

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
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
    const threshold = 2;
    const atBottom = scrollTop + clientHeight + threshold >= scrollHeight;
    setShowGradient(!atBottom);
  };

  useEffect(() => {
    // Save selected tags to parent component
    props.onSaveSelectedTags({ category: selectedCategory, tags: selectedTags });
  }, [selectedTags]);

  if (!tagsData || tagsData.length === 0) {
    return <div>No tags data available</div>; // Handle case when tagsData is undefined or empty
  }

  return (
    <div className={props.className}>
      <div className={style.header}>
        <p>How do {props.who} work?</p>
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
          {tagsData
            .find((category) => category.title === selectedCategory)
            ?.tags.map((tag) => (
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
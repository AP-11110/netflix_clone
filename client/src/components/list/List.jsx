import './List.scss';
import ArrowBackIosOutlined from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlined from '@mui/icons-material/ArrowForwardIosOutlined';
import ListItem from '../listItem/ListItem';
import { useRef } from 'react';
import { useState } from 'react';

function List({list}) {
  const [slideNumber, setSlideNumber] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    // getBoundingClientRect returns x & y coordinates of the element
    let distance = listRef.current.getBoundingClientRect().x - 50;
    
    if(direction === 'left' && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`
    } else if(direction === 'right' && slideNumber < 4) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`
    }
  }
  return (
    <div className='list'>
        <span className='listTitle'>{list[0].name}</span>
        <div className="wrapper">
            <ArrowBackIosOutlined style={{ display: !isMoved && "none"}} className='sliderArrow left' onClick={() => handleClick('left')}/>
            <div className="container" ref={listRef}>
                {list.map((item, i) => (
                  <ListItem index={i} item={item} />
                ))}
                <ListItem index={0} />
            </div>
            <ArrowForwardIosOutlined className='sliderArrow right' onClick={() => handleClick('right')}/>
        </div>
    </div>
  )
}

export default List
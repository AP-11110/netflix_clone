import './listitem.scss';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Add from '@mui/icons-material/Add';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlined from '@mui/icons-material/ThumbDownOutlined';
import { useState } from 'react';

const ListItem = ({index, item}) => {
  const [isHovered, setIsHovered] = useState(false);
    return (
    <div 
      className='listItem'
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}   
    >
      <img
        src={item?.img}
        alt=""
      />
      {isHovered && (
        <>
          <video src={item.trailer} autoPlay={true} loop />
          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon" />
              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              {/* <span>{item.duration}</span> */}
              <span className="limit">+{item.agelimit}</span>
              <span>{item.year}</span>
            </div>
            <div className="desc">
              {item.about}
            </div>
            <div className="genre">{item.genre}</div>
          </div>
        </>
      )}
    </div>
  )
}

export default ListItem
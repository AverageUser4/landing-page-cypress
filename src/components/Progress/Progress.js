import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import css from './Progress.module.css';

import ProgressEnd from "../ProgressEnd/ProgressEnd";

import { useScrollContext } from "../../context/Scroll";
import { useViewportContext } from "../../context/Viewport";

import avatarSrc from './assets/avatar.png';

function Progress({ render }) {
  const { scrollY } = useScrollContext();
  const { viewportWidth } = useViewportContext();
  const [isAvatarReached, setIsAvatarReached] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const containerRef = useRef();
  const avatarRef = useRef();
  const isDesktopView = viewportWidth >= 1000;

  useEffect(() => {
    if(!containerRef.current) {
      return;
    }

    const { y, height } = containerRef.current.getBoundingClientRect(); 

    if(y <= -height + 358) {
      setIsEndReached(true);
    } else {
      setIsEndReached(false);
    }

    if(y <= 288) {
      setIsAvatarReached(true);
    } else {
      setIsAvatarReached(false);
    }

  }, [scrollY, viewportWidth]);

  return (
    <div>
      <div 
        className={css['items-container']}
        ref={containerRef}
      >
        {render({ isDesktopView })}
        {
          isDesktopView &&
            <img 
              className={`
                ${css['avatar']}
                ${isAvatarReached && css['avatar--fixed']}
                ${isEndReached && css['avatar--at-end']}
              `}
              src={avatarSrc}
              ref={avatarRef}
            />
        }
      </div>

      <ProgressEnd
        content={
          <>
            <h2 className="head head--b head--medium">Loved by <span className="grad-text grad-text--b">OSS</span>, trusted by <span className="grad-text grad-text--a">Enterprise</span></h2>
            <p className="para para--b para--big para--weight-300">Cypress is proud to support developers all around the world by making it easier to build and test modern applications.</p>
          </>
        }
        isEndReached={isEndReached}
      />
    </div>
  );
}

Progress.propTypes = {
  render: PropTypes.func.isRequired,
};

export default Progress;
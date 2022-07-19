import React from "react";
import styled from "styled-components";
import theme from "../../theme";

const LoaderEl = styled.div`
  position: absolute;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: auto;
  
  div.elasticball {
    display: flex;
    justify-content: center;
    position: relative;
    height: 6rem;

    &:before {
      content: '';
      width: 2rem;
      height: 2rem;
      bottom: 0;
      opacity: 0;
      border-radius: 50%;
      position: absolute;
      background-color: ${theme.colors.green};
      transform: scaleY(0.5) translateY(1rem);
      animation: elasticball-bottom .5s .3s infinite;
    }

    &__ball {
      width: 1.5rem;
      height: 1.5rem;
      transform-origin: 50% 100%;
      animation: elasticball .5s infinite cubic-bezier(1,-0.01,0,1);

      i {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
        background-color: ${theme.colors.green};

        animation: elasticball-color 2s infinite;
      }
    }
  }
  @keyframes elasticball {
    0% {
      transform: translateY(0) scaleY(1)
    } 50% {
        transform: translateY(4rem) scaleY(.7)
      } 100% {
          transform: translateY(0) scaleY(1)
        }
  }
  @keyframes elasticball-color {
    0% {
      background-color: ${theme.colors.green};
    } 30% {
        background-color: ${theme.colors.green};
      } 50% {
          background-color: #000000;
        } 80% {
            background-color: #000000;
          }
  }
  @keyframes elasticball-bottom {
    0% {
      transform: scale(1, 0.5) translateY(1rem);
      opacity: 0.3;
    } 100% {
        transform: scale(2, 0.5) translateY(1rem);
        opacity: 0;
      }
  }
`

export const Loader: React.FC = () => {
  return (
    <LoaderEl>
      <div className="elasticball">
        <div className="elasticball__ball"><i></i></div>
      </div>
    </LoaderEl>
  );
}




import { css, keyframes } from '@emotion/css'


export const tdStyles = css`
cursor: pointer;
text-align: left;
border-color: inherit;
border-style: solid;
border-width: 0 0 1px 0;
padding-left: 1rem;
min-width: 200px;
`
export const EmotionThStyles = css`
cursor: pointer;
text-align: left;
padding-left: 1rem;
min-width: 200px;
`


export const bRed = css`
padding: 32px;
background-color: hotpink;
font-size: 24px;
border-radius: 4px;
&:hover {
  color: white;
}
`


export const EmotionSearchContainer = css`
max-width: 500px;
margin: auto;
display: flex;
height: 100%;
flex-direction: column;
align-items: center;

`

export const EmotionThSticky = css`
  position: sticky;
  top: 0;
  background: white;
  padding-left: 1rem;
`



export const EmotionCalc = css`
max-height: calc(100% - 50px);
width: 100%;
border-radius: 1rem;
box-shadow: 0 0 2px 0px #9fa6b2;
padding: 1rem;
`

export const EmotionMessageBox = (is_read) => css`
  border-radius: 1rem;
  overflow-x: clip;
  min-width: 300px;
  max-width: 500px;
  background-color: ${is_read ? 'white' : '#fff8e4'} ;
  margin: 0.1rem;
  padding: 0.5rem;
  pre {
    white-space: pre-line;
  }

`


export const EmotionTabsContainer = css`
overflow: auto;
max-height: calc(100% - 105px);
margin-bottom: 20px;
padding-bottom: 35px;
min-height: 4rem;
`


export const EmotionTabsLink = (active) => css`
margin-bottom: 5px; 
display: flex;
padding-left: 1rem;
font-weight: ${active ? 'bold' : 'normal'};
${active && 'box-shadow: 0 0 13px 0px #9fa6b2;'}
text-transform: capitalize;
border-radius: 1em;
padding: 16px 8px 8px 8px;
flex-direction: column;
align-items: flex-start;
  h3 {
    font-weight: ${active ? 'bold' : 'normal'};
  }
    h5 {
    font-weight: ${active ? 'bold' : 'normal'};
  }
`;

// форма регистрации

export const EmotionLoginPage = css`
    --login-line-height: 1.5;
    line-height: var(--login-line-height);
    background-color: #2c3338;
    background: linear-gradient(45deg, #fc466b, #3f5efb);
    color: #fff;
    height: auto;
    min-height: 100%;
    width: 100%;
    display: flex;
    font-size: 16px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
export const EmotionLoginPageWrapper = css`
  --gap: 1.87rem;
    gap: var(--gap);
    padding: 3rem;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    border-radius: 1.375rem;
    border-left: 1px solid rgba(255, 255, 255, 0.3);
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 1.375rem 1.375rem 2.175rem -0.275rem rgba(0, 0, 0, 0.2);`

export const EmotionLoginPageInput = css`
    background: transparent;
    padding: 0.57em 1em;
    width: -webkit-fill-available;
    border: 0;
    border-left: 1px solid rgba(255, 255, 255, 0.3);
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 5000px;
    backdrop-filter: blur(5px);
    box-shadow: 4px 4px 60px rgba(0, 0, 0, 0.2);
    color: #fff;
    font-family: Montserrat, sans-serif;
    font-weight: 500;
    transition: all .2s ease-in-out;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      &:focus {
        outline: none;
    
    }
    `

export const EmotionInutMess = css`
    display: flex;
    border-radius: 1rem;
    border: solid;
    color: aqua;
    align-items: flex-end;
    `

export const EmotionChatInput = css`
    outline: none;
    border-radius: 1rem;
    padding: 10px 5px;
    resize: none;
    border: none;
    box-sizing: border-box;
    flex: 1;
    color: #4f4f4f;
  
`



export const EmotionPopupanimationKeyframesE = keyframes`
  
    0% {
      opacity: 0;
      transform: scale(0.9);
    }

    50% {
      opacity: .5;
      transform: scale(1.05);
    }

    to {
      opacity: 1;
      transform: scale(1);
    }
  
`;

export const EmotionPopupAnimation = css`
position: absolute;
inset: 40px;
border: 1px solid rgb(204, 204, 204);
background: rgb(255, 255, 255);
overflow: auto;
border-radius: 4px;
outline: none;
padding: 20px;
    animation: ${EmotionPopupanimationKeyframesE} .2s forwards;
    `;

export const EmotionChatTime = css`
    align-items: center;
    bottom: -5px;
    color: #00000073;
    font-size: 12px;
    justify-content: flex-end;
    right: -4px;
    text-align: right;
    user-select: none;
    `

export const EmotionChatFiles = css`
    background-color: #e9e9e9;
    border-radius: 5px;
    padding: 9px;
    cursor: pointer;
    `
export const EmotionChatName = css`
 color: #54b4d3;
font-weight: bold;
 `

export const EmotionChatBox = css`
border-radius: 1rem;
 background-image: url(https://smartqc.vercel.app/gif/8.gif);
  image-rendering: pixelated;
  background-size: 100% 100%;
 `

export const EmotionChantButtMoreMess = css`
  border-radius: inherit;
  backdrop-filter: blur(14px);
  background: #ffffff7d;
  margin: auto;
}
 `


export const EmotionChatListBox = css`
    overflow: hidden auto;
    height: 100%;
    padding: 1rem 0.5rem 5rem 0.4rem;
    background: rgb(214, 224, 231);
    border-radius: 1rem;
 `
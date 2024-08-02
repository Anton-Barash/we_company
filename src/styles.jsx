


import { css } from '@emotion/css'


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

export const EmotionMessageBox = css`
overflow-x: clip;
`


export const EmotionTabsContainer = css`
overflow: auto;
max-height: calc(100% - 105px);
margin-bottom: 20px;
padding-bottom: 35px;
min-height: 4rem;
`


export const tabsLink = (active) => css`
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
    border-radius: 1rem;
    border: solid;
    color: aqua;
    `

export const EmotionChatInput = css`
    padding: 10px 5px;
    resize: none;
    border: none;
    border-radius: 5px;
    box-sizing: border-box;
    flex: 1;
`
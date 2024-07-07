


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


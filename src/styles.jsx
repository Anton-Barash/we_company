


import { css } from '@emotion/css'


export const tdStyles = css`
  text-align: left;
  border-color: inherit;
  border-style: solid;
  border-width: 0 0 1px 0;
  padding-left: 1rem;
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


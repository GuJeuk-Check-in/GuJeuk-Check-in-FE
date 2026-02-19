import{H as e,J as t,q as n,y as r}from"./index-DShH7kvK.js";import{a as i,i as a}from"./VisitDatePicker-CAs64hCi.js";var o=t(n()),s=t(e()),c=({label:e,value:t,onChange:n,min:r=0,max:c=999})=>{let[m,h]=(0,o.useState)(String(t));(0,o.useEffect)(()=>{h(String(t))},[t]);let g=()=>{let e=Math.min(t+1,c);n(e)},_=()=>{let e=Math.max(t-1,r);n(e)},v=e=>{let t=e.target.value;/^\d*$/.test(t)&&h(t)},y=()=>{let e=Number(m);if(Number.isNaN(e)){h(String(t));return}let i=Math.min(Math.max(e,r),c);n(i),h(String(i))};return(0,s.jsxs)(l,{children:[(0,s.jsx)(u,{children:e}),(0,s.jsxs)(d,{children:[(0,s.jsx)(f,{onClick:_,disabled:t<=r,children:(0,s.jsx)(a,{})}),(0,s.jsx)(p,{value:m,onChange:v,onBlur:y,onKeyDown:e=>e.key===`Enter`&&y()}),(0,s.jsx)(f,{onClick:g,disabled:t>=c,children:(0,s.jsx)(i,{})})]})]})},l=r.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 49%;
  height: auto;
  box-sizing: border-box;
`,u=r.label`
  font-size: 1.25rem;
  color: #2e2e32;
  font-weight: 500;
`,d=r.div`
  height: 3.5rem;
  font-size: 1.25rem;
  color: #2e2e32;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  border: 0.0625rem solid #404040;
  border-radius: 0.5rem;
`,f=r.button`
  border: none;
  border-radius: 0.5rem;
  background-color: white;
  font-size: 1.25rem;
  color: #404040;
  cursor: pointer;
`,p=r.input`
  width: 3rem;
  text-align: center;
  font-size: 1.25rem;
  border: none;
  outline: none;
  background: transparent;
  color: #2e2e32;
`;export{c as t};
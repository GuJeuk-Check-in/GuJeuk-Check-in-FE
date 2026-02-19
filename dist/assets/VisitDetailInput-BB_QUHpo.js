import{H as e,J as t,q as n,y as r}from"./index-DShH7kvK.js";n();var i=t(e()),a=({label:e,value:t,width:n=`100%`,isEditable:r=!1,name:a,onChange:m,type:h=`text`,options:g=[],placeholder:_=``})=>(0,i.jsxs)(o,{width:n,children:[(0,i.jsx)(s,{children:e}),(()=>r?h===`select`?(0,i.jsx)(d,{name:a,value:t,onChange:e=>m?.(e),children:g.map(e=>(0,i.jsx)(`option`,{value:e.value,children:e.label},e.value))}):h===`checkbox`?(0,i.jsx)(f,{isEditable:!0,children:(0,i.jsx)(p,{type:`checkbox`,name:a,checked:!!t,onChange:e=>m?.(e),id:`${a}-${e}`})}):(0,i.jsx)(c,{isEditable:!0,children:(0,i.jsx)(l,{type:h,name:a,value:t,onChange:e=>m?.(e),readOnly:!1,placeholder:_,min:h===`number`?0:void 0})}):h===`checkbox`?(0,i.jsx)(c,{isEditable:!1,children:(0,i.jsx)(u,{children:t?`동의 (O)`:`미동의 (X)`})}):(0,i.jsx)(c,{isEditable:!1,children:(0,i.jsx)(u,{children:t})}))()]}),o=r.div`
  width: ${({width:e})=>e};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-sizing: border-box;
`,s=r.label`
  display: block;
  font-size: 1.25rem;
  color: #2e2e32;
  font-weight: 500;
`,c=r.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1rem;
  height: 3.5rem;
  border: 0.0625rem solid #404040;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  color: #2e2e32;
  background-color: #ffffff;
  box-shadow: none;
`,l=r.input`
  flex-grow: 1;
  border: none;
  outline: none;
  font-size: 1.25rem;
  color: #2e2e32;
  padding: 0;
  background-color: transparent;
  color: #000000;

  &[type='date'],
  &[type='number'] {
    cursor: pointer;
  }
`,u=r.p`
  margin: 0;
  font-size: 1.25rem;
  color: #2e2e32;
  width: 100%;
`,d=r.select`
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 3.5rem;
  padding: 0 1rem;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  color: #2e2e32;
  background-color: #ffffff;
  background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd" /></svg>');
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.2rem;
  cursor: pointer;
  outline: none;
`,f=r(c)`
  justify-content: flex-start;
  padding: 0 1rem;
  background-color: #ffffff;
`,p=r.input`
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
  margin: 0;
`;export{a as t};
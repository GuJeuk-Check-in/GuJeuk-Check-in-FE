import{t as e}from"./useQuery-ooN1U0-p.js";import{H as t,J as n,b as r,p as i,q as a,x as o,y as s}from"./index-DShH7kvK.js";import{a as c}from"./md-DamMGJIS.js";const l=async()=>(await r.get(`/purpose/all`)).data,u=async e=>(await r.post(`/purpose`,e)).data,d=async(e,t)=>{await r.patch(`/purpose/${e}`,t)},f=async e=>(await r.patch(`/purpose/move`,e)).data,p=async e=>(await r.delete(`/purpose/${e}`)).data;var m=o(e=>({purposes:[],updatePurpose:(t,n)=>e(e=>({purposes:e.purposes.map(e=>e.id===t?{...e,purpose:n}:e)}))}));const h=()=>e({queryKey:[`purposeList`],queryFn:l,staleTime:1e3*60*5});var g=n(a()),_=n(t()),v=({purpose:e,onDelete:t,onUpdate:n,isDeleting:r})=>{let[a,o]=(0,g.useState)(!1),[s,c]=(0,g.useState)(e.purpose),[l,u]=(0,g.useState)(!1),d=e=>{e.stopPropagation()},f=()=>{let t=s.trim();if(!t){m();return}if(t===e.purpose){o(!1);return}n({id:e.id,newPurpose:t}),o(!1)},p=()=>{if(l){setTimeout(()=>u(!1),0);return}f()},m=()=>{c(e.purpose),o(!1)};return(0,_.jsxs)(y,{isDisabled:r,children:[(0,_.jsx)(b,{type:`button`,onClick:()=>t(e.id),onPointerDown:e=>e.stopPropagation(),onMouseDown:e=>e.stopPropagation(),isDeleting:r,disabled:r,children:r?`...`:(0,_.jsx)(i,{size:`1.25rem`,style:{pointerEvents:`none`}})}),a?(0,_.jsx)(S,{type:`text`,value:s,onChange:e=>c(e.target.value),onBlur:p,onPointerDown:d,onMouseDown:d,onKeyDown:e=>{r||(e.stopPropagation(),e.key===`Enter`&&(e.preventDefault(),u(!0),f()),e.key===`Escape`&&m())},autoFocus:!0,disabled:r,onClick:e=>e.stopPropagation()}):(0,_.jsxs)(x,{children:[e.purpose,(0,_.jsx)(C,{size:18,onClick:()=>{r||o(!0)},onPointerDown:d,onMouseDown:d,$isDisabled:r})]})]})},y=s.div`
  width: 100%;
  max-width: 20.625rem;
  height: 9.375rem;
  background-color: #ffffff;
  border-radius: 1.25rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 500;
  color: #3a3a3a;
  opacity: ${e=>e.isDisabled?.7:1};
  box-shadow: 0 0.125rem 0.375rem rgba(0, 0, 0, 0.08);
`,b=s.button`
  background: none;
  border: none;
  padding: 0;
  outline: none;
  position: absolute;
  top: 0.625rem;
  right: 0.75rem;
  color: ${e=>e.isDeleting?`#aaaaaa`:`#dc7676`};
  cursor: ${e=>e.isDeleting?`not-allowed`:`pointer`};
  transition: 0.2s ease;
  z-index: 10;

  &:hover {
    transform: ${e=>e.isDeleting?`none`:`scale(1.1)`};
  }
`,x=s.span`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  gap: 0.375rem;
`,S=s.input`
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  border: none;
  border-bottom: 0.125rem solid #1e3a8a;
  outline: none;
  width: 80%;
  color: #2e2e32;
  padding: 0;
`,C=s(c)`
  cursor: ${e=>e.$isDisabled?`not-allowed`:`pointer`};
  color: ${e=>(e.$isDisabled,`#666`)};
  transition: color 0.2s;
  position: relative;
  z-index: 10;

  &:hover {
    color: ${e=>e.$isDisabled?`#666`:`#1e3a8a`};
  }
`;export{p as a,u as i,h as n,d as o,m as r,f as s,v as t};
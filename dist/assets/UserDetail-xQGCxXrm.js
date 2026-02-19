import{t as e}from"./GlobalLayout-RZNjXhXG.js";import"./useInfiniteQuery-BVLlJtvg.js";import"./useQuery-ooN1U0-p.js";import{H as t,J as n,W as r,a as i,c as a,d as o,f as s,l as c,n as l,q as u,u as d,y as f}from"./index-DShH7kvK.js";import{n as p}from"./Logo-Crftf5tV.js";import{n as m}from"./purpose-DQPHFYT6.js";import"./md-DamMGJIS.js";import{n as h,r as g,s as _,t as v}from"./VisitDatePicker-CAs64hCi.js";import{t as y}from"./CountVisitor-CGRnS7pZ.js";import"./useUpdateVisitList-DbefgRWi.js";import{a as b}from"./visit-BEbRtxLC.js";var x=n(u()),S=n(t()),C=({label:e,placeholder:t,icon:n=(0,S.jsx)(s,{size:`1.5rem`}),value:r,onChange:i,width:a=`100%`,onClick:o,readOnly:c=!1})=>(0,S.jsxs)(w,{width:a,onClick:o,children:[(0,S.jsx)(T,{children:e}),` `,(0,S.jsxs)(E,{children:[n,(0,S.jsx)(D,{type:`text`,placeholder:t,value:r,onChange:i,style:{cursor:o?`pointer`:`text`}})]})]}),w=f.div`
  width: ${({width:e})=>e};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-sizing: border-box;
`,T=f.label`
  display: block;
  font-size: 1.25rem;
  color: #2e2e32;
  font-weight: 500;
`,E=f.div`
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
`,D=f.input`
  flex-grow: 1;
  border: none;
  outline: none;
  font-size: 1.25rem;
  color: #2e2e32;
  padding: 0;
`,O=Array.from({length:12},(e,t)=>t+1),k=Array.from({length:60},(e,t)=>t),A=e=>String(e).padStart(2,`0`),j=({value:e,onChange:t,label:n=`방문시간`})=>{let[r,i]=(0,x.useState)(!1),[a,o]=(0,x.useState)(`PM`),[s,l]=(0,x.useState)(5),[u,f]=(0,x.useState)(25),p=(0,x.useRef)(null),m=(0,x.useRef)(null);(0,x.useEffect)(()=>{if(!e)return;let[t,n]=e.split(`:`).map(Number);o(t>=12?`PM`:`AM`),l(t===0?12:t>12?t-12:t),f(n)},[]);let g=()=>{let e=s%12;return a===`PM`&&(e+=12),a===`AM`&&s===12&&(e=0),e};(0,x.useEffect)(()=>{let e=g();t(`${A(e)}:${A(u)}`)},[a,s,u]);let _=()=>{if(!p.current)return;let e=p.current.scrollTop,t=Math.round(e/48);O[t]!==void 0&&l(O[t])},v=()=>{if(!m.current)return;let e=m.current.scrollTop,t=Math.round(e/48);k[t]!==void 0&&f(k[t])};(0,x.useEffect)(()=>{r&&requestAnimationFrame(()=>{let e=O.indexOf(s),t=u;p.current&&e>=0&&(p.current.scrollTop=e*48),m.current&&(m.current.scrollTop=t*48)})},[r]);let y=`${A(g())}:${A(u)}`;return(0,S.jsxs)(M,{children:[(0,S.jsx)(N,{children:n}),(0,S.jsxs)(P,{onClick:()=>i(e=>!e),children:[(0,S.jsx)(F,{children:(0,S.jsx)(h,{size:20,color:`#666`})}),(0,S.jsx)(I,{children:y}),r?(0,S.jsx)(d,{}):(0,S.jsx)(c,{})]}),r&&(0,S.jsx)(L,{children:(0,S.jsx)(R,{children:(0,S.jsxs)(z,{children:[(0,S.jsxs)(H,{children:[(0,S.jsx)(U,{selected:a===`AM`,onClick:()=>o(`AM`),children:`오전`}),(0,S.jsx)(U,{selected:a===`PM`,onClick:()=>o(`PM`),children:`오후`})]}),(0,S.jsxs)(B,{children:[(0,S.jsx)(V,{children:`시`}),(0,S.jsxs)(W,{ref:p,onScroll:_,children:[(0,S.jsx)(G,{}),O.map(e=>(0,S.jsx)(K,{selected:s===e,children:e},e)),(0,S.jsx)(G,{})]})]}),(0,S.jsxs)(B,{children:[(0,S.jsx)(V,{children:`분`}),(0,S.jsxs)(W,{ref:m,onScroll:v,children:[(0,S.jsx)(G,{}),k.map(e=>(0,S.jsx)(K,{selected:u===e,children:e},e)),(0,S.jsx)(G,{})]})]})]})})})]})},M=f.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`,N=f.label`
  font-size: 1.25rem;
  color: #2e2e32;
  font-weight: 500;
`,P=f.div`
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
  cursor: pointer;
`,F=f.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,I=f.span`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  color: #2e2e32;
`,L=f.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 50%;
  transform: translateX(-50%);
  width: 880px;
  height: 380px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  overflow: hidden;
`,R=f.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 3rem;
  box-sizing: border-box;
`,z=f.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 92px;
`,B=f.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`,V=f.div`
  width: 21px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 700;
  color: #666;
  margin-bottom: 10px;
`,H=f.div`
  width: 120px;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`,U=f.div`
  text-align: center;
  font-size: ${({selected:e})=>e?`1.5rem`:`1.25rem`};
  font-weight: ${({selected:e})=>e?700:400};
  color: ${({selected:e})=>e?`#000`:`#bbb`};
  cursor: pointer;
  padding: 12px 24px;
  transition: all 0.15s;

  &:hover {
    color: #333;
  }
`,W=f.div`
  width: 80px;
  height: 180px;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`,G=f.div`
  height: 66px;
`,K=f.div`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: center;
  font-size: ${({selected:e})=>e?`1.5rem`:`1.25rem`};
  font-weight: ${({selected:e})=>e?700:400};
  color: ${({selected:e})=>e?`#000`:`#bbb`};
  cursor: pointer;
  transition: all 0.15s;
`;const q=(e=``,t)=>{let[n,r]=(0,x.useState)(e);return{value:n,onChange:e=>{let n=e.target.value;t&&(n=t(n)),r(n)},setValue:r,reset:()=>r(e)}},J=(e=!1)=>{let[t,n]=(0,x.useState)(e);return{checked:t,onChange:e=>{n(e.target.checked)},setChecked:n}},Y=(e=0)=>{let[t,n]=(0,x.useState)(e);return{count:t,setCount:n,reset:()=>n(e)}};var X=({onSubmit:e,isLoading:t,isError:n,error:r})=>{let s={"0~8세":`BABY`,"9~13세":`AGE_9_13`,"14~16세":`AGE_14_16`,"17~19세":`AGE_17_19`,"20~24세":`AGE_20_24`,성인:`ADULT`},c=q(``),l=q(``),[u,d]=(0,x.useState)(``),[f,p]=(0,x.useState)(``),h=Y(0),b=Y(0),[w,T]=(0,x.useState)(``),E=J(!0),[D,O]=(0,x.useState)(``),[k,A]=(0,x.useState)(``),{data:M,isLoading:N}=m(),P=()=>{c.reset(),l.reset(),h.reset(),b.reset(),d(``),p(``),T(``),E.setChecked(!0)},F=async()=>{let t=f.trim();if(!c.value||!l.value||!t||!w||!u||!D||!k){alert(`모든 필수 필드를 입력해주세요.`);return}if(!E.checked){alert(`개인정보 수집 및 이용에 동의해야 합니다.`);return}let n={name:c.value,age:s[u],phone:l.value,residence:D,maleCount:h.count,femaleCount:b.count,purpose:t,visitDate:w,visitTime:k,privacyAgreed:E.checked};try{await e(n),P()}catch{}},I=Array.isArray(M)?M.map(e=>e.purpose):[],L=Object.keys(s);return(0,S.jsxs)(Z,{children:[(0,S.jsxs)(Q,{children:[(0,S.jsxs)($,{children:[(0,S.jsx)(C,{label:`이름`,placeholder:`이름을 입력하세요`,...c}),(0,S.jsx)(_,{label:`연령`,options:L,value:u,onChange:d,icon:(0,S.jsx)(a,{size:24})})]}),(0,S.jsx)(C,{label:`연락처`,placeholder:`연락처를 입력해주세요 ex) 010-1234-5678`,icon:(0,S.jsx)(o,{size:24}),...l}),(0,S.jsx)(_,{label:`방문 목적`,options:N?[`불러오는 중...`]:I.length>0?I:[`기타`],placeholder:`방문 목적을 선택해주세요`,value:f,onChange:p,icon:(0,S.jsx)(g,{size:24}),disable:t||N||!I.length}),(0,S.jsx)(_,{label:`거주지`,options:[`구즉동`,`관평동`,`노은 1동`,`노은 2동`,`노은 3동`,`상대동`,`신성동`,`온천 1동`,`온천 2동`,`원신흥동`,`전민동`,`진잠동`,`학하동`,`기타지역`],placeholder:`거주지를 선택해주세요`,value:D,onChange:O,icon:(0,S.jsx)(g,{size:24})}),(0,S.jsxs)(re,{children:[(0,S.jsx)(y,{label:`방문 남성 수`,value:h.count,onChange:h.setCount}),(0,S.jsx)(y,{label:`방문 여성 수`,value:b.count,onChange:b.setCount})]}),(0,S.jsx)(v,{value:w,onChange:T}),(0,S.jsx)(j,{value:k,onChange:A}),(0,S.jsxs)(ee,{children:[(0,S.jsx)(te,{type:`checkbox`,checked:E.checked,onChange:E.onChange,disabled:t}),(0,S.jsx)(ne,{children:`개인정보 수집 및 이용 동의`})]})]}),n&&(0,S.jsxs)(ie,{children:[`등록에 실패했습니다: `,r?.message||`알 수 없는 서버 오류.`]}),(0,S.jsx)(i,{content:t?`등록 중...`:`추가`,onClick:F,disable:t||N})]})},Z=f.div`
  width: 90%;
  max-width: 59.375rem;
  height: auto;
  background-color: #ffffff;
  border-radius: 1.25rem;
  padding: 2.5rem;
  box-shadow: 0 0.25rem 1.25rem rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.875rem;
`,Q=f.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`,$=f.div`
  display: flex;
  gap: 1.25rem;
  width: 100%;

  & > * {
    flex: 1;
  }
`,ee=f.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
`,te=f.input`
  width: 1.25rem;
  height: 1.25rem;
  appearance: none;
  border: 0.125rem solid #d1d8e0;
  border-radius: 0.25rem;
  background-color: #f8f9fa;
  position: relative;
  cursor: pointer;

  &:checked {
    background-color: #3f73b3;
    border-color: #3f73b3;
  }

  &:checked::before {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    font-size: 1rem;
  }
`,ne=f.span`
  font-size: 1rem;
  color: #6e7680;
`,re=f.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`,ie=f.div`
  color: #d32f2f;
  font-size: 0.875rem;
  margin-top: -0.625rem;
  text-align: center;
  width: 100%;
`,ae=()=>{let t=r(),{mutate:n,isLoading:i,isError:a,error:o,modal:s}=b({onSuccessCallback:()=>{t(`/log`)}});return(0,S.jsxs)(oe,{children:[(0,S.jsx)(p,{}),(0,S.jsx)(e,{title:i?`등록 중...`:`시설 이용 기록 추가`}),(0,S.jsx)(se,{children:(0,S.jsx)(X,{onSubmit:e=>{n(e)},isLoading:i,isError:a,error:o})}),(0,S.jsx)(l,{isOpen:s.isOpen,config:s.config,onClose:s.closeModal})]})},oe=f.div`
  margin-left: 20rem;
  width: calc(100% - 20rem);
  min-height: 100vh;
  padding: 3.5rem 0;
  box-sizing: border-box;
`,se=f.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
`;export{ae as default};
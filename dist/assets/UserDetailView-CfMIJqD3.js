import{t as e}from"./GlobalLayout-RZNjXhXG.js";import"./useQuery-ooN1U0-p.js";import{G as t,H as n,J as r,_ as i,a,g as o,n as s,q as c,r as l,y as u}from"./index-DShH7kvK.js";import{n as d}from"./Logo-Crftf5tV.js";import{n as f}from"./purpose-DQPHFYT6.js";import"./md-DamMGJIS.js";import{t as p}from"./VisitDetailInput-BB_QUHpo.js";import{s as m,t as h}from"./VisitDatePicker-CAs64hCi.js";import{t as g}from"./CountVisitor-CGRnS7pZ.js";import{n as _,t as v}from"./useUpdateVisitList-DbefgRWi.js";var y=r(c()),b=r(n()),x=[{value:`BABY`,label:`0~8세`},{value:`AGE_9_13`,label:`9~13세`},{value:`AGE_14_16`,label:`14~16세`},{value:`AGE_17_19`,label:`17~19세`},{value:`AGE_20_24`,label:`20~24세`},{value:`ADULT`,label:`성인`}],S=x.reduce((e,t)=>(e[t.value]=t.label,e),{}),C=x.map(e=>e.label),w=({content:e,onClick:t,disabled:n})=>(0,b.jsx)(a,{content:e,onClick:t,disabled:n}),T=()=>{let{logId:n}=t(),[r,a]=(0,y.useState)(!1),[c,u]=(0,y.useState)(null),T=l(),{data:P,isLoading:F,isError:I,error:L}=_(n),R=v(),{data:z=[],isLoading:B,isError:V}=f(),H=Array.isArray(z)?z.map(e=>e.purpose):[];(0,y.useEffect)(()=>{P&&u({id:P.id||``,name:P.name||``,age:P.age||`ADULT`,phone:P.phone||``,maleCount:P.maleCount||0,femaleCount:P.femaleCount||0,purpose:P.purpose||``,visitDate:P.visitDate||``,privacyAgreed:P.privacyAgreed||!1})},[P]);let U=e=>S[e]||e,W=e=>{let t=x.find(t=>t.value===e);return t?t.label:e},G=e=>{let{name:t,value:n,type:r,checked:i}=e.target;if(t===`phone`){u(e=>({...e,[t]:formattedValue}));return}u(e=>({...e,[t]:r===`checkbox`?i:n}))},K=e=>{u(t=>({...t,visitDate:e}))},q=e=>{let t=x.find(t=>t.label===e)?.value||e;u(e=>({...e,age:t}))},J=()=>{B||a(!0)},Y=()=>{if(!c)return;if(!c.name||!c.phone||!c.purpose.trim()||!c.visitDate){T.openModal({icon:(0,b.jsx)(o,{size:48,color:`#D88282`}),title:`입력 확인`,subtitle:`필수 필드를 모두 입력해주세요.`,theme:`warning`,buttons:[{label:`확인`,onClick:T.closeModal}]});return}let e={id:c.id,name:c.name,age:c.age||`ADULT`,phone:c.phone,maleCount:Number(c.maleCount),femaleCount:Number(c.femaleCount),purpose:c.purpose,visitDate:c.visitDate,privacyAgreed:c.privacyAgreed};R.mutate(e,{onSuccess:()=>{T.openModal({icon:(0,b.jsx)(i,{size:48,color:`#0F50A0`}),title:`수정 완료`,subtitle:`시설 이용 정보가 성공적으로 수정되었습니다.`,theme:`info`,buttons:[{label:`확인`,variant:`primary`,bgColor:`#0F50A0`,onClick:()=>{T.closeModal(),window.location.reload()}}]})},onError:e=>{T.openModal({icon:(0,b.jsx)(o,{size:48,color:`#D88282`}),title:`수정 실패`,subtitle:e.message||`알 수 없는 오류가 발생했습니다.`,theme:`warning`,buttons:[{label:`닫기`,onClick:T.closeModal}]})}})},X=()=>{P&&u({id:P.id,name:P.name||``,age:P.age||`ADULT`,phone:P.phone||``,maleCount:P.maleCount||0,femaleCount:P.femaleCount||0,purpose:P.purpose||``,visitDate:P.visitDate||``,privacyAgreed:P.privacyAgreed||!1}),a(!1)};if(F||B)return(0,b.jsxs)(E,{children:[(0,b.jsx)(d,{}),(0,b.jsx)(e,{title:`시설 이용 상세 조회`}),(0,b.jsx)(D,{children:(0,b.jsx)(A,{children:B?`목적 목록을 불러오는 중...`:`상세 기록을 불러오는 중...`})})]});if(I||V)return(0,b.jsxs)(E,{children:[(0,b.jsx)(d,{}),(0,b.jsx)(e,{title:`시설 이용 상세 조회`}),(0,b.jsx)(D,{children:(0,b.jsxs)(j,{children:[`기록 조회에 실패했습니다:`,` `,L?.message||`방문 목적 목록을 불러오는 데 실패했습니다.`]})})]});if(!P)return(0,b.jsxs)(E,{children:[(0,b.jsx)(d,{}),(0,b.jsx)(e,{title:`시설 이용 상세 조회`}),(0,b.jsx)(D,{children:(0,b.jsx)(A,{children:`기록을 찾을 수 없습니다.`})})]});let Z=U(P.age);return(0,b.jsxs)(E,{children:[(0,b.jsx)(d,{}),(0,b.jsx)(e,{title:`시설 이용 ${r?`수정`:`상세 조회`}`}),(0,b.jsxs)(D,{children:[(0,b.jsxs)(O,{children:[(0,b.jsx)(p,{label:`대표자 이름`,name:`name`,value:r&&c?c.name:P.name,onChange:r?G:null,isEditable:r}),r&&c?(0,b.jsx)(N,{children:(0,b.jsx)(m,{label:`연령`,options:C,value:W(c.age),onChange:q})}):(0,b.jsx)(p,{label:`연령`,value:Z,isEditable:!1})]}),(0,b.jsx)(p,{label:`연락처`,name:`phone`,value:r&&c?c.phone:P.phone,onChange:r?G:null,isEditable:r,type:`tel`}),r&&c?(0,b.jsx)(m,{label:`방문 목적`,options:B?[`목록 불러오는 중...`]:H.length>0?H:[`관리자 설정 목록 없음`],placeholder:`방문 목적을 선택해주세요`,value:c.purpose,onChange:e=>G({target:{name:`purpose`,value:e}}),disabled:B}):(0,b.jsx)(p,{label:`방문 목적`,value:P.purpose,isEditable:!1}),r&&c?(0,b.jsx)(h,{value:c.visitDate,onChange:K}):(0,b.jsx)(p,{label:`방문 날짜`,value:P.visitDate,isEditable:!1}),(0,b.jsx)(k,{children:r&&c?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(g,{label:`방문 남성 수`,value:c.maleCount,onChange:e=>G({target:{name:`maleCount`,value:e}})}),(0,b.jsx)(g,{label:`방문 여성 수`,value:c.femaleCount,onChange:e=>G({target:{name:`femaleCount`,value:e}})})]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(p,{label:`방문 남성 수`,value:P.maleCount,isEditable:!1,width:`50%`}),(0,b.jsx)(p,{label:`방문 여성 수`,value:P.femaleCount,isEditable:!1,width:`50%`})]})}),(0,b.jsx)(p,{label:`개인 정보 수집 동의`,name:`privacyAgreed`,value:r&&c?c.privacyAgreed:P.privacyAgreed,onChange:r?G:null,isEditable:r,type:`checkbox`}),(0,b.jsx)(M,{children:r?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(w,{content:R.isLoading?`저장 중...`:`저장`,onClick:Y,disabled:R.isLoading||B}),(0,b.jsx)(w,{content:`취소`,onClick:X,disabled:R.isLoading})]}):(0,b.jsx)(w,{content:`수정`,onClick:J,disabled:B})})]}),(0,b.jsx)(s,{isOpen:T.isOpen,config:T.config,onClose:T.closeModal})]})},E=u.div`
  margin-left: 20rem;
  width: calc(100% - 20rem);
  min-height: 100vh;
  padding: 3.5rem 0;
  box-sizing: border-box;
`,D=u.div`
  width: 90%;
  max-width: 60rem;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 1.25rem;
  padding: 2.5rem;
  box-shadow: 0 0.25rem 1.25rem rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`,O=u.div`
  display: flex;
  gap: 1.25rem;
  width: 100%;

  & > * {
    flex: 1;
  }
`,k=u.div`
  display: flex;
  gap: 1.25rem;
  width: 100%;

  & > * {
    flex: 1;
  }
`,A=u.p`
  text-align: center;
  margin: 3.125rem 0;
  color: #777;
  font-size: 1.1rem;
`,j=u(A)`
  color: #ff007b;
  font-weight: bold;
`,M=u.div`
  display: flex;
  justify-content: center;
  gap: 0.625rem;
  margin-top: 1.25rem;
`,N=u.div`
  flex: 1;
`;export{T as default};
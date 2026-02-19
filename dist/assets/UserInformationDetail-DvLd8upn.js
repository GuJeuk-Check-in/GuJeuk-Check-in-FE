import{t as e}from"./GlobalLayout-RZNjXhXG.js";import{t}from"./useQuery-ooN1U0-p.js";import{G as n,H as r,J as i,W as a,_ as o,a as s,g as c,m as l,n as u,q as d,r as f,y as p}from"./index-DShH7kvK.js";import{n as m}from"./Logo-Crftf5tV.js";import{t as h}from"./VisitDetailInput-BB_QUHpo.js";import{o as g,s as _,t as v}from"./VisitDatePicker-CAs64hCi.js";import{n as y,t as b}from"./useUpdateUser-siXKOuHb.js";var x=i(d()),S=i(r()),C=({label:e,options:t,value:n,onChange:r,placeholder:i})=>{let[a,o]=(0,x.useState)(!1),s=()=>{o(e=>!e)},c=e=>{r(e),o(!1)};return(0,S.jsxs)(w,{children:[e&&(0,S.jsx)(T,{children:e}),(0,S.jsxs)(E,{children:[(0,S.jsxs)(D,{onClick:s,children:[(0,S.jsx)(O,{children:n||i||`${e} 선택`}),(0,S.jsx)(k,{isOpen:a})]}),a&&(0,S.jsx)(A,{children:t.map(e=>(0,S.jsx)(j,{onClick:()=>c(e),isSelected:e===n,children:e},e))})]})]})},w=p.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 96.5%;
  position: relative;
`,T=p.label`
  font-size: 1.25rem;
  color: #2e2e32;
  font-weight: 500;
`,E=p.div`
  position: relative;
  width: 100%;
`,D=p.div`
  width: 100%;
  height: 3.5rem;
  border: 0.0625rem solid #404040;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  font-size: 1.125rem;
  color: #2e2e32;
  cursor: pointer;
  background-color: #fff;
`,O=p.span`
  text-align: left;
`,k=p.div`
  width: 0;
  height: 0;
  border-left: 0.375rem solid transparent;
  border-right: 0.375rem solid transparent;
  border-top: ${({isOpen:e})=>e?`none`:`0.375rem solid #2e2e32`};
  border-bottom: ${({isOpen:e})=>e?`0.375rem solid #2e2e32`:`none`};
`,A=p.div`
  position: absolute;
  top: 3.75rem;
  width: 100%;
  max-height: 13.75rem;
  overflow-y: auto;
  background-color: #ffffff;
  border: 0.0625rem solid #404040;
  border-radius: 0.5rem;
  box-shadow: 0 0.375rem 0.625rem rgba(0, 0, 0, 0.1);
  z-index: 100;
`,j=p.div`
  padding: 12px 16px;
  font-size: 1rem;
  color: ${({isSelected:e})=>e?`#ffffff`:`#2e2e32`};
  background-color: ${({isSelected:e})=>e?`#2e2e32`:`#ffffff`};
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: ${({isSelected:e})=>e?`#2e2e32`:`#f5f5f5`};
  }
`,M=[{value:`MALE`,label:`남성`},{value:`FEMALE`,label:`여성`}],N={MALE:`남성`,FEMALE:`여성`},P=[`구즉동`,`관평동`,`노은1동`,`노은2동`,`노은3동`,`상대동`,`신성동`,`온천1동`,`온천2동`,`원신흥동`,`전민동`,`진잠동`,`학하동`,`기타 지역`],F=({id:e,name:t,userId:n,phone:r,gender:i,birthYMD:o,residence:c,privacyAgreed:u,onSave:d,onEditStateChange:f})=>{let p=a(),[m,y]=(0,x.useState)(!1),[b,w]=(0,x.useState)({id:e,name:t,userId:n,phone:r,gender:i,birthYMD:o,residence:c,privacyAgreed:u}),T=e=>{let{name:t,value:n,type:r}=e.target,i=e.target.checked;w(e=>({...e,[t]:r===`checkbox`?i:n}))},E=()=>{y(!0),f&&f(!0)},D=()=>{d?d(b):(y(!1),f&&f(!1))},O=()=>{w({id:e,name:t,userId:n,phone:r,gender:i,birthYMD:o,residence:c,privacyAgreed:u}),y(!1),f&&f(!1)},k=N[i];return(0,S.jsxs)(I,{children:[(0,S.jsx)(L,{children:(0,S.jsx)(R,{onClick:()=>p(`/admin/user/all`),children:(0,S.jsx)(l,{size:20})})}),(0,S.jsx)(h,{label:`이름`,name:`name`,value:m?b.name:t,onChange:m?T:null,isEditable:m}),(0,S.jsx)(h,{label:`사용자 ID`,name:`userId`,value:m?b.userId:n,onChange:m?T:null,isEditable:m}),(0,S.jsx)(h,{label:`연락처`,name:`phone`,value:m?b.phone:r,onChange:m?T:null,isEditable:m,type:`tel`}),m?(0,S.jsx)(_,{label:`성별`,options:M.map(e=>e.label),value:N[b.gender],onChange:e=>{let t=M.find(t=>t.label===e);t&&T({target:{name:`gender`,value:t.value}})},icon:(0,S.jsx)(g,{size:24})}):(0,S.jsx)(h,{label:`성별`,value:k,name:`gender`,onChange:()=>{},isEditable:!1}),m?(0,S.jsx)(v,{label:`생년월일`,value:b.birthYMD,onChange:e=>{T({target:{name:`birthYMD`,value:e}})}}):(0,S.jsx)(h,{label:`생년월일`,value:o,name:`birthYMD`,onChange:()=>{},isEditable:!1}),m?(0,S.jsx)(C,{label:`거주지`,options:P,value:b.residence,onChange:e=>{T({target:{name:`residence`,value:e}})}}):(0,S.jsx)(h,{label:`거주지`,value:c,name:`residence`,onChange:()=>{},isEditable:!1}),(0,S.jsx)(z,{children:m?(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(s,{content:`저장`,onClick:D}),(0,S.jsx)(s,{content:`취소`,onClick:O})]}):(0,S.jsx)(s,{content:`수정`,onClick:E})})]})},I=p.div`
  width: 100%;
  max-width: 80rem;
  margin: 2.5rem auto;
  background-color: #ffffff;
  border-radius: 1.25rem;
  padding: 2rem;
  box-shadow: 0 0.25rem 1.25rem rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,L=p.div`
  position: relative;
  padding-bottom: 2.225rem;
`,R=p.button`
  position: absolute;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(-0.25rem);
  }
`,z=p.div`
  display: flex;
  justify-content: center;
  gap: 0.625rem;
  margin-top: 1.25rem;
`;const B=e=>t({queryKey:[`user`,e],queryFn:()=>y(e),enabled:!!e,staleTime:1e3*60*5});var V=()=>{let{userId:t}=n(),[r,i]=(0,x.useState)(!1),[a,s]=(0,x.useState)(null),l=f(),{data:d,isLoading:p,isError:h,error:g,refetch:_}=B(t),v=b();return(0,x.useEffect)(()=>{d&&s({id:d.id||parseInt(t||`0`,10),name:d.name||``,userId:d.userId||``,phone:d.phone||``,gender:d.gender||`MALE`,birthYMD:d.birthYMD||``,residence:d.residence||``,privacyAgreed:d.privacyAgreed||!1})},[d,t]),p?(0,S.jsxs)(H,{children:[(0,S.jsx)(m,{}),(0,S.jsx)(e,{}),(0,S.jsx)(U,{children:(0,S.jsx)(W,{children:`사용자 정보를 불러오는 중...`})})]}):h?(0,S.jsxs)(H,{children:[(0,S.jsx)(m,{}),(0,S.jsx)(e,{}),(0,S.jsx)(U,{children:(0,S.jsxs)(G,{children:[`사용자 정보 조회에 실패했습니다:`,` `,g?.message||`알 수 없는 오류가 발생했습니다.`]})})]}):a?(0,S.jsxs)(H,{children:[(0,S.jsx)(m,{}),(0,S.jsx)(e,{}),(0,S.jsx)(U,{children:(0,S.jsx)(F,{id:a.id,name:a.name,userId:a.userId,phone:a.phone,gender:a.gender,birthYMD:a.birthYMD,residence:a.residence,privacyAgreed:a.privacyAgreed,onSave:e=>{if(!e.name||!e.phone||!e.birthYMD||!e.residence){l.openModal({icon:(0,S.jsx)(c,{size:48,color:`#D88282`}),title:`입력 확인`,subtitle:`필수 입력 항목을 모두 채워주세요.`,theme:`warning`,buttons:[{label:`확인`,onClick:l.closeModal}]});return}let t={id:e.id,userId:e.userId,name:e.name,phone:e.phone,gender:e.gender,birthYMD:e.birthYMD,residence:e.residence,privacyAgreed:e.privacyAgreed};v.mutate(t,{onSuccess:async()=>{await _(),l.openModal({icon:(0,S.jsx)(o,{size:48,color:`#0F50A0`}),title:`수정 완료`,subtitle:`사용자 정보가 성공적으로 수정되었습니다.`,theme:`info`,buttons:[{label:`확인`,variant:`primary`,bgColor:`#0F50A0`,onClick:()=>{l.closeModal(),i(!1),window.location.reload()}}]})},onError:e=>{l.openModal({icon:(0,S.jsx)(c,{size:48,color:`#D88282`}),title:`수정 실패`,subtitle:e.message||`알 수 없는 오류가 발생했습니다.`,theme:`warning`,buttons:[{label:`닫기`,onClick:l.closeModal}]})}})},onEditStateChange:i})}),(0,S.jsx)(u,{isOpen:l.isOpen,config:l.config,onClose:l.closeModal})]}):(0,S.jsxs)(H,{children:[(0,S.jsx)(m,{}),(0,S.jsx)(e,{}),(0,S.jsx)(U,{children:(0,S.jsx)(W,{children:`사용자 정보를 찾을 수 없습니다.`})})]})},H=p.div`
  margin-left: 20rem;
  width: calc(100% - 20rem);
  min-height: 100vh;
  padding: 3.5rem 0;
  box-sizing: border-box;
`,U=p.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
`,W=p.p`
  text-align: center;
  margin: 3.125rem 0;
  color: #777;
  font-size: 1.1rem;
`,G=p(W)`
  color: #ff5a5a;
  font-weight: bold;
`;export{V as default};
import{t as e}from"./GlobalLayout-RZNjXhXG.js";import"./useInfiniteQuery-BVLlJtvg.js";import"./useQuery-ooN1U0-p.js";import{H as t,J as n,W as r,g as i,h as a,n as o,q as s,r as c,s as l,y as u}from"./index-DShH7kvK.js";import{n as d}from"./Logo-Crftf5tV.js";import"./useUpdateVisitList-DbefgRWi.js";import{i as f,n as p,r as m,t as h}from"./visit-BEbRtxLC.js";var g=n(s()),_=n(t()),v=({id:e,name:t,male:n,female:i,date:a,onDelete:o})=>{let s=r();return(0,_.jsxs)(y,{onClick:()=>{s(`/log/${e}`)},children:[(0,_.jsxs)(b,{children:[(0,_.jsxs)(x,{children:[`대표자: `,t]}),(0,_.jsxs)(S,{children:[(0,_.jsxs)(`span`,{children:[`남 : `,n]}),(0,_.jsx)(C,{}),(0,_.jsxs)(`span`,{children:[`여 : `,i]})]})]}),(0,_.jsx)(w,{children:(0,_.jsx)(T,{children:a})})]})},y=u.div`
  width: 100%;
  max-width: 80rem;
  min-height: 8.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  background-color: #ffffff;
  border: 1px solid #6f95c4;
  border-radius: 2.25rem;
  box-shadow: 0 0.125rem 0.375rem rgba(0, 0, 0, 0.08);
  cursor: pointer;
  box-sizing: border-box;
  margin: 0;
`,b=u.div`
  display: flex;
  align-items: center;
  gap: 3.75rem;
`,x=u.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #2e2e32;
  margin: 0;
`,S=u.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  color: #2e2e32;
`,C=u.div`
  width: 0.0625rem;
  height: 1.25rem;
  background-color: #aaa;
`,w=u.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`,T=u.span`
  font-size: 1.25rem;
  color: #969698;
`,E=()=>{let[t,n]=(0,g.useState)(!1),[r,s]=(0,g.useState)(``),u=c(),{data:y,fetchNextPage:b,hasNextPage:x,isFetchingNextPage:S,isLoading:C,error:w}=f(),{mutate:T,isLoading:E}=m(),{mutate:L,isLoading:R}=p(),z=(0,g.useMemo)(()=>y?.pages?y.pages.flatMap(e=>e?.content||[]):[],[y]),B=(0,g.useRef)(null);(0,g.useEffect)(()=>{if(C||!x||S)return;let e=new IntersectionObserver(e=>{e[0].isIntersecting&&b()},{threshold:.5}),t=B.current;return t&&e.observe(t),()=>{t&&e.unobserve(t)}},[C,x,S,b]);let V=(e,t)=>{if(E)return;let n=t||`방문자`;u.openModal({icon:(0,_.jsx)(i,{size:48,color:`#D88282`}),title:`정말 ${n}님의 기록을 삭제하시겠나요?`,subtitle:`한 번 삭제한 기록은 복구할 수 없습니다`,theme:`warning`,buttons:[{label:`아니요`,variant:`secondary`,onClick:u.closeModal},{label:`네, 삭제합니다`,variant:`primary`,bgColor:`#D88282`,onClick:()=>{T(e,{onSuccess:()=>{u.openModal({icon:(0,_.jsx)(a,{size:48,color:`#0F50A0`}),title:`삭제되었습니다`,subtitle:`목록을 갱신합니다.`,theme:`info`,buttons:[{label:`확인`,onClick:u.closeModal}]})},onError:()=>{u.closeModal(),alert(`삭제 중 오류가 발생했습니다.`)}})}}]})};return(0,_.jsxs)(D,{children:[(0,_.jsx)(d,{}),(0,_.jsx)(e,{}),(0,_.jsxs)(O,{children:[(0,_.jsxs)(k,{children:[(0,_.jsx)(l,{onClick:()=>{n(!0)},disabled:R}),R&&(0,_.jsxs)(A,{children:[`엑셀 파일을 준비 중입니다... (`,(e=>{if(!e)return`전체 기간`;let t=e.split(`-`);return t.length===2?`기간: ${t[0]}년 ${t[1]}월`:e})(r),`)`]})]}),C&&(0,_.jsx)(M,{children:(0,_.jsxs)(N,{children:[(0,_.jsx)(`p`,{children:`데이터를 불러오는 중`}),(0,_.jsx)(`p`,{children:`잠시만 기다려주세요...`})]})}),w&&(0,_.jsxs)(P,{children:[`오류 발생: `,w.message]}),!C&&!w&&z.length===0&&(0,_.jsx)(j,{children:`이용 기록이 없습니다.`}),z.map(e=>e?(0,_.jsx)(v,{id:e.id,name:e.name,male:e.maleCount,female:e.femaleCount,date:e.visitDate,onDelete:()=>V(e.id,e.name)},e.id):null),x&&(0,_.jsx)(I,{ref:B}),S&&(0,_.jsx)(F,{children:`다음 페이지를 로딩 중...`}),!x&&z.length>0&&(0,_.jsx)(F,{children:`모든 기록을 불러왔습니다.`})]}),(0,_.jsx)(h,{isVisible:t,onClose:()=>n(!1),onExport:(e,t)=>{let r=`${e}-${t}`;s(r),L({year:e,month:t},{onSettled:()=>{s(``)}}),n(!1)}}),(0,_.jsx)(o,{isOpen:u.isOpen,config:u.config,onClose:u.closeModal})]})},D=u.div`
  margin-left: 20rem;
  width: calc(100% - 20rem);
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
`,O=u.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 3.5rem 3.75rem;
  gap: 1.25rem;
  box-sizing: border-box;
`,k=u.div`
  width: 100%;
  max-width: 80rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 0.5rem;
`,A=u.p`
  margin-left: 0.625rem;
  color: #3f51b5;
  white-space: nowrap;
`,j=u.p`
  text-align: center;
  margin-top: 3.125rem;
  color: #666;
`,M=u.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`,N=u.div`
  background-color: rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 1.875rem 3.125rem;
  border-radius: 0.625rem;
  text-align: center;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(0.5rem);
`,P=u.p`
  color: red;
  text-align: center;
  margin-top: 2rem;
`,F=u.p`
  text-align: center;
  margin: 20px 0;
  color: #ffffff;
`,I=u.div`
  height: 10px;
`;export{E as default};
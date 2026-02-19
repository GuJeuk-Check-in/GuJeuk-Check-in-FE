import{t as e}from"./useInfiniteQuery-BVLlJtvg.js";import{C as t,H as n,J as r,S as i,U as a,W as o,g as s,h as c,q as l,r as u,y as d}from"./index-DShH7kvK.js";import{a as f,i as p,o as m,r as h}from"./useUpdateVisitList-DbefgRWi.js";var g=r(n());const _=({onSuccessCallback:e}={})=>{let n=t(),r=u(),a=o();return{...i({mutationFn:h,onSuccess:()=>{n.invalidateQueries({queryKey:[`visitList`]}),r.openModal({icon:(0,g.jsx)(c,{size:48,color:`#0F50A0`}),title:`이용 기록 생성 완료`,subtitle:`이용 기록이 성공적으로 생성되었습니다.`,theme:`info`,buttons:[{label:`확인`,variant:`primary`,bgColor:`#0F50A0`,onClick:()=>{r.closeModal(),e?.(),a(`/log`)}}]})},onError:e=>{console.error(`이용 기록 생성 중 오류 발생:`,e),r.openModal({icon:(0,g.jsx)(s,{size:48,color:`#D88282`}),title:`등록 실패`,subtitle:e.response?.data?.message||e.message||`알 수 없는 오류가 발생했습니다.`,theme:`warning`,buttons:[{label:`확인`,variant:`secondary`,onClick:r.closeModal}]})}}),modal:r}},v=()=>e({queryKey:[`visitList`],queryFn:({pageParam:e=0})=>m(e),staleTime:300*1e3,getNextPageParam:e=>{if(!(!e||e.last)&&e.content?.length)return e.number+1},initialPageParam:0}),y=()=>{let e=t();return i({mutationFn:e=>p(e),onSuccess:()=>e.removeQueries({queryKey:[`visitList`]}),onError:e=>alert(e.response?.data?.message||e.message||`삭제 실패`)})},b=()=>i({mutationFn:f,onSuccess:()=>{alert(`엑셀 파일 다운로드가 시작되었습니다. 파일을 확인해 주세요.`)},onError:e=>{console.error(`엑셀 내보내기 실패:`,e),alert(`엑셀 파일 내보내기에 실패했습니다: ${e.message}`)}});var x=r(l()),S=({isVisible:e,onClose:t,onExport:n})=>{if(!e)return null;let r=new Date,i=r.getFullYear(),a=r.getMonth()+1,o=[2024,2025,2026],s=Array.from({length:12},(e,t)=>t+1),c=o.includes(i)?i:o[0],[l,u]=(0,x.useState)(c),[d,f]=(0,x.useState)(a),p=(0,x.useCallback)(()=>{n(l,d)},[l,d,n]);return(0,g.jsx)(w,{onClick:t,children:(0,g.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,g.jsx)(E,{children:`추출할 기간 선택`}),(0,g.jsxs)(D,{children:[(0,g.jsx)(k,{children:(0,g.jsx)(A,{value:l,onChange:e=>{u(parseInt(e.target.value,10))},children:o.map(e=>(0,g.jsx)(`option`,{value:e,children:e},e))})}),(0,g.jsx)(O,{children:`년`}),(0,g.jsx)(k,{children:(0,g.jsx)(A,{value:d,onChange:e=>{f(parseInt(e.target.value,10))},children:s.map(e=>(0,g.jsx)(`option`,{value:e,children:e},e))})}),(0,g.jsx)(O,{children:`월`})]}),(0,g.jsx)(j,{children:(0,g.jsx)(M,{onClick:p,children:`내보내기`})})]})})},C=a`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,w=d.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,T=d.div`
  width: 28rem;
  max-width: 90%;
  background-color: #ffffff;
  padding: 2.5rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  animation: ${C} 0.3s ease-out;
`,E=d.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #333333;
  margin: 0 0 2rem 0;
  text-align: center;
  letter-spacing: -0.5px;
`,D=d.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`,O=d.span`
  margin: 0 0.5rem 0 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #555555;
`,k=d.div`
  position: relative;
  display: flex;
`,A=d.select`
  width: auto;
  min-width: 6rem;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  color: #333333;
  background-color: white;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;

  &:focus {
    outline: none;
    border-color: #0f50a0;
    box-shadow: 0 0 0 3px rgba(15, 80, 160, 0.1);
  }

  &:hover {
    border-color: #cbd5e1;
  }
`,j=d.div`
  display: flex;
  justify-content: center;
  width: 100%;
`,M=d.button`
  width: 80%;
  padding: 1rem;
  background-color: #0f50a0;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 6px rgba(15, 80, 160, 0.2);

  &:hover {
    background-color: #0a4085;
    box-shadow: 0 6px 8px rgba(15, 80, 160, 0.3);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: none;
  }
`;export{_ as a,v as i,b as n,y as r,S as t};
import{t as e}from"./GlobalLayout-RZNjXhXG.js";import{t}from"./useInfiniteQuery-BVLlJtvg.js";import{H as n,J as r,W as i,l as a,q as o,u as s,y as c}from"./index-DShH7kvK.js";import{n as l}from"./Logo-Crftf5tV.js";import{o as u,r as d}from"./md-DamMGJIS.js";import{i as f,r as p}from"./useUpdateUser-siXKOuHb.js";var m=r(o()),h=r(n()),g=({selectedLocation:e,setSelectedLocation:t})=>{let n=[`전체 지역`,`구즉동`,`관평동`,`노은1동`,`노은2동`,`노은3동`,`상대동`,`신성동`,`온천1동`,`온천2동`,`원신흥동`,`전민동`,`진잠동`,`학하동`,`기타 지역`],[r,i]=(0,m.useState)(!1),o=()=>{i(e=>!e)},c=e=>{t(e),i(!1)};return(0,h.jsx)(_,{children:(0,h.jsxs)(v,{children:[(0,h.jsxs)(y,{onClick:o,children:[e,r?(0,h.jsx)(s,{size:20}):(0,h.jsx)(a,{size:20})]}),r&&(0,h.jsx)(b,{children:n.map(t=>(0,h.jsx)(x,{onClick:()=>c(t),isSelected:t===e,children:t},t))})]})})},_=c.div`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: flex-end;
  box-sizing: border-box;
  z-index: 100;
`,v=c.div`
  position: relative;
  min-width: 12.5rem;
`,y=c.div`
  width: 70%;
  height: 3.75rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  font-size: 1.125rem;
  color: #2e2e32;
  cursor: pointer;
  background-color: #fff;
`,b=c.div`
  position: absolute;
  top: 4rem;
  width: 84%;
  max-height: 13.75rem;
  overflow-y: auto;
  background-color: #ffffff;
  border: 0.0625rem solid #404040;
  border-radius: 12px;
  box-shadow: 0 0.375rem 0.625rem rgba(0, 0, 0, 0.1);
  z-index: 1000;
`,x=c.div`
  padding: 12px 16px;
  font-size: 16px;
  color: ${({isSelected:e})=>e?`#ffffff`:`#2e2e32`};
  background-color: ${({isSelected:e})=>e?`#2e2e32`:`#ffffff`};
  cursor: pointer;

  &:hover {
    background-color: ${({isSelected:e})=>e?`#2e2e32`:`#f5f5f5`};
  }
`,S={MAN:`남성`,WOMAN:`여성`},C=({id:e,name:t,location:n,gender:r,birthday:a,phonNumber:o,count:s})=>{let c=i(),l=s??0;return(0,h.jsxs)(w,{children:[(0,h.jsxs)(T,{children:[(0,h.jsx)(E,{children:n}),(0,h.jsx)(D,{children:t})]}),(0,h.jsx)(k,{children:(0,h.jsxs)(F,{children:[(0,h.jsx)(A,{onClick:t=>{t.stopPropagation(),c(`/admin/user/${e}`)},children:`수정`}),` `,(0,h.jsxs)(I,{children:[(0,h.jsx)(j,{children:S[r]||r}),(0,h.jsx)(O,{}),(0,h.jsx)(M,{children:a}),(0,h.jsx)(O,{}),(0,h.jsx)(N,{children:o}),(0,h.jsx)(O,{}),(0,h.jsxs)(P,{title:`누적 방문 횟수`,children:[l,`회 방문`]})]})]})})]})},w=c.div`
  width: 100%;
  max-width: 80rem;
  background-color: #ffffff;
  border: 1px solid #6f95c4;
  border-radius: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  box-sizing: border-box;
  min-height: 10rem;
  margin: 0 auto;
  cursor: pointer;
  box-shadow: 0 0.125rem 0.375rem rgba(0, 0, 0, 0.08);

  &:hover {
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.12);
    transition: box-shadow 0.2s ease;
  }
`,T=c.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  margin-left: 1.25rem;
`,E=c.h2`
  font-size: 1.3rem;
  font-weight: 400;
  color: #2e2e32;
  margin: 0;
`,D=c.h2`
  font-size: 2.1rem;
  font-weight: 600;
  color: #2e2e32;
  margin: 0;
`;c.h2`
  font-size: 1.3rem;
  font-weight: 400;
  color: #2e2e32;
  margin: 0;
`;var O=c.div`
  width: 0.09375rem;
  height: 1.25rem;
  background-color: #aaa;
  padding: 0;
`,k=c.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`,A=c.button`
  font-size: 1.25rem;
  color: #828284;
  border: none;
  background: none;
  border-bottom: 1px solid #828284;
  cursor: pointer;
  padding: 0;
`,j=c.span`
  font-size: 1.25rem;
  color: #828284;
`,M=c.span`
  font-size: 1.25rem;
  color: #828284;
`,N=c.span`
  font-size: 1.25rem;
  color: #828284;
`,P=c.div`
  font-size: 1.25rem;
  color: #828284;
`,F=c.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
`,I=c.div`
  display: flex;
  gap: 0.9rem;
`;const L=({residence:e})=>t({queryKey:[`userList`,e??`all`],initialPageParam:0,queryFn:async({pageParam:t=0})=>{let n=t,r=e?await f(e,n):await p(n);return{users:r.slice?.content||[],totalCount:r.totalCount,last:r.slice?.last??!0,page:r.slice?.number??0}},getNextPageParam:e=>{if(!e.last)return e.page+1},staleTime:300*1e3}),ee=(e,t)=>{let[n,r]=(0,m.useState)(``),i=(0,m.useMemo)(()=>e.filter(e=>!(n&&!e.name.includes(n)||t.residence&&e.residence!==t.residence)),[e,t.residence,n]),a=(0,m.useCallback)(e=>{r(e)},[]),o=(0,m.useCallback)(()=>{r(``)},[]);return{searchName:n,filteredUsers:i,handleSearchChange:a,handleClearSearch:o,resultCount:i.length}},R=({value:e,onChange:t,onClear:n,placeholder:r=`회원 검색`})=>(0,h.jsxs)(z,{children:[(0,h.jsx)(B,{children:(0,h.jsx)(u,{size:24})}),(0,h.jsx)(V,{type:`text`,placeholder:r,value:e,onChange:e=>t(e.target.value)}),e&&(0,h.jsx)(H,{onClick:n,"aria-label":`검색 초기화`,children:(0,h.jsx)(d,{size:20})})]});var z=c.div`
  position: relative;
  min-width: 12.5rem;
  width: 100%;
`,B=c.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #2e2e2e;
  display: flex;
  align-items: center;
  pointer-events: none;
`,V=c.input`
  width: 100%;
  height: 3.75rem;
  padding: 0 0 0 3rem;
  border-radius: 16px;
  font-size: 1.125rem;
  color: #2e2e32;
  background-color: #fff;
  box-sizing: border-box;
  border: none;
  box-shadow: 0 6px 10px rgb(0 0 0 0 0.08);

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    border-color: #2e2e32;
    box-shadow: 0 0 0 2px rgba(46, 46, 50, 0.1);
  }
`,H=c.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #2e2e32;
  }
`;const U=({totalCountText:e=`총`})=>{let[t,n]=(0,m.useState)({residence:null}),r=(0,m.useRef)(null),{data:i,isLoading:a,isError:o,error:s,fetchNextPage:c,hasNextPage:l,isFetchingNextPage:u}=L({residence:t.residence}),d=i?.pages.flatMap(e=>e.users)??[],f=i?.pages[0]?.totalCount??0,{searchName:p,filteredUsers:_,handleSearchChange:v,handleClearSearch:y,resultCount:b}=ee(d,{residence:null,searchName:``});return(0,m.useEffect)(()=>{let e=new IntersectionObserver(e=>{e[0].isIntersecting&&l&&!u&&c()},{threshold:.5});return r.current&&e.observe(r.current),()=>e.disconnect()},[l,u,c]),a?(0,h.jsx)(X,{children:(0,h.jsxs)(Z,{children:[(0,h.jsx)(`p`,{children:`데이터를 불러오는 중`}),(0,h.jsx)(`p`,{children:`잠시만 기다려주세요...`})]})}):o?(0,h.jsxs)(Q,{children:[`회원 목록을 불러오는 데 실패했습니다:`,` `,s instanceof Error?s.message:`알 수 없는 오류`]}):(0,h.jsxs)(W,{children:[(0,h.jsxs)(K,{children:[(0,h.jsx)(q,{children:(0,h.jsxs)(Y,{children:[e,` `,f,` 명`,p&&` (검색 결과: ${b}명)`]})}),(0,h.jsxs)(J,{children:[(0,h.jsx)(R,{value:p,onChange:v,onClear:y}),(0,h.jsx)(g,{selectedLocation:t.residence??`전체 지역`,setSelectedLocation:e=>n({residence:e===`전체 지역`?null:e})})]})]}),(0,h.jsxs)(G,{children:[_.length>0?_.map(e=>(0,h.jsx)(C,{id:e.id,location:e.residence,name:e.name,gender:e.gender,birthday:e.birthYMD,phonNumber:e.phone,count:e.count},e.id)):(0,h.jsx)($,{children:p?`"${p}"에 해당하는 회원이 없습니다.`:t.residence?`${t.residence}에 등록된 회원이 없습니다.`:`등록된 회원이 없습니다.`}),(0,h.jsx)(`div`,{ref:r,style:{height:`20px`,margin:`10px 0`}}),u&&(0,h.jsx)(te,{children:`다음 페이지를 로딩 중...`})]})]})};var W=c.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  gap: 36px;
`,G=c.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`,K=c.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  width: 100%;
`,q=c.div``,J=c.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-left: auto;
`,Y=c.p`
  color: #ffffff;
  font-size: 24px;
  margin: 0;
`,X=c.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`,Z=c.div`
  background: rgba(255, 255, 255, 0.3);
  padding: 30px 50px;
  border-radius: 10px;
  color: #fff;
`,Q=c.p`
  margin-top: 20vh;
  text-align: center;
  color: red;
`,$=c.p`
  grid-column: 1 / -1;
  text-align: center;
  color: #eee;
  padding: 50px 0;
  font-size: 1.1rem;
`,te=c.p`
  grid-column: 1 / -1;
  text-align: center;
  color: #ffffff;
  padding: 20px 0;
`,ne=()=>(0,h.jsxs)(re,{children:[(0,h.jsx)(l,{}),(0,h.jsx)(e,{}),(0,h.jsx)(ie,{children:(0,h.jsx)(U,{totalCountText:`총`})})]}),re=c.div`
  margin-left: 20rem;
  width: calc(100% - 20rem);
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
`,ie=c.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 3.5rem 3.75rem;
  gap: 1.25rem;
  box-sizing: border-box;
`;export{ne as default};
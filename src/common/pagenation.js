import _ from 'lodash';
import React from 'react';
const Pagenation = (props) => {
const {TotalLength, PageSize,OnPageChange,CurrentPage} = props;
const PagesCount = Math.ceil(TotalLength / PageSize);

if(PagesCount === 1 )return null ;
const Pages = _.range(1,PagesCount +1);
return(
    <nav  aria-label="Page navigation example">
    <ul className="pagination">
{Pages.map(p=>

  <li key={p} className={p === CurrentPage ? "page-item active" :  "page-item"}><a className="page-link" onClick={()=>OnPageChange(p)} >{p}</a></li>)}</ul>
</nav>)
}
export default Pagenation;
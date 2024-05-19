import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Loading from './Loading';
import Pagenation from './common/pagenation';

function GetIssuesFromApi() { 
  const [issues, setIssues] = useState([]);
  const [issuesFromServer, setIssuesFromServer] = useState([]);
  const [userData,setUserData] = useState([null]);
  const [pageSize, setPageSize] = useState(5);
  const [currenctPage,setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const handlePageChanged= async (data)=>{
    console.log(data.selected);
    let curentpage = data.selected + 1 ;

    const issuesFromServer = await fetchIssuesFromServer(curentpage);
    setIssuesFromServer(issuesFromServer);

  }
  const fetchIssuesFromServer = async (curentpage) => {
    console.log('curentpage'+curentpage);
    try {
      const response = await fetch('https://api.github.com/repos/Airtable/airtable.js/issues?page='+curentpage+'&per_page=3'

      );    

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to fetch issues');
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const GetIssues = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/repos/Airtable/airtable.js/issues?page=1&per_page=9'
        );    
        if (response.ok) {
          const data = await response.json();
          setIssuesFromServer(data);
        } else {
          throw new Error('Failed to fetch issues');
        }
      } catch (error) {
        console.error(error);
      }
    };
    GetIssues();
  }, []);

  useEffect(() => {
    fetchIssues();
  }, []);
  useEffect(() => {
    fetchUserData();
  }, []);
  useEffect(() => {
  }, [currenctPage]);
  const fetchIssues = async () => {
    try {
      const response = await fetch(
        'https://api.github.com/repos/Airtable/airtable.js/issues'
      );    
      if (response.ok) {
        const data = await response.json();
        setIssues(data);
      } else {
        throw new Error('Failed to fetch issues');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchUserData = async () => {
    try {
      const response = await fetch('https://api.github.com/users/Airtable');
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handlePageChange =  page => {
    console.log(page);
    const NextPage = page;
    setCurrentPage(NextPage);
 };
 const paginate =  (issues,pageSize,currenctPage) => {
    const startIndex = (currenctPage-1) * pageSize;
    return _(issues).slice(startIndex).take(pageSize).value();
 };
const Paginateissues = paginate(issues,pageSize,currenctPage);
return(
    <div className='container'> 
      <div className='row m-2'> 
      <h1 style={{textAlign:'center'}}> Gethub Issues (Pagaination from Server )</h1>
{issuesFromServer.map((item) => {
  return <div className='col-sm-6 col-md-4 v my-2'>
     <div className='card shadow-sm w-100' style ={{minHeight:225}}> 
      <div className='card-body'>
        <h5 className='card-title text-center h2'>Id :{item.id}</h5>
        <h6 className='card-subtitle mb-2 test-muted text-center'>{item.number}</h6>
        <p className='card-text'>{item.title}</p>
         </div>
       </div>
     </div>
})}



      </div>
      <ReactPaginate 
       previousLabel={"Previous"}
       nextLabel={"Next"} 
       breakLabel = {"..."}
       pageCount={15}
       marginPagesDisplayed={2}
       onPageChange={handlePageChanged}
       containerClassName='pagination justify-content-center'
       pageClassName='page-item'
       pageLinkClassName='page-link'
       previousClassName='page-item'
       previousLinkClassName='page-link'
       nextClassName='page-item'
       nextLinkClassName='page-link'
       breakClassName='page-item'
       breakLinkClassName='page-link'
       activeClassName='active'
       />
      {!issues && ( 
       loading ? <Loading /> : <div>Content loaded</div> ) }
        <h1 style={{textAlign:'center'}}> Gethub Issues (front-End Pagination) </h1>
        <p  style={{textAlign:'center', color:'red'}}> Total Number of Issues is {issues.length} </p>
        {issues && (
        <div className="card-group"> 
{Paginateissues.map(issue => (
    <div key = {issue.id} className="card">
    <img  className="card-img-top" src={userData.avatar_url} alt="Card image cap"/>
    <div  className="card-body">
        <h5 className="card-title">{issue.title}</h5><p  className="card-text"><small className="text-muted">{issue.id}</small></p>
    </div></div>
) )} 
    </div> )}
    <div style={{ marginTop: '10px' }} className="container d-flex justify-content-center align-items-center vh-50 " > 
    <Pagenation  
    TotalLength ={issues.length}
    PageSize ={pageSize}
    CurrentPage = {currenctPage}
    OnPageChange = {handlePageChange}/> 
</div>
</div>
);
}
export default GetIssuesFromApi;
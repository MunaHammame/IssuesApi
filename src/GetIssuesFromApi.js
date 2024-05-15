import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import Pagenation from './common/pagenation';

function GetIssuesFromApi() { 
  const [issues, setIssues] = useState([]);
  const [userData,setUserData] = useState([null]);
  const [pageSize, setPageSize] = useState(5);
  const [currenctPage,setCurrentPage] = useState(0);

  useEffect(() => {
    fetchIssues();
  }, []);
  useEffect(() => {
    fetchUserData();
  }, []);
  useEffect(() => {
    console.log('State updated:', currenctPage);
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
    <div>
        <h1 style={{textAlign:'center'}}> Gethub Issues </h1>
        <p  style={{textAlign:'center', color:'red'}}> Total Number of Issues is {issues.length} </p>
<div className="card-group"> 
{Paginateissues.map(issue => (
    <div key = {issue.id} className="card">
    <img  className="card-img-top" src={userData.avatar_url} alt="Card image cap"/>
    <div  className="card-body">
        <h5 className="card-title">{issue.title}</h5><p  className="card-text"><small className="text-muted">{issue.id}</small></p>
    </div></div>
) )} 
    </div> 
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
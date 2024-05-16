import { Component, default as React } from 'react';
import Pagenation from './common/pagenation';
class App extends Component {
  state = { issueLength : 0 ,PageSize:5 ,CurrentPage:1 } 
  handlePageChange = page => {
    console.log(page);
   
}
  modifyParameter = (newValue) => {
    this.state.issueLength = newValue;
  }; 
  render() { 
    return (
    <div> 
     <h1>{data.length} </h1>
    <Pagenation   
    TotalLength ={this.state.issueLength}
    PageSize ={5}
    CurrentPage = {1}
    OnPageChange ={this.handlePageChange}/>
    </div>);
  }
}
export default App;
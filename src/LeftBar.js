import React/*, {useContext}*/ from 'react';
import './App.css';
//import AppContext from './context'

function LeftBar() {
  //const context = useContext(AppContext)
  
  return (
      <div>
        <h6>Tips for starting a campaign</h6>
        <ul>
        <li><a href="https://support.gofundme.com/hc/en-us/articles/203604494-6-Steps-to-a-Successful-Campaign">6 Steps to a Successful Campaign </a> </li>
        <li><a href="https://support.gofundme.com/hc/en-us/articles/115011597367-How-to-Write-a-GoFundMe-Story-in-5-Easy-Steps">Writing a GoFundMe Campaign </a> </li>
        <li><a href="https://www.gofundme.com/c/fundraising-tips/sharing">25 Fundraiser Sharing Tips to Increase Donations </a> </li>
        <li><a href="https://www.quora.com/How-can-you-run-a-massively-successful-Go-Fund-Me-page">How to run a massively successful Go Fund Me page </a> </li>
        <li><a href="https://medium.com/gofundme-stories/campaign-tips-from-7-top-gofundme-organizers-870de6682c44">Fundraising Tips From 7 Top GoFundMe Organizers </a> </li>
        <li><a href="https://www.facebook.com/notes/gofundme-fundraising/starting-a-successful-gofundme-top-fundraising-tips/10157638809223550/">Starting a Successful GoFundMe: Top Fundraising Tips </a> </li>
        <li><a href="https://support.gofundme.com/hc/en-us/articles/360001992627-Creating-a-GoFundMe-From-Start-to-Finish-">Creating a GoFundMe From Start to Finish </a> </li>
        </ul>
      </div>
  );
}

export default LeftBar;
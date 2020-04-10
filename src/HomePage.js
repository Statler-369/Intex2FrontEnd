import React, { useContext } from 'react';
import './App.css';
import AppContext from './context'
import CampaignListItem from './CampaignListItem'

function HomePage() {
  const context = useContext(AppContext)
  return (
    <div>
      <div style={{ margin: '1rem', padding: '1rem' }}>
        <h3>Overview</h3>
        <p>
          Want to know if your GoFundMe campaign will be a success? Use our GoAnalyzeMe calculator to see how successful your campaign currently is and see where it can still be improved. Click on the buttons to receive your analysis!
        </p>
      </div>
      <h4 style={{ margin: '2rem' }}>Example campaigns:</h4>
      {Object.values(context.campaigns).map(camp => {
        return <CampaignListItem campaign={camp} key={camp['campaign_id']} />
      })}
    </div>
  );
}

export default HomePage;
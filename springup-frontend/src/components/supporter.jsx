import React from 'react';
import SupporterFunds from './supporterFunds';
// import SupporterGiveaways from './supporterGiveaways';
import SupporterLevel from './supporterLevel';

function Supporter() {
  return (
    <div>
      <SupporterLevel supportLevel="1090" />
      <SupporterFunds frequency="week" amounts={[1, 5, 10]} />
      {/* <SupporterGiveaways totalRaised="752.11 DAI" numSupporters="21" /> */}

    </div>

  );
}

export default Supporter;

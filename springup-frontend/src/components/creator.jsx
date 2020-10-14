import React from 'react';
import CreatorShare from './creatorShare';
import CreatorFunds from './creatorFunds';
import CreatorGiveaways from './creatorGiveaways';

function Creator() {
  return (
    <div>
      <CreatorShare link="springup.eth/e10m2" />
      <CreatorFunds fundsRaised="752.11" numSupporters="21" />
      {/* <CreatorGiveaways totalRaised="752.11 DAI" numSupporters="21" /> */}
    </div>

  );
}

export default Creator;

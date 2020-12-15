import React from 'react';

import BudgetDetails from '../../shared/BudgetDetails/BudgetDetails';
import BudgetItemTable from '../../shared/BudgetItemTable/BudgetItemTable';
import GiftTable from '../../shared/GiftTable/GiftTable';
import './PreviousBudget.scss';

class PreviousBudget extends React.Component {
  render() {
    return (
      <div className="home">
        <BudgetDetails/>
        <BudgetItemTable/>
        <GiftTable/>
      </div>
    );
  }
}

export default PreviousBudget;

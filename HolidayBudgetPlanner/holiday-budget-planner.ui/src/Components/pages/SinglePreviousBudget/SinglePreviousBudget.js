import React from 'react';

import BudgetDetails from '../../shared/BudgetDetails/BudgetDetails';
import BudgetItemTable from '../../shared/BudgetItemTable/BudgetItemTable';
import GiftTable from '../../shared/GiftTable/GiftTable';
import './SinglePreviousBudget.scss';

class PreviousBudget extends React.Component {
  render() {
    return (
      <div className="previousBudget">
        <BudgetDetails/>
        <BudgetItemTable/>
        <GiftTable/>
      </div>
    );
  }
}

export default PreviousBudget;

import React from 'react';

class ExpandedBudget extends React.Component {
  state = {
    closeBudgetDetails: true,
  }

  render() {
    const { budgetId } = this.props;
    return (
      <div>
        <h1>{budgetId}</h1>
      </div>
    );
  }
}

export default ExpandedBudget;

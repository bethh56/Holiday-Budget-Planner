import React from 'react';

class ExpandedBudget extends React.Component {
  state = {
    closeBudgetDetails: true,
  }

  render() {
    const { closeBudgetDetails } = this.state;
    const { budgetId } = this.props;
    return (
      <div>
        { closeBudgetDetails
          ? <div>
            <h1>{budgetId}</h1>
            <button className="btn btn-primary" onClick={() => this.setState({ closeBudgetDetails: false })}><i class="fas fa-times-circle"></i> Close Details</button>
            </div>
          : <div/>
        }
      </div>
    );
  }
}

export default ExpandedBudget;

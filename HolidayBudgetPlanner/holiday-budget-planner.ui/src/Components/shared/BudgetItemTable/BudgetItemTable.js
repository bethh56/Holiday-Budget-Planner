import React from 'react';
import { Table } from 'reactstrap';
import './BudgetItemTable.scss';

class BudgetItemTable extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div className="BudgetItemTable">
         <h1>Test</h1>
        <h1>{item.categoryName}</h1>
      </div>
    );
  }
}

export default BudgetItemTable;

import React from 'react';
import { Table } from 'reactstrap';
import './BudgetItemTable.scss';

class BudgetItemTable extends React.Component {
  render() {
    const { item, line } = this.props;
    return (
      <div className="BudgetItemTable">
        <h1>{item.categoryName}</h1>
        <Table>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{line.price}</td>
          <td></td>
        </tr>
      </tbody>
      </Table>
      </div>
    );
  }
}

export default BudgetItemTable;

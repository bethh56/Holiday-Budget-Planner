import React from 'react';
import {
  Row,
  FormGroup,
  Form,
  Input,
  Label,
  Col,
} from 'reactstrap';
import PropTypes from 'prop-types';
import './GiftForm.scss';

class GiftForm extends React.Component {
  static propTypes = {
    addGiftEvent: PropTypes.func.isRequired,
  }

  state = {
    recepientOfGift: '',
    itemForGift: '',
    priceOfGift: '',
    budgetId: '',
  }

  saveGift = (e) => {
    e.preventDefault();
    const { recepientOfGift, itemForGift, priceOfGift } = this.state;
    const { addGiftEvent, budget } = this.props;

    const newGift = {
      recepient: recepientOfGift,
      item: itemForGift,
      price: parseInt(priceOfGift, NaN),
      budgetId: budget,
    };
    addGiftEvent(newGift);
  }

  recepientChange = (e) => {
    e.preventDefault();
    this.setState({ recepientOfGift: e.target.value });
  }

  itemChange = (e) => {
    e.preventDefault();
    this.setState({ itemForGift: e.target.value });
  }

  priceChange = (e) => {
    e.preventDefault();
    this.setState({ priceOfGift: e.target.value });
  }

  render() {
    const {
      recepientOfGift,
      itemForGift,
      priceOfGift,
    } = this.setState;

    const { holiday } = this.props;

    const buildGiftForm = () => (
      <div>
         <Form>
            <Col>
            <FormGroup>
              <Row>
              <Label className="formLabel" htmlFor="recipientName">Recipient Name</Label>
              </Row>
              <Row>
              <Input type="text"
              className="form-control"
              id="recipientName"
              placeholder="Enter recipient"
              value={recepientOfGift}
              onChange={this.recepientChange}
              />
              </Row>
            </FormGroup>
            </Col>
            <Col>
            <FormGroup>
              <Row>
                <Label className="formLabel" htmlFor="itemName">Item</Label>
              </Row>
              <Row>
              <Input type="text"
              className="form-control"
              id="itemName"
              placeholder="Enter item name"
              value={itemForGift}
              onChange={this.itemChange}
              />
              </Row>
            </FormGroup>
            </Col>
            <Col>
            <FormGroup>
              <Row>
              <Label className="formLabel" htmlFor="priceOfItem">Price</Label>
              </Row>
              <Row>
              <Input type="text"
              className="form-control"
              id="priceOfItem"
              placeholder="Enter Price"
              value={priceOfGift}
              onChange={this.priceChange}
              />
              </Row>
            </FormGroup>
            </Col>
            <button type="submit" className="giftFormBtn" onClick={this.saveGift}><i className="fas fa-gift"></i> Add Gift</button>
            <button className="closeGiftFormBtn" onClick={() => this.setState({ giftFormOpen: false })}><i className="fas fa-times-circle"></i> Close Form</button>
          </Form>
      </div>
    );

    if (holiday === 'Christmas' || holiday === 'Thanksgiving') {
      return (
        <div className={`giftForm${holiday}`}>
         {buildGiftForm()}
        </div>
      );
    } return (
      <div className="GiftForm">
          {buildGiftForm()}
      </div>
    );
  }
}

export default GiftForm;

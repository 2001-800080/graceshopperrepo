import React from 'react'
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row
} from 'reactstrap'

class OrderForm extends React.Component {
  render() {
    return (
      <div>
        <h1 className="order">Customer and Shipping Information</h1>
        <img
          src="https://www.theaterkantoor.nl/wp-content/uploads/bfi_thumb/Haven_Page_Divider_2-e1508268570455-ofjfwt65siidecpxugsus0564u9vam83p3gpjwfwxo.png"
          height="70px"
        />
        <center>
          <div>
            <h2>Who is receiving these beautiful arragements? </h2>
            <Container className="input">
              <Form>
                <FormGroup>
                  <Label>Name:</Label>
                  <Input type="name" name="name" placeholder="Name Here" />
                </FormGroup>

                <FormGroup>
                  <Label>Phone:</Label>
                  <Input type="phone" name="phone" placeholder="123-456-7890" />
                </FormGroup>

                <FormGroup>
                  <Label>Address:</Label>
                  <Input
                    type="address"
                    name="address"
                    placeholder="Where should we deliver this?"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Special Message:</Label>
                  <Input
                    className="message"
                    type="text"
                    name="text"
                    placeholder="Say something nice :)"
                  />
                </FormGroup>
                <br />
                <h3>Click Submit For Payment</h3>
                <Button>Submit</Button>
              </Form>
            </Container>
          </div>
        </center>
      </div>
    )
  }
}

export default OrderForm

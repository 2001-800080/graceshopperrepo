import React from 'react'
import {Button, Form, FormGroup, Label, Input, Container, Row} from 'reactstrap'
import {Link} from 'react-router-dom'

class OrderForm extends React.Component {
  render() {
    return (
      <div>
        <center>
          <h1>Shipping</h1>
          <center>
            <div>
              <Container className="input">
                <Form>
                  <FormGroup>
                    <Label>Receiver Name:</Label>
                    <Input type="name" name="name" placeholder="Name Here" />
                  </FormGroup>

                  <FormGroup>
                    <Label>Phone:</Label>
                    <Input
                      type="phone"
                      name="phone"
                      placeholder="123-456-7890"
                    />
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
                </Form>
              </Container>
            </div>
          </center>
        </center>
      </div>
    )
  }
}

export default OrderForm

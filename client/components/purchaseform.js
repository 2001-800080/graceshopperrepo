import React from 'react'
import {Button, Form, FormGroup, Label, Input, Container} from 'reactstrap'
import {Link} from 'react-router-dom'

class Payment extends React.Component {
  render() {
    return (
      <div>
        <center>
          <h1>Payment</h1>
          <center>
            <div>
              <Container className="input">
                <Form>
                  <FormGroup>
                    <Label>Name On Credit Card:</Label>
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
                    <Label>Email:</Label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="email@email.com"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Credit Card:</Label>
                    <Input type="text" name="text" placeholder="Private Info" />
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

export default Payment

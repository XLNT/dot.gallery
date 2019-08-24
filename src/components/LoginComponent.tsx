import React from "react";
import TicketButton from "./TicketButton";
import { divide } from "lodash-es";

export default class LoginComponent extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      hasTicket: false,
      step: 0,
      email: '',
    }
    this.catchInput = this.catchInput.bind(this)
    this.submitTicket = this.submitTicket.bind(this)
    this.handlePaymentMethod = this.handlePaymentMethod.bind(this)
  }
  handleLogin(e){
    console.log('got event', e)
    if (e.id === 0) {
      console.log('has ticket')
      this.setState({hasTicket: true, step: 1})
    } else if (e.id === 1) {
      console.log('wants ticket')
      this.setState({step: 1})
    }
  }
  catchInput(e) {
    this.setState({email: e.target.value})
  }
  submitTicket() {
    const email = this.state.email
    console.log(`Submitting ${email}`)
    this.setState({step: 2})
  }
  handlePaymentMethod(e) {
    console.log('paying by', e.target.value)
  }
  render() {
    let content;
    if (this.state.step === 0) {
      const ticketOptions = ['I have a ticket.', 'I want a ticket.']
      content = (
        <div>
          {
            ticketOptions.map((option, i) =>
              <TicketButton onClick={() => this.handleLogin({ id: i })} label={option} key={i}/>
            )
          }
        </div>
      )
    } else if (this.state.step === 1) {
      if (this.state.hasTicket === true) {
        content = (
          <div>
            <p><strong>I have a ticket.</strong></p>
            <p>Enter your email to receive a link with your admission ticket and enter the gallery.</p>
            <input onChange={this.catchInput}/>
            <button onClick={this.submitTicket}>=></button>
          </div>
        )
      } else {
        const styleObj = { textDecoration: 'underline' }
        const paymentOptions = ['Crypto', 'Credit Card', 'Paypal']
        content = (
          <div>
            <p><strong>I want a ticket.</strong></p>
            <p>Admission is currently <span style={styleObj}>${this.props.ticketPrice}</span> and <span style={styleObj}>{this.props.remainingTicketCount}</span> tickets remain. Each ticket is valid for all showings during this exhibit.</p>
            <div>
              {
                paymentOptions.map((option, i) =>
                  <TicketButton onClick={() => this.handlePaymentMethod(option)} label={option} key={i} />
                )
              }
            </div>
          </div>
        )
      }
    } else if (this.state.step === 2) {
      content = (
        <div>
          <p><strong>Email sent.</strong></p>
          <p>Click the link in the email to enter the gallery.</p>
        </div>
      )
    }
    return (
      <div>
        {content}
      </div>
    )
  }
}

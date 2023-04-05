import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", phone: "", comment: "" };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }
  handlePhoneChange(event) {
    this.setState({ phone: event.target.value });
  }
  handleCommentChange(event) {
    this.setState({ comment: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.submit(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <div>
            <label className="text-primary text-sm font-medium">Ваше имя</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleNameChange}
              className="w-full border border-grey p-2 mt-2 bg-slate-100 focus:bg-transparent focus:outline-none focus:ring-1 focus:ring-secondary"
            />
          </div>
          <div>
            <label className="text-primary text-sm font-medium">
              Ваш телефон
            </label>
            <input
              type="text"
              value={this.state.phone}
              onChange={this.handlePhoneChange}
              className="w-full border border-grey p-2 mt-2 bg-slate-100 focus:bg-transparent focus:outline-none focus:ring-1 focus:ring-secondary"
            />
          </div>
          <div>
            <label className="text-primary text-sm font-medium">
              Ваше комментария
            </label>
            <textarea value={this.state.comment} onChange={this.handleCommentChange} className="w-full border border-grey p-2 mt-2 bg-slate-100 focus:bg-transparent focus:outline-none focus:ring-1 focus:ring-secondary" />
          </div>
        </div>
        <button type="submit" className="btn bg-primary hover:bg-[#0d4770] text-white space-x-2 mt-4">Оформить заказ</button>
        <p className="text-xs mt-1">Наш менеджер перезвонит вам и оформит заказ за вас</p>
      </form>
    );
  }
}

export default Form;
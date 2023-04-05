import React from "react";

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: props.count, timeout: null, interval: null, min: props?.min || 0, max: props?.max || 15 };
  }



  increment = () => {
    if (this.state.count < this.state.max) {
      this.setState((state) => ({ count: state.count + 1 }));
      this.changeParentCount(this.state.count + 1);
    }
  };

  decrement = () => {
    if (this.state.count > this.state.min) {
      this.setState((state) => ({ count: state.count - 1 }));
      this.changeParentCount(this.state.count - 1);
    }
  };

  mouseDownIncrement = () => {
    this.increment();
    let that = this;
    this.state.timeout = setTimeout(function () {
      that.state.interval = setInterval(function () {
        that.increment();
      }, 50);
    }, 300);
  };
  mouseDownDecrement = () => {
    this.decrement();
    let that = this;
    this.state.timeout = setTimeout(function () {
      that.state.interval = setInterval(function () {
        that.decrement();
      }, 50);
    }, 300);
  };
  clearTimers = () => {
    clearTimeout(this.state.timeout);
    clearInterval(this.state.interval);
  };

  changeParentCount = (count) => {
    this.props.changeCount(count);
  };


  render() {
    return (
      <div className="lg:h-[45px] h-[30px] flex items-center">
        <button
          onMouseDown={this.mouseDownDecrement}
          onMouseUp={this.clearTimers}
          onMouseLeave={this.clearTimers}
          className="rounded-l-full border-l border-y border-grey text-4xl flex items-center justify-center text-bold text-secondary lg:w-[50px] w-[30px] h-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            className="lg:w-6 w-4 aspect-square stroke-secondary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15"
            />
          </svg>
        </button>
        <input
          value={this.state.count}
          onChange={(e) => {
            if (e.target.value > this.state.max) {
              this.setState({ count: this.state.max });
              this.changeParentCount();
            } else if (e.target.value < this.state.min) {
              this.setState({ count: this.state.min });
              this.changeParentCount();
            } else {
              this.setState({ count: e.target.value });
              this.changeParentCount();
            }
          }}
          className="bg-transparent lg:w-[50px] w-[30px] text-center focus:outline-none border border-grey h-full text-primary text-lg lg:text-2xl"
        />
        <button
          onMouseDown={this.mouseDownIncrement}
          onMouseUp={this.clearTimers}
          onMouseLeave={this.clearTimers}
          className="rounded-r-full border-r border-y border-grey text-4xl flex items-center justify-center text-bold text-secondary lg:w-[50px] w-[30px] h-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            className="lg:w-6 w-4 aspect-square stroke-secondary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
    );
  }
}

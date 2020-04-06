import React, { Component } from 'react';

class Premium extends Component {
  constructor(props) {
	super(props);
	this.state = {
	  isChecked: props.selected,
	  numberOfAd: 1,
	  amountPerAdd: 394.99,
	  total: 0
	};
	this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
	this.handleAdChange = this.handleAdChange.bind(this);
  }

  componentDidMount(){
  	var total = 0.0;
  	if(this.state.isChecked){
  		total = this.state.numberOfAd * this.state.amountPerAdd;
  		this.setState({total: total}, this.handleState(total, this.state.numberOfAd));
  	}
  }

  handleState(total, adCount){
  	this.props.onPremium(total, adCount);
  }

  handleCheckboxChange(event) {
	const target = event.target;
	const value = target.checked;
	const name = target.name;
	this.setState({
		[name]: value
	});
	if(value){
		var total = 0.0;
  		total = this.state.numberOfAd * this.state.amountPerAdd;
  		this.setState({total: total}, this.handleState(total, this.state.numberOfAd));
  	}else{
  		this.setState({total: 0}, this.handleState(0, this.state.numberOfAd));
  	}
  }

  handleAdChange( event ){
  	const target = event.target;
  	const name = target.name;
  	if( target.value < 0){
  		return
  	}
  	this.setState({
		[name]: target.value
	});
	if(this.state.isChecked){
  		var total = 0.0;
  		var pt = parseInt(target.value, 10);
  		total = pt * this.state.amountPerAdd;
  		this.setState({total: total}, this.handleState(total, pt));
  	}
  }

  render() {
	return (<div className="form-group">
		<div className="align-left">
			<div className="checkbox">
				<label>
					<input 
						name="isChecked"
						checked={this.state.isChecked}
						onChange={this.handleCheckboxChange}
						type="checkbox" />Premium Ads per price $394.99 X &nbsp;
					<input
						name="numberOfAd"
						type="number"
						value={this.state.numberOfAd}
						onChange={this.handleAdChange} /> = 
					<span id="total">${this.state.total}</span>
				</label>
			</div>
		</div>
	</div>
	);
  }
}
export default Premium;
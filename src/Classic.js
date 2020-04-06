import React, { Component } from 'react';

class Classic extends Component {
  constructor(props) {
	super(props);
	this.state = {
	  isClassicChecked: props.classicSelected,
	  numberOfAd: 1,
	  amountPerAdd: 269.99,
	  classicTotal: 0
	};
	this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
	this.handleAdChange = this.handleAdChange.bind(this);
  }

  componentDidMount(){
  	var total = 0.00;
  	if(this.state.isClassicChecked){
  		total = this.state.numberOfAd * this.state.amountPerAdd;
  		this.setState({classicTotal: total}, this.handleState(total, this.state.numberOfAd));
  	}  	
  }

  handleState(total, adCount){
  	this.props.onClassic(total, adCount);
  }

  handleCheckboxChange(event) {
	const target = event.target;
	const value = target.checked;
	const name = target.name;
	this.setState({
		[name]: value
	});
	if(value){
		var total = 0.00;
  		total = this.state.numberOfAd * this.state.amountPerAdd;
  		this.setState({classicTotal: total}, this.handleState(total, this.state.numberOfAd));
  	}else{
  		this.props.onClassic(0);
  		this.setState({classicTotal: 0}, this.handleState(0, this.state.numberOfAd));
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
	if(this.state.isClassicChecked){
  		var total = 0.00;
  		var ct = parseInt(target.value, 10);
  		total = ct * this.state.amountPerAdd;
  		this.setState({classicTotal: total}, this.handleState(total, ct));
  	}
  }

  render() {
	return (<div className="form-group">
		<div className="align-left">
			<div className="checkbox">
				<label>
					<input 
						name="isClassicChecked"
						checked={this.state.isClassicChecked}
						onChange={this.handleCheckboxChange}
						type="checkbox" />Classic Ads per price $269.99 X &nbsp;&nbsp;&nbsp;&nbsp;
					<input
						name="numberOfAd"
						type="number"
						value={this.state.numberOfAd}
						onChange={this.handleAdChange} /> = 
					<span id="total">${this.state.classicTotal}</span>
				</label>
			</div>
		</div>
	</div>
	);
  }
}
export default Classic;
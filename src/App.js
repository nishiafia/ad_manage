import React, { Component } from 'react';
import Classic from './Classic';
import Standout from './Standout';
import Premium from './Premium';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			totalClassic: 0,
			totalStdout: 0,
			totalPremium: 0,
			subTotal: 0,
			value: '',
			readyToCheckout: false,
			payableAmount: 0
		};
		this.numberOfClassicAd 	= 0;
		this.numberOfStdoutAd 	= 0;
		this.numberOfPremiumAd 	= 0;

		this.totalClassic 	= 0;
		this.totalStdout 		= 0;
		this.totalPremium 	= 0;

		this.classicDeals 	= [{name: "unilever", deduct:1, priceDrop:0, itemMore: 2}, {name: "ford", deduct:1, priceDrop:0, itemMore: 4}];
		this.StdoutDeals 	= [{name: "apple", deduct:0, priceDrop:299.99, itemMore: 0}, {name: "ford", deduct:0, priceDrop:309.99, itemMore: 0}];
		this.premiumDeals 	= [{name: "nike", deduct:0, priceDrop:379.99, itemMore: 3}, {name: "ford", deduct:0, priceDrop:389.99, itemMore: 3}];

		this.handleClassic 	= this.handleClassic.bind(this);
		this.handleStdout 	= this.handleStdout.bind(this);
		this.handlePremium 	= this.handlePremium.bind(this);
		this.handleChange 	= this.handleChange.bind(this);
		//this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	componentDidMount(){}

	handleClassic(ct, clsAdCount){		
		var total = 0.00;
		total = parseFloat(ct) + this.totalStdout + this.totalPremium;
		this.numberOfClassicAd = clsAdCount;
		this.setState({subTotal: total, totalClassic: ct});
		this.totalClassic = ct;
	}

	handleStdout(st, stdAdCount){
		var total = 0.00;
		total = parseFloat(st) + this.totalClassic + this.totalPremium;
		this.numberOfStdoutAd = stdAdCount;
		this.totalStdout = st;
		this.setState({subTotal: total, totalStdout: st});
	}

	handlePremium(pt, pAdCount){
		var total = 0.00;
		total = parseFloat(pt) + this.totalClassic + this.totalStdout;
		this.numberOfPremiumAd 	= pAdCount;
		this.totalPremium = pt;
		this.setState({subTotal: total, totalStdout: pt});
	}

	handleChange(event) {
		this.setState({value: event.target.value}, this.proceedCheckout(event.target.value));
	}

	proceedCheckout( cn ){
		var classicDeal = this.classicDealCalc( cn );
		var stdoutDeal = this.stdoutDealCalc( cn );
		var premiumDeal = this.premiumDealCalc( cn );
		var totalCalc = parseFloat(classicDeal) + parseFloat(stdoutDeal) + parseFloat(premiumDeal)
		this.setState({payableAmount: totalCalc.toFixed(2), readyToCheckout: true})
	}

	classicDealCalc(cname){
		var totalDealPrice = this.totalClassic;
		this.classicDeals.forEach(function( company ){
			if(company !== null && company.name === cname){
					if( this.numberOfClassicAd > parseInt(company.itemMore,10)){
						var perClassic = 0.00;
						if( company.deduct > 0){
							var numAds = parseInt(this.numberOfClassicAd,10) - parseInt(company.deduct,10);
							perClassic = this.totalClassic/this.numberOfClassicAd;
							totalDealPrice = parseInt(numAds,10) * parseFloat(perClassic);
						}else if(company.priceDrop > 0){
							perClassic = company.priceDrop;;
							totalDealPrice = parseInt(this.numberOfClassicAd,10) * parseFloat(perClassic);
						}
					}
			}
		}.bind(this));
		return totalDealPrice;
	}

	stdoutDealCalc( cname ){
		var totalDealPrice = this.totalStdout;
		this.StdoutDeals.forEach(function( company ){
			if(company !== null && company.name === cname){
					if( this.numberOfStdoutAd > parseInt(company.itemMore,10)){
						var perStd = 0.00;
						if( company.deduct > 0){
							var numAds = parseInt(this.numberOfStdoutAd,10) - parseInt(company.deduct,10);
							perStd = this.totalStdout/this.numberOfStdoutAd;
							totalDealPrice = parseInt(numAds,10) * parseFloat(perStd);
						}else if( company.priceDrop > 0){
							perStd = company.priceDrop;
							totalDealPrice = parseInt(this.numberOfStdoutAd,10) * parseFloat(perStd);
						}else{
							//Nothig to do
						}
					}
			}
		}.bind(this));
		return totalDealPrice;
	}

	premiumDealCalc( cname ){
		var totalDealPrice = this.totalPremium ;
		this.premiumDeals.forEach(function( company ){
			if(company !== null && company.name === cname){
					if( this.numberOfPremiumAd > parseInt(company.itemMore,10)){
						var perStd = 0.00;
						if( company.deduct > 0){
							var numAds = parseInt(this.numberOfPremiumAd,10) - parseInt(company.deduct,10);
							perStd = this.totalPremium/this.numberOfPremiumAd;
							totalDealPrice = parseInt(numAds,10) * parseFloat(perStd);
						}else if( company.priceDrop > 0){
							perStd = company.priceDrop;
							totalDealPrice = parseInt(this.numberOfPremiumAd,10) * parseFloat(perStd);
						}else{
							//Nothig to do
						}
					}
			}
		}.bind(this));
		return totalDealPrice;
	}

	render() {
		var discountPrice = "";
		if( this.state.readyToCheckout ){
			discountPrice = <span>
							<label>------------------</label>
							<label>Payable: ${this.state.payableAmount}</label>
					</span>;
		}
		return (
			<div className="container">
			<div className="row">
				<div className="col-md-8 form-container">
					<div className="login-panel panel panel-default">
						<div className="panel-heading">
							<h3 className="panel-title">
								<p className="title">Checkout process</p>
							</h3>
						</div>
						<div className="panel-body">
							<fieldset>
								<Classic
									onClassic={this.handleClassic}
									classicSelected={false}
								/>
								<Standout
									onStandout={this.handleStdout}
									selected={false}
								/>
								<Premium
									onPremium={this.handlePremium}
									selected={false}
								/>
								<div className="form-group col-lg-4" style={{float: 'right'}}>
									<label>Total: ${this.state.subTotal.toFixed(2)}</label>
									{discountPrice}
								</div>
								<div className="form-group">
									<label>Company: </label>
									<select value={this.state.value} onChange={this.handleChange}>
										<option value="">Choose</option>
										<option value="default">Default</option>
										<option value="unilever">Unilever</option>
										<option value="apple">Apple</option>
										<option value="nike">Nike</option>
										<option value="ford">Ford</option>
									</select>
								</div> 
								<div className="form-group">
									<div className="align-left">
										<div className="checkbox">
											<button
												type="button"
												className="btn btn-primary">
												Checkout
											</button>
										</div>
									</div>
								</div>
							</fieldset>
						</div>
					</div>
					<div className="clear"></div>
				</div>
			</div>
		</div>
		);
	}
}

export default App;

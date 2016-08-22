import React from 'react';
import { render } from 'react-dom'
import ReactStars from 'react-stars';
import Truncate from 'react-truncate';

import ReviewAction from '../actions/ReviewAction';
import ReviewStore from '../stores/ReviewStore';

var reviewData=[];
var Home = React.createClass({
    getInitialState: function () {
        return ({
            review:{},
            reviewData: [],
            heading:[],
            avg:[],
            avgRating:"",
            price:0,
            value:0,
            quality:0
        });
    },

    componentWillMount: function() {
        ReviewStore.addChangeListener(this._onChange);
        ReviewAction.getRatings();
    },

    componentDidMount: function(){
        var modal = document.getElementById('myModal');
        var btn = document.getElementById("writeReviewBtn");
        var span = document.getElementsByClassName("close")[0];
        btn.onclick = function() {
            modal.style.display = "block";
        };
        span.onclick = function() {
            modal.style.display = "none";
        };
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    },

    _onChange: function() {
        var temp = 0;
        reviewData = ReviewStore.getRating();
        console.log(this.state.reviewData);
        var that = this;
        reviewData.forEach(function(obj){
            that.state.heading.push(
                <div>
                    <h5>{obj.heading}</h5>
                    <span style={{fontWeight: 'normal'}}>{obj.name}</span> <span className="reviewDate">(Reviewed on {obj.created_on})</span>
                    <br/>
                    <div className="lableStarInline"><label className="reviewDate">Price</label> <span className="starInline"><ReactStars half={false} edit={false} value={obj.price}/></span></div>
                    <div className="lableStarInline"><label className="reviewDate">Value</label> <span className="starInline"><ReactStars half={false} edit={false} value={obj.value}/></span></div>
                    <div className="lableStarInline"><label className="reviewDate">Quality</label> <span className="starInline"><ReactStars half={false} edit={false} value={obj.quality}/></span></div>
                    <p className="reviewDate" style={{textAlign: 'justify'}}>{obj.desc}</p>
                </div>
            );
            that.state.avg.push(obj.avg);
        });
        for(var i=0;i<(that.state.avg).length;i++){
            temp += (that.state.avg)[i];
        }
        this.state.avgRating = (temp/(this.state.avg).length);
    },

    componentWillUnmount: function () {
        ReviewStore.removeChangeListener(this._onChange);
    },

    priceChanged : function(newRating) {
        this.setState({price: newRating});
        console.log(this.state.price)
    },
    valueChanged : function(newRating){
        this.setState({value: newRating});
        console.log(this.state.value)
    },
    qualityChanged : function(newRating){
        this.setState({quality: newRating});
        console.log(this.state.quality)
    },

    formSubmit: function(){
        event.preventDefault();
        var form = document.getElementById("modalForm");
        var reviewObj = {
            price: this.state.price,
            value: this.state.value,
            quality:this.state.quality,
            avg:((this.state.price)+(this.state.value)+(this.state.quality))/3,
            name: (form.name.value),
            heading: (form.sub.value),
            desc: (form.desc.value)
        };

        this.setState({review : reviewObj},function(){
            reviewData.push(this.state.review);
            alert(JSON.stringify(this.state.review));
        });
    },

    render: function() {
        return(
            <div>
                <div className="contentDiv">
                    <h2 style={{color:'skyblue'}}>Rating of Arlo Smart Home 1 HD Camera</h2>
                    <hr/>
                    <div>
                        <h4 style={{display:'inline-block'}}>Average Rating: </h4>
                        <span className="avgRateStars"><ReactStars half={false} value={Math.ceil(this.state.avgRating)} edit={false} size={24}/></span>
                        <span>({Math.ceil(this.state.avgRating)} out of {(this.state.avg).length} Ratings)</span>
                    </div>
                    <h4 className="reviewHeading">Have you used this Product? Rate it Now.</h4>
                    <div className="ratingTable"><table style={{width:'100%'}}>
                        <tbody>
                        <tr>
                            <td>Price</td>
                            <td><ReactStars half={false} onChange={this.priceChanged} size={20} value={this.state.price}/></td>
                        </tr>
                        <tr>
                            <td>Value</td>
                            <td><ReactStars half={false} onChange={this.valueChanged} size={20} value={this.state.value}/></td>
                        </tr>
                        <tr>
                            <td>Quality</td>
                            <td><ReactStars half={false} onChange={this.qualityChanged} size={20} value={this.state.quality}/></td>
                        </tr>
                        <tr>
                            <td colSpan={2}><button id="writeReviewBtn" type="button" value="Write your Review">Write Your Review</button></td>
                        </tr>
                        </tbody>
                    </table></div>

                    <div id="myModal" className="modal">
                        <div className="modal-content">
                            <span className="close">x</span>
                            <p className="modalHeading">Write your Review:</p>
                            <form id="modalForm" className="modalForm" method="get">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><label>Name:</label></td><td><input name="name" type="text"/></td>
                                        </tr>
                                        <tr>
                                            <td><label>Subject:</label></td><td><input name="sub" type="text"/></td>
                                        </tr>
                                        <tr>
                                            <td><label>Description:</label></td><td><textarea name="desc" rows="4" cols="30"/></td>
                                        </tr>
                                        <tr>
                                            <td></td><td><input type="button" className="modalSubmit" onClick={this.formSubmit} value="Submit"/></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>

                    </div>

                    <div className="recoDiv">
                        <h4>I recommend this product Helpful?</h4>
                        <form action="">
                            <input type="radio" value="Yes"/> Yes<br/>
                            <input type="radio" value="no"/> No<br/>
                        </form>
                    </div>
                </div><br/>
                <div className="contentDiv">
                    <h3 style={{color:'skyblue'}}>Most Accepted Reviews:</h3>
                    <hr/>
                    {this.state.heading}
                </div>
            </div>
        )
    }
});

module.exports = Home;
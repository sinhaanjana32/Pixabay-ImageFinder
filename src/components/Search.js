
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ImageResults from './ImageResult';


class Search extends Component {
state = {
  searchText: '',
  amount:15,
  apiKey:'11354825-8ab69c9fa10b3e59d13693e66',
  images:[],
};

onAmountChange = (e, index, value) => this.setState({amount:value});

onTextChange = (e) => {
const val = e.target.value;

this.setState({searchText:val}, ()=>{

  if (val ===''){

    this.setState({images:[]})
  } else {
    axios.get(
                `https://pixabay.com/api/?key=${this.state.apiKey}&q=${
                  this.state.searchText
                }&per_page=${this.state.amount}&safesearch=true`
              )
    .then((res) => {this.setState({images: res.data.hits})})
    .catch(err => console.log(err));

  }
});

}





render() {
  console.log(this.state.images);
return (
<div>
<TextField
      name= "searchText"
      value={this.state.searchText}
      onChange={this.onTextChange}
      floatingLabelText ="Enter Your Search.."
      fullWidth={true}
/>

<br/>

<SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={20} primaryText="30" />
          <MenuItem value={30} primaryText="50" />
        </SelectField>
        <br/>
        {this.state.images.length > 0 ? (<ImageResults images={this.state.images} />):null }


</div>

)
}
}
export default Search;

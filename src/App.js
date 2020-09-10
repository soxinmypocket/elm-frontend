import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header'
import MainContainer from './components/MainContainer'


class App extends React.Component {
  state = {
    items: [],
    orders: [],
    cart: [],
    header: "items",
    selectedCategory: "all",
    searchFilter: "",
    categories: [],
    categories: []
   }

//Adds items from cat to order
   placeOrder = (items) => {
    this.setState({
      orders: [...this.state.orders, items],
      cart: []
    })
  }

//Categories
handleSelectedCategory = (selectedCategory) => {
  this.setState({
    selectedCategory
  })
}

handleSearchFilter = (searchFilter) => {
  this.setState({
    searchFilter
  })
}


//---------------CLICK ON BUTTONS ON HEADER-----------------------
  clickHeader = (button) => {
    this.setState({
      header: button
    })
  }
//-----------------------------------------------------------
  handleAddToCart = (item) => {
    this.setState({
      cart: [...this.state.cart, item]
    })
  }
  handleRemoveFromCart = (item) => {
    const removedCart = this.state.cart.filter(cartItem => cartItem.id !== item.id)
    this.setState({
      cart: removedCart
    })
  }
  //_________________________________________________

  //Fetch Items
  componentDidMount(){
    fetch(`http://localhost:3000/items`)
    .then(res => res.json())
    .then(items => 
      //console.log(items),
       this.setState({
       items
      },
      () => this.handleCategories())
   )}

   handleCategories = () => {
    const categories = []
    this.state.items.forEach(item => {
      if(!categories.includes(item.category)){
        categories.push(item.category)
      }
    })

    this.setState({
      categories
    })
  }

  handleSort = (items) => {
    if(this.state.selectedCategory === "all"){
      return items
    }
    else{
      return items.filter(item => item.category === this.state.selectedCategory)
    }
  }

  handleSearch = (items) => {
    return items.filter(item => item.name.toLowerCase().includes(this.state.searchFilter.toLowerCase()))
  }


  render(){
    return (
      <div className="App">
          
          <Header 
          header={this.state.header} 
          clickHeader={this.clickHeader}
          handleSearchFilter={this.handleSearchFilter}
          handleSelectedCategory={this.handleSelectedCategory}
          categories={this.state.categories}
          />
        {/* <Switch> 
          <Route path="cart" exact>
            
          </Route>
        </Switch> */}

        <Switch> 
          <MainContainer 
            items={this.handleSearch(this.handleSort(this.state.items))}
            orders={this.state.orders} 
            placeOrder={this.placeOrder} 
            cart={this.state.cart} 
            header={this.state.header} 
            handleAddToCart={this.handleAddToCart}
            handleRemoveFromCart={this.handleRemoveFromCart}
          />
        </Switch>
        
      </div>
    );
  }
}

export default App;
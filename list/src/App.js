import React,{useEffect, useState} from 'react';
import Item from './Item';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';

const App = () => {

const request = `https://api.jsonbin.io/b/5fd1a69e81ec296ae71c07d7`;

const[items, setItems] = useState([]);
const[search, setSearch] = useState("");
const[colour, setColour] = useState("");
const[gender, setGender] = useState("");
const[category, setCategory] = useState("");
const[price, setPrice] = useState(0);
const colours = ['blue','red','yellow','black','white','green','brown'];
const genders = ['male','female','n/a'];
const categories = ['clothing','food','toy','plant','stationery','mobile'];
const prices = [250,150,100,500,1000,300,800,9999];

useEffect(()=>{
  getData();
},[search]);

const getData = async () =>{
  const response = await fetch(request);
  const data = await response.json();
  setItems(data);
}

const updateSearch = event =>{
  setSearch(event.target.value);
}

const searchItem = event => {
  event.preventDefault();
  const arrayList = [];
    items.filter((data)=>{
      if(search != null){
       if(data.name && data.name.toLowerCase().includes(search.toLowerCase()) ||
          data.gender && data.gender.toLowerCase().includes(search.toLowerCase()) ||
          data.colour && data.colour.toLowerCase().includes(search.toLowerCase()) ||
          data.category && data.category.toLowerCase().includes(search.toLowerCase()) ||
          data.price == search){
          arrayList.push(data);
       }
     }
   });
  setItems(arrayList);
}

const handleChange = event => {
  if(colours.indexOf(event.target.value) > -1){
    setColour(event.target.value);
  }else if(categories.indexOf(event.target.value) > -1){
    setCategory(event.target.value);
  }else if(genders.indexOf(event.target.value) > -1){
    setGender(event.target.value);
  }else if(prices.indexOf(parseInt(event.target.value)) > -1){
    setPrice(event.target.value);
  }
}

const clearFilter = () =>{
  setColour('');
  setGender('');
  setPrice('');
  setCategory('');
}

  return (
    <div className="App">
      <form onSubmit={searchItem}>
      <div className="my-3 d-flex align-items-center">
        <input className="mx-3" type ="text" value={search} onChange={updateSearch}/>
        <button type ="submit" >Search</button>
      </div>
      <Row className="my-3">
        <Col sm={3}>
          <label className="mx-2"><b>Filter By Colour</b></label>
          <select onChange={handleChange}>
           {colours.map(color => {
             return (
               <option value={color}> {color} </option>
             )
           })}
           </select>
         </Col>
         <Col sm={3}>
           <label className="mx-2"><b>Filter By Gender</b></label>
           <select onChange={handleChange}>
            {genders.map(gender => {
              return (
                <option value={gender}> {gender} </option>
              )
            })}
            </select>
          </Col>
          <Col sm={3}>
            <label className="mx-2"><b>Filter By Category</b></label>
            <select onChange={handleChange}>
             {categories.map(category => {
               return (
                 <option value={category}> {category} </option>
               )
             })}
             </select>
           </Col>
           <Col sm={3}>
             <label className="mx-2"><b>Filter By Price</b></label>
             <select onChange={handleChange}>
              {prices.map(price => {
                return (
                  <option value={price}> {price} </option>
                )
              })}
              </select>
            </Col>
          </Row>
         <button onClick={clearFilter}>Clear Filter</button>
      </form>
      <Item
      data={items}
      filterByColour={colour}
      filterByGender={gender}
      filterByCategory={category}
      filterByPrice={price}/>
    </div>
  )
}

export default App;

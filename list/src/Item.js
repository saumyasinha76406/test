import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Item.css';

const Item = ({data, filterByColour, filterByGender, filterByCategory, filterByPrice}) => {
  let list = data;
  if(filterByColour && (filterByColour != null || filterByColour != '') ||
     filterByGender && (filterByGender != null || filterByGender != '') ||
     filterByCategory && (filterByCategory != null || filterByCategory != '') ||
     filterByPrice != 0){
    list = data.filter((item) =>{
      if(item.colour == filterByColour ||
        item.gender == filterByGender ||
        item.category == filterByCategory ||
        item.price == filterByPrice){
        return data;
      }
    })
  }
  return (
    <Container>
    <Row>
    {list.map(item => (
        <Col sm={4}>
          <div className="box">
            <div><b>Name : </b>{item.name}</div>
            <div><b>Category : </b>{item.category}</div>
            <div><b>Price : </b>{item.price}</div>
            <div><b>Colour : </b>{item.colour}</div>
            <div><b>Gender : </b>{item.gender}</div>
          </div>
        </Col>
    ))}

    </Row>
    </Container>

  )
}

export default Item;

import {Col, Dropdown, Row} from "react-bootstrap";
import "../../../style/DropDownStyles.css"
import Form from 'react-bootstrap/Form';
import {updateFilters} from "../../../components/movie-list/MovieListSlice";
import {useDispatch} from "react-redux";


export const CustomDropDown = ({label, filterName, dropDownKeyValues,searchFilter}) => {
  let selectedValueUI=<option key={searchFilter[filterName]}>{searchFilter[filterName]}</option>
  const dropDownListUI = dropDownKeyValues.map(dropDownKeyValue => {
    if (dropDownKeyValue.id !== searchFilter[filterName]) {

      return <option id={dropDownKeyValue.id}
                     value={dropDownKeyValue.id}>{dropDownKeyValue.name}</option>
    }
    }
  )
  return (
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="4">
          {label}
        </Form.Label>
        <Col sm="8">
      <Form.Select aria-label="Default select example" onChange={e=>{
        searchFilter[filterName]=e.target.value;
       // dispatch(updateFilters(filter));
      }}>
          {selectedValueUI}
        {dropDownListUI}
      </Form.Select>
        </Col>
      </Form.Group>
  );
}
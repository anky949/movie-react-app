import Form from "react-bootstrap/Form";
import "../../style/CheckBoxStyle.css"
import {useState} from "react";

export const CustomMultiCheckBox = ({
  label,
  checkboxKeyValues,
  filterName,
  searchFilter
}) => {
  //reason for using state here -:
  //without state,when we passed checked flag value using given filter then we were not able to change the state
  //it means checkbox doesn't get uncheck after checked or vise versa.
  //So we created state to maintain checkBox state.
  //so if we check or uncheck ,we update the checkBoxState array and this component get refreshed and we set the checked value if it contains the id of checkbox
  const [checkBoxState, setCheckBoxState] = useState(searchFilter[filterName]);
  const checkBoxesUI = checkboxKeyValues.map(checkboxKeyValue => {
    return (<li key={checkboxKeyValue.id}>
      <Form.Check
          checked={checkBoxState.includes(checkboxKeyValue.id)}
          type={"checkbox"}
          id={checkboxKeyValue.id}
          key={checkboxKeyValue.id}
          label={checkboxKeyValue.name}
          onChange={(e) => {

            if (e.target.checked) {
              searchFilter[filterName] = [...searchFilter[filterName],
                checkboxKeyValue.id];

              setCheckBoxState(searchFilter[filterName]);
            } else {
              searchFilter[filterName] = searchFilter[filterName].filter(
                  function (item) {
                    return item !== checkboxKeyValue.id
                  });
              setCheckBoxState(searchFilter[filterName]);
            }
            console.log("checkboxState ========>" + checkBoxState);
            console.log("searchFilter[filterName] ========>"
                + searchFilter[filterName]);
            console.log(searchFilter[filterName])

          }
          }
      />
    </li>)
  })

  return (
      <div className="form-border"><span><b>{label}</b></span> :
        <ul>
          {checkBoxesUI}
        </ul>
      </div>

  );

}
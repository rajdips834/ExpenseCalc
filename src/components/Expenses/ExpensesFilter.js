import React from "react";

import "./ExpensesFilter.css";

const ExpensesFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };
  const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  var yearList = [];
  props.yearList.map((expense) => {
    yearList.push(expense.date.getFullYear().toString());
    yearList = yearList.filter(distinct);
  });
  console.log(yearList);
  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter by year</label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
          {yearList.sort().map((year) => (
            <option value={year}>{year}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;

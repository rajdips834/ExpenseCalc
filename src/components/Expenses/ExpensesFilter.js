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
  props.yearList?.map((expense) => {
    yearList.push(expense.date.toString().slice(0, 4));
    yearList = yearList?.filter(distinct);
  });

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter by year</label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
          {yearList?.sort().map((year, item) => (
            <option key={item} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;

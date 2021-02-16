import React from 'react';
import { Select } from 'antd';

import './styles.scss';

const SearchSelectBox = ({ data, defaultValue }) => {
  const { Option } = Select;

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log('blur');
  }

  function onFocus() {
    console.log('focus');
  }

  function onSearch(val) {
    console.log('search:', val);
  }

  return (
    <Select
      bordered={false}
      showSearch
      style={{ width: 200 }}
      placeholder={defaultValue}
      optionFilterProp='children'
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
      defaultValue={defaultValue}
    >
      {data &&
        data.map((option, index) => (
          <Option value={option.value}>{option.name}</Option>
        ))}
    </Select>
  );
};

export default SearchSelectBox;

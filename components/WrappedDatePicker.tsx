import React from 'react';
import DatePicker from 'react-datepicker';

const WrappedDatePicker: React.FC<any> = (props) => {
  return <DatePicker {...props} />;
};

export default WrappedDatePicker;
import { useState } from 'react';
import Cls from 'classnames';
import './index.css';

export default function SwitchTab(props) {
  const { dataOptions, defaultVal } = props;
  const [currentData, setCurrentData] = useState(defaultVal);

  const handleChange = (label) => {
    setCurrentData(label);
  };

  return (
    <div className="switch-data">
      {(dataOptions || []).map((item) => (
        <div
          className={Cls('item-date', {
            'only-one': dataOptions.length === 1,
            'is-active': currentData === item.label,
          })}
          onClick={() => handleChange(item.label)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}

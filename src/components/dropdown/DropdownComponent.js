import React, { useState } from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-paper-dropdown';

export const DropdownComponent = ({ label, option = [], selectedValue, onValueChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
      <Dropdown
        label="Gender"
        placeholder="Select Gender"
        options={option}
        value={selectedValue}
        onSelect={onValueChange}
      />
  );
};


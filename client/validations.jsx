import React from 'react';

export const SheetItemValidation = function() {
  return new React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    description: React.PropTypes.string.isRequired,
    amount: React.PropTypes.number.isRequired
  })
}
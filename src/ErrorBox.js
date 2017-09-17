import React from 'react';

export default function ErrorBox (props) {
  //grab error
  let errorMessage = props.error
  // Make negative price error more user friendly
  if (errorMessage === 'Validation min on price failed'){
    errorMessage = 'Cannot have a negative price! That\'s just insane!'
  }
  else {
    //Set first letter upper case (and add the rest of message) in duplicate name error
    //strange that Sequelize throws this error without proper casing!
    errorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)
  }

  return (
    <div className="alert alert-danger" role="alert">
      <strong>Woah there, hold up!</strong> { errorMessage }
    </div>
  )
}

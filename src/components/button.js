import React from 'react'

import PropTypes from 'prop-types'

import './button.css'

const Button = (props) => {
  return (
    <div className="button-button">
      <span className="button-text">{props.text}</span>
    </div>
  )
}

Button.defaultProps = {
  text: 'Buy coffee',
}

Button.propTypes = {
  text: PropTypes.string,
}

export default Button

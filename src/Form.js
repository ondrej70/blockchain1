import React, { useId } from 'react'

const Form = () => {
    const generatedId = useId();

  return (
    <>
        <h3>form 1</h3>
        <form onSubmit={e => e.preventDefault()}>
            <label htmlFor={generatedId + "1"}>Email: </label>
            <input type='email' id={generatedId + "1"} name='emailInput' required></input>
            <button type='submit'>Submit email</button>
        </form>
        <h3>form 2</h3>
        <form onSubmit={e => e.preventDefault()}>
            <label htmlFor={generatedId + "2"}>Email: </label>
            <input type='email' id={generatedId + "2"} name='emailInput' required></input>
            <button type='submit'>Submit email</button>
        </form>
    </>
  )
}

export default Form
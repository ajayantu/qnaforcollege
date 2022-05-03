import React from 'react'

export default function AskQstn() {
  return (
      <>
    <form action="">
        <label htmlFor="">Question</label><br />
        <input type="text" /><br />
        <label htmlFor="">Description</label><br />
        <input type="text" /><br />
        <label htmlFor="">Visibility</label><br />

        <input type="radio" id="public" name="visibility" value={3} />
        <label htmlFor="public">Public</label><br />
        <input type="radio" id="teachers_only" name="visibility" value={1} />
        <label htmlFor="teachers_only">Teachers only</label><br />
        <input type="radio" id="students_only" name="visibility" value={0} />
        <label htmlFor="students_only">Students only</label>
        
    </form>
    </>
  )
}

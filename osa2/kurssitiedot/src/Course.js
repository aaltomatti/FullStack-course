const Course = ({course}) => {
    return(
      <div>
      <Header course= {course.name} />
      <Content parts= {course.parts} />
      <Total parts= {course.parts} />
      </div>
    )
  
  }
  const Header = (props) => {
    return(
      <>
        <h2>{props.course}</h2>
      </>
    )
  }
  const Part = (props) => {
    return(
      <>
        <p>{props.text} {props.amount}</p>
      </>
    )
  }
  const Content = ({parts}) => {
    return(
      <>
        {parts.map(part =>
          <Part text={part.name} amount={part.exercises} key={part.id}/>)}
      </>
    )
  }
  const Total = ({parts}) => {
  
    const total = parts.reduce( (s, p) => {
      if (isNaN(s.exercises)) {
        return s + p.exercises
      }
      else {
        return s.exercises + p.exercises
      }
    })
    return <p>
            <b>total of {total} exercises </b>
          </p>
  }
  
export default Course
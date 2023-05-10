import { Container, ListGroup, ProgressBar, Row, Col } from 'react-bootstrap';
import './App.css';
import { ListItem } from './components/ListItem';
import { useEffect, useState } from 'react';
import attendanceList from './db/attendance.json'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [totalPresent, setTotalPresent] = useState(0);
  const [attendance, setAttendance] = useState([])

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('attendanceList'))

    if (!list || list.length === 0) {
      setAttendance(attendanceList)
      localStorage.setItem('attendanceList', JSON.stringify(attendanceList))
    } else {
      const count = list.reduce((total, attending) => attending.isPresent ? total = total + 1 : total, 0)
      setAttendance(list)
      setTotalPresent(count)
    }
  }, [])

  const saveData = (index, isChecked) => {
    const list = JSON.parse(localStorage.getItem('attendanceList'))

    const newList = list.map((attending, arrIndex) => {
      if (index === arrIndex) {
        return { ...attending, isPresent: isChecked }
      }
      return { ...attending }
    })

    localStorage.setItem("attendanceList", JSON.stringify(newList))
  }

  return (
    <Container className="App pb-3 border border-primary text-bg-primary">
      <Row>
        <h1>Liberty Science Center</h1>
      </Row>
      <Row className='pb-4'>
        <h2>Children's Academy of Springfield/Parent's of Children's Academy</h2>
      </Row>
      <Container>
        <Row>
          <Col>
            <ListGroup>
              {attendance.sort((a,b) => a.child > b.child ? 1 : -1).map(({ child, numOfAdults, isPresent, isMember }, index) => <ListItem key={index} index={index} child={child} numOfAdults={numOfAdults} isPresent={isPresent} isMember={isMember} totalPresent={totalPresent} setTotalPresent={setTotalPresent} saveData={saveData} />
              )}</ListGroup>
          </Col>
        </Row>
      </Container>
        <ProgressBar className='mt-4' variant='success' animated now={totalPresent} max={attendance.length} label={`${totalPresent}/${attendance.length}`} />
    </Container>
  );
}

export default App;

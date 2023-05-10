import { useState } from "react";
import { ListGroup, Button, Container, Row, Col } from "react-bootstrap";

export const ListItem = ({
  index,
  child,
  numOfAdults,
  isPresent,
  isMember,
  totalPresent,
  setTotalPresent,
  saveData,
}) => {
  const [isChecked, setIsChecked] = useState(isPresent);

  const handleButtonClick = async () => {
    setIsChecked(!isChecked);

    if (!isChecked) {
      await setTotalPresent(totalPresent + 1);
    } else {
      await setTotalPresent(totalPresent - 1);
    }

    await saveData(index, !isChecked);
  };

  return (
    <ListGroup.Item variant={isChecked ? "success" : "secondary"}>
      <Container fluid="md">
        <Row>
          <Col>
            {child}
            {isMember ? "*" : null}
          </Col>
          <Col>
            {numOfAdults} adult{numOfAdults > 1 ? "s" : ""}
          </Col>
          <Col>
            <Button variant="primary" onClick={handleButtonClick}>
              {isChecked ? "Uncheck" : "Check in"}
            </Button>
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
  );
};

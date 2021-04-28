import React, {useState} from "react";
import { Container,Row, Media } from "react-bootstrap";
import { mdiDotsHorizontal } from "@mdi/js";
import Icon from "@mdi/react";


const Indicators = () => {
  const[indicator, setIndicator] = useState(8)
  return (
    <Container>
      <Row>
        <h3>Indicators</h3>
      </Row>
    {indicator >= 1 ? (
      <ul className="list-unstyled">
        {[...Array(8)].map(() => {
          return (
            <Row>
              <Media as="li">
                <img
                  width={64}
                  height={64}
                  className="mr-3"
                  src="https://www.healthylifestylesliving.com/wp-content/uploads/2015/12/placeholder-256x256.gif"
                  alt="placeholder"
                />
                <Media.Body>
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Indicator Code - Indicator Title</h5>
                    <small>
                      <Icon path={mdiDotsHorizontal} size={1} className="p-1" />
                    </small>
                  </div>
                  <p>
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                    scelerisque ante sollicitudin commodo. Cras purus odio,
                    vestibulum in vulputate at, tempus viverra turpis. Fusce
                    condimentum nunc ac nisi vulputate fringilla. Donec lacinia
                    congue felis in faucibus.
                  </p>
                </Media.Body>
              </Media>
            </Row>
          );
        })}
      </ul>) : null
}
    </Container>
  );
};

export default Indicators;

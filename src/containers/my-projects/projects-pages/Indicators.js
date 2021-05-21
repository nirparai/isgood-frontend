import React, { useState } from "react";

import { Container, Row, Media } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiDotsHorizontal } from "@mdi/js";

const Indicators = ({ indicators }) => {
  return (
    <Container>
      <Row>
        <h3>Indicators</h3>
      </Row>

      <ul className="list-unstyled">
        {indicators &&
          indicators.map((indicator, index) => {
            return (
              <Row key={index}>
                <Media as="li">
                  <img
                    width={64}
                    height={64}
                    className="mr-3"
                    src="https://www.healthylifestylesliving.com/wp-content/uploads/2015/12/placeholder-256x256.gif"
                    alt="placeholder"
                  />
                  <Media.Body>
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">Indicator Code - Indicator Title</h5>
                      <small>
                        <Icon
                          path={mdiDotsHorizontal}
                          size={1}
                          className="p-1"
                        />
                      </small>
                    </div>
                    <p>{indicator.description}</p>
                  </Media.Body>
                </Media>
              </Row>
            );
          })}
      </ul>
    </Container>
  );
};

export default Indicators;

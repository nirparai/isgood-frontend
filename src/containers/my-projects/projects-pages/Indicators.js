import React from "react";

import { Container, Row, Media } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiDotsVertical } from "@mdi/js";
import tempImg from "../../../assets/isgoodai-logo.png";

const Indicators = ({ indicators }) => {
  const MediaBody = () => {
    return (
      <div>
        {indicators.map((indicator, index) => {
          return (
            <Media key={index}>
              <div>
                <img
                  src={tempImg}
                  alt="placeholderImg"
                  style={{
                    width: "100px",
                    height: "100px",
                    paddingRight: "15px",
                  }}
                />
              </div>
              <Media.Body>
                <Row style={{ justifyContent: "space-between" }}>
                  <h5>
                    {indicator.name} &emsp;
                    <span>{indicator.code}</span>
                  </h5>
                  <Icon path={mdiDotsVertical} size={1.25} className="p-1" />
                </Row>
                <span>{indicator.description}</span>
              </Media.Body>
            </Media>
          );
        })}
      </div>
    );
  };

  return (
    <Container>
      <Row>
        <h3>Indicators</h3>
      </Row>
      {indicators.length ? <MediaBody /> : null}
    </Container>
  );
};

export default Indicators;

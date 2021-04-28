import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiAccountBox, mdiMenu, mdiDotsVertical, mdiDotsGrid } from "@mdi/js";

const Team = () => {
  const [members, setMembers] = useState(6);
  return (
    <Container className="border">
      <Row>
        <Col className=" col-6 mt-3">
          <input placeholder="Filter (future release)" disabled />
        </Col>
        <Col className=" col-6 mt-3 d-flex justify-content-end">
          <Icon path={mdiMenu} size={1.3} className="p-1" />
          <Icon path={mdiDotsGrid} size={1.3} className="p-1" />
        </Col>
      </Row>
      {members >= 1 ? (
        <>
          <Row className="d-flex justify-content-center py-5">
            {[...Array(6)].map(() => {
              return (
                <Col
                  md={2}
                  sm={3}
                  xs={5}
                  className="card d-flex justify-content-center p-1 m-2"
                >
                  <Icon path={mdiAccountBox} size={2} className="w-100" />
                  <div className="card-body d-flex justify-content-center">
                    <h6 className="card-text text-center">Name</h6>
                  </div>
                </Col>
              );
            })}
          </Row>
        </>
      ) : null}
    </Container>
  );
};

export default Team;

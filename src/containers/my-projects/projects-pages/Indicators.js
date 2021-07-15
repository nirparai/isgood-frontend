import React from "react";

import { Container, Row, Media, Dropdown } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiDotsVertical } from "@mdi/js";
import tempImg from "../../../assets/isgoodai-logo.png";
import ModalContainer from "../../../components/ModalContainer";
import IndicatorModal from "../../indicator-pages/indicatorModal";

const Indicators = ({ indicators }) => {
  const IconDropdown = React.forwardRef(({ children, onClick }, ref) => (
    <Icon
      ref={ref}
      path={mdiDotsVertical}
      size={1.25}
      className="p-1"
      onClick={(e) => {
        onClick(e);
      }}
    />
  ));

  const MediaBody = () => {
    const DropdownItemCustom = () => <div>Custom Item 1</div>;
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

                  <Dropdown>
                    <Dropdown.Toggle as={IconDropdown} />
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="1">
                        <ModalContainer
                          modalTitle="Indicator Title"
                          toggleComponent={<DropdownItemCustom />}
                          modal={<IndicatorModal />}
                        />
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="2">Custom Item 2</Dropdown.Item>
                      <Dropdown.Item eventKey="3">Custom Item 3</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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

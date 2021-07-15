import { Container, Col, Row, Nav, Tab } from "react-bootstrap";
import IndicatorTab from "./indicatorTab";
import {
  Definition,
  Usage,
  Calculation,
  Reference,
  Details,
} from "./indicatorContentTitle";

const IndicatorModal = () => {
  return (
    <div>
      <Container>
        <Tab.Container id="left-tabs" defaultActiveKey="definition">
          <Row className="mt-4">
            <Col lg={3} sm={12}>
              <Nav variant="pills" className="sticky-top flex-column pt-2">
                <Nav.Item>
                  <Nav.Link eventKey="definition" className="d-flex">
                    Definition
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="usage" className="d-flex">
                    Usage Description
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="calculation" className="d-flex">
                    Calculation
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="reference" className="d-flex">
                    Reference Data
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="details" className="d-flex">
                    Details
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={12} lg={9}>
              <Tab.Content>
                <Tab.Pane eventKey="definition">
                  {/* definition */}
                  <IndicatorTab
                    Title={<Definition.Title />}
                    Content={<Definition.Content />}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="usage">
                  <IndicatorTab
                    Title={<Usage.Title />}
                    Content={<Usage.Content />}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="calculation">
                  <IndicatorTab
                    Title={<Calculation.Title />}
                    Content={<Calculation.Content />}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="reference">
                  <IndicatorTab
                    Title={<Reference.Title />}
                    Content={<Reference.Content />}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="details">
                  <IndicatorTab
                    Title={<Details.Title />}
                    Content={<Details.Content />}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default IndicatorModal;

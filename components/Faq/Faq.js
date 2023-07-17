import { Collapse } from 'antd';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const { Panel } = Collapse;

const AccordionTitle = styled(Panel)`
.ant-collapse-header-text {
color: #535150;
font-size: 22px;
font-family: Poppins;
font-weight: bold;
text-decoration: none;
}
`;

const PanelContent = styled.p`
    color: #535150;
    font-size: 16px;
    font-family: Poppins;
    `;

const Faq = ({ faqs }) => {

    const customExpandIcon = (props) => {
        if (props.isActive) {
            return <a style={{ fontSize: 22 }} onClick={e => {
                props.onItemClick(props.panelKey)
            }}>
                <FontAwesomeIcon style={{ color: "#535150" }} icon={faMinus} />
            </a>
        } else {
            return <a style={{ fontSize: 22 }} onClick={e => {
                props.onItemClick(props.panelKey)
            }}>
                <FontAwesomeIcon style={{ color: "#535150" }} icon={faPlus} />
            </a>
        }
    }


    return (
        <div className="text-left pt-5 mt-5" style={{ color: '#535150' }}>
            <h3 className="h1 pl-3 pb-3" id="faq">FAQ</h3>

            <Collapse defaultActiveKey={[faqs[0]?.attributes?.question]} ghost expandIcon={customExpandIcon}>

                {faqs.map(faq => {
                    const { attributes: { question, answer } } = faq;

                    return (
                        <AccordionTitle header={question} key={question}>
                            <PanelContent>{answer}</PanelContent>
                        </AccordionTitle>
                    )

                })}

            </Collapse>
        </div>
    )
}

export default Faq;
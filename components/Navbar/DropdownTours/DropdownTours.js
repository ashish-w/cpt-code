import { Dropdown } from "antd";

const DropdownTours = ({ children, subMenuItems }) => (
    <div style={{ zIndex: 1060 }}>
        <Dropdown
            menu={{
                items: subMenuItems,
                selectable: true,
                defaultSelectedKeys: ['1'],
            }}
        >
            {children}
        </Dropdown>
    </div >)

export default DropdownTours;
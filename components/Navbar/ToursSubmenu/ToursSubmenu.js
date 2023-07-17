import { Menu } from "antd";

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label
    };
}

const ToursSubmenu = ({ subMenuItems, isActiveRoute, toursPath }) => {

    const subItems = subMenuItems.map(item => {
        return getItem(item.label, item.key)
    })

    const items = [
        getItem(
            <span
                className={`toursMenu ${isActiveRoute(
                    toursPath
                )}`}
            >Tours</span>, "sub1", "", subItems),
    ];

    return (
        <>
            <Menu
                inlineIndent={16}
                defaultSelectedKeys={["1"]}
                // defaultOpenKeys={["sub1"]}
                mode={"inline"}
                theme={"light"}
                items={items}
            />
        </>
    );
};
export default ToursSubmenu;
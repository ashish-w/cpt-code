import { Button, Drawer, List, Divider } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import styles from './Drawer.module.css';
import Link from "next/link";
// import ToursSubmenu from "../ToursSubmenu/ToursSubmenu";

const DrawerComponent = (props) => {

    const { isExpanded, setIsExpanded, navRoutes, currentRoute } = props
    const toggleDrawer = () => {
        setIsExpanded(!isExpanded);
    };

    const isActiveRoute = (routes) => {
        if (routes.some(route => route === currentRoute)) {
            return `activeRoute`;
        }
    }

    const routes = navRoutes || ['Home', 'About', 'Mission'];

    // const toursPath = navRoutes.filter(item => item.isSubMenu).map(item => item.route);

    // const subMenuItems = navRoutes.filter(item => item.isSubMenu).map(item => (
    //     {
    //         key: item.name,
    //         label: (<Link href={item.route} style={{ color: 'black' }} onClick={toggleDrawer}>{item.name}</Link>)
    //     }
    // ));

    return (
        <div>
            <Button onClick={toggleDrawer} className={styles.mobileToggler}>
                <MenuOutlined style={{ color: '#88bc2c' }} />
            </Button>
            <Drawer
                placement='right'
                closable={true}
                open={isExpanded}
                onClose={toggleDrawer}
                width={250}
                zIndex={1050}
                headerStyle={{ display: 'none' }}
                bodyStyle={{ padding: 10 }}
            >
                <List>

                    {routes.filter(item => !item.isSubMenu).map(item => (
                        <div key={item.name}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                margin: '1em 0',
                                padding: '7px 20px 7px 20px'
                            }}>
                                <Link href={item.route} className={isActiveRoute([item.route])} onClick={toggleDrawer}>
                                    {item.name}
                                </Link>

                                {item === routes.at(0) && <div
                                    onClick={toggleDrawer}
                                    className={styles.closeBtn}>X</div>
                                }
                            </div>

                            {item === routes.at(1) &&
                                routes.filter(item => item.isSubMenu).map(item => (
                                    <div
                                        key={item.route}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            margin: '1em 0',
                                            padding: '7px 20px 7px 20px'
                                        }}>
                                        <Link href={item.route} className={isActiveRoute([item.route])} onClick={toggleDrawer}>
                                            {item.name}
                                        </Link>
                                    </div>
                                ))
                            }

                            {/* {item === routes.at(1) &&
                                <ToursSubmenu
                                    subMenuItems={subMenuItems}
                                    isActiveRoute={isActiveRoute}
                                    toursPath={toursPath}
                                />
                            } */}
                        </div>)
                    )}

                </List>
                <Divider />
            </Drawer>
        </div >
    )
}

export default DrawerComponent;
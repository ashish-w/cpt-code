import { Space, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingSpinner = ({ height }) => {
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 55,
                color: '#88bc2c'
            }}
            spin
        />
    );

    return (
        <Space
            direction="vertical"
            style={{
                width: '100%',
                height,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Spin style={{ color: '#88bc2c' }} indicator={antIcon} size="large" />
        </Space>
    )
}

export default LoadingSpinner;
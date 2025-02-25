// Create these files for a demo app

// src/demo/App.tsx
import React from 'react';
import { Typography } from 'antd';
import AmountView from '../components/amount_view';

const { Title } = Typography;

const App: React.FC = () => {
    return (
        <div style={{ padding: '40px' }}>
            <Title level={2}>Frontend Core UI Demo</Title>

            <AmountView amount={2000} currency='jpy' />
        </div>
    );
};

export default App;

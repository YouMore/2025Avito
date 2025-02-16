import React from 'react';
import { Col, Steps, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

const { Step } = Steps;

interface StepsSidebarProps {
  steps: { title: string }[];
  currentStep: number;
}

const StepsSidebar: React.FC<StepsSidebarProps> = ({ steps, currentStep }) => {
  const navigate = useNavigate();

  return (
    <Col xs={24} sm={8} md={6} lg={6} xl={6}>
      <Steps current={currentStep} direction="vertical" style={{ height: '40%' }}>
        {steps.map((step) => (
          <Step key={step.title} title={step.title} />
        ))}
      </Steps>
      <Button icon={<LeftOutlined />} onClick={() => navigate(-1)}>Вернутся</Button>
    </Col>
  );
};

export default StepsSidebar;

import React from 'react';
import { Col, Card, Form, Button } from 'antd';

interface FormCardProps {
  form: any; // Замените `any` на тип вашей формы, если он известен
  formData: any; // Замените `any` на тип ваших данных формы
  steps: { content: React.ReactNode }[];
  currentStep: number;
  prevStep: () => void;
  nextStep: () => void;
  handleFinish: () => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>; // Замените `any` на тип ваших данных формы
}

const FormCard: React.FC<FormCardProps> = ({
  form,
  formData,
  steps,
  currentStep,
  prevStep,
  nextStep,
  handleFinish,
  setFormData,
}) => {
  return (
    <Col xs={24} sm={16} md={18} lg={18} xl={18}>
      <Card>
        <Form
          form={form}
          layout="vertical"
          initialValues={formData}
          onValuesChange={(changedValues, allValues) => {
            console.log('Changed values:', changedValues); // Логируем измененные значения
            console.log('All values:', allValues); // Логируем все значения формы
            setFormData((prev: any) => ({ ...prev, ...changedValues }));
          }}
        >
          <div>{steps[currentStep].content}</div>

          <div style={{ marginTop: 24 }}>
            {currentStep > 0 && (
              <Button style={{ marginRight: 8 }} onClick={prevStep}>
                Назад
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={nextStep}>
                Далее
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="primary" onClick={handleFinish}>
                Завершить
              </Button>
            )}
          </div>
        </Form>
      </Card>
    </Col>
  );
};

export default FormCard;

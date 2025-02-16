import React, { useState, useEffect } from 'react';
import { Form, message, Row } from 'antd';
import BasicStep from './steps/BasicStep';
import RealEstateStep from './steps/RealEstateStep';
import AutoStep from './steps/AutoStep';
import ServicesStep from './steps/ServicesStep';
import { Item } from '../../api/types';
import { useNavigate } from 'react-router-dom';
import StepsSidebar from './StepsSidebar';
import FormCard from './FormCard';

interface MultiStepFormProps {
  onFinish: (values: Item) => void;
  initialValues?: Item;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ onFinish, initialValues }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<Partial<Item>>(initialValues || {});
  const navigate = useNavigate();

  // Восстанавливаем данные из localStorage при монтировании
  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData); // Обновляем состояние formData
      form.setFieldsValue(parsedData); // Устанавливаем данные в форму
    }
  }, [form]);

  // Сохраняем данные в localStorage при изменении formData
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  // После восстановления данных из localStorage, сразу записываем текущие значения формы в localStorage
  useEffect(() => {
    const values = form.getFieldsValue();
    if (Object.keys(values).length > 0) { // Проверяем, что форма не пустая
      localStorage.setItem('formData', JSON.stringify(values));
    }
  }, [form]);

  const nextStep = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      setFormData((prev) => ({ ...prev, ...values })); // Обновляем formData
      setCurrentStep(currentStep + 1);
    } catch (error) {
      message.error('Заполните все обязательные поля перед переходом на следующий шаг');
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = () => {
    form
      .validateFields()
      .then((values) => {
        const finalData = { ...formData, ...values };
        onFinish(finalData); // Отправляем данные только если валидация прошла успешно
        localStorage.removeItem('formData'); // Очищаем localStorage после завершения
      })
      .catch((error) => {
        console.error('Ошибка валидации:', error);
        message.error('Заполните все обязательные поля перед отправкой формы');
      });
  };

  const steps = [
    {
      title: 'Основные данные',
      content: <BasicStep />,
    },
    {
      title: 'Дополнительные данные',
      content: (
        <>
          {formData.type === 'Недвижимость' && <RealEstateStep />}
          {formData.type === 'Авто' && <AutoStep />}
          {formData.type === 'Услуги' && <ServicesStep />}
        </>
      ),
    },
  ];

  return (
    <Row gutter={[24, 24]}>
      <StepsSidebar steps={steps} currentStep={currentStep} />
      <FormCard
        form={form}
        formData={formData}
        steps={steps}
        currentStep={currentStep}
        prevStep={prevStep}
        nextStep={nextStep}
        handleFinish={handleFinish}
        setFormData={setFormData}
      />
    </Row>
  );
};

export default MultiStepForm;
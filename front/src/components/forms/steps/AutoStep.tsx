import React from 'react';
import { Form, Input, InputNumber, Select } from 'antd';

const { Option } = Select;

const AutoStep: React.FC = () => {
  return (
    <>
      <Form.Item
        label="Марка"
        name="brand"
        rules={[{ required: true, message: 'Выберите марку' }]}
      >
        <Select>
          <Option value="Toyota">Toyota</Option>
          <Option value="Honda">Honda</Option>
          <Option value="Ford">Ford</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Модель"
        name="model"
        rules={[{ required: true, message: 'Введите модель' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Год выпуска"
        name="year"
        rules={[{ required: true, message: 'Введите год выпуска' }]}
      >
        <InputNumber min={1900} max={new Date().getFullYear()} />
      </Form.Item>
      <Form.Item 
        label="Пробег (км)" 
        name="mileage"
        rules={[{ required: true, message: 'Введите пробег' }]}
      >
        <InputNumber min={1} />
      </Form.Item>
    </>
  );
};

export default AutoStep;
import React from 'react';
import { Form, Input, InputNumber, Select } from 'antd';

const { Option } = Select;

const ServicesStep: React.FC = () => {
  return (
    <>
      <Form.Item
        label="Тип услуги"
        name="serviceType"
        rules={[{ required: true, message: 'Выберите тип услуги' }]}
      >
        <Select>
          <Option value="Ремонт">Ремонт</Option>
          <Option value="Уборка">Уборка</Option>
          <Option value="Доставка">Доставка</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Опыт работы (лет)"
        name="experience"
        rules={[{ required: true, message: 'Введите опыт работы' }]}
      >
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item
        label="Стоимость"
        name="cost"
        rules={[{ required: true, message: 'Введите стоимость' }]}
      >
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item label="График работы" name="workSchedule">
        <Input />
      </Form.Item>
    </>
  );
};

export default ServicesStep;
import React from 'react';
import { Form, InputNumber, Select } from 'antd';

const { Option } = Select;

const RealEstateStep: React.FC = () => {
  return (
    <>
      <Form.Item
        label="Тип недвижимости"
        name="propertyType"
        rules={[{ required: true, message: 'Выберите тип недвижимости' }]}
      >
        <Select>
          <Option value="Квартира">Квартира</Option>
          <Option value="Дом">Дом</Option>
          <Option value="Коттедж">Коттедж</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Площадь (кв. м)"
        name="area"
        rules={[{ required: true, message: 'Введите площадь' }]}
      >
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item
        label="Количество комнат"
        name="rooms"
        rules={[{ required: true, message: 'Введите количество комнат' }]}
      >
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item
        label="Цена"
        name="price"
        rules={[{ required: true, message: 'Введите цену' }]}
      >
        <InputNumber min={1} />
      </Form.Item>
    </>
  );
};

export default RealEstateStep;
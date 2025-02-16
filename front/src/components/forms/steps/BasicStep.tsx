import React from 'react';
import { Form, Input, Select } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const BasicStep: React.FC = () => {
  return (
    <>
      <Form.Item
        label="Название"
        name="name"
        rules={[{ required: true, message: 'Введите название' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Описание"
        name="description"
        rules={[{ required: true, message: 'Введите описание' }]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item
        label="Локация"
        name="location"
        rules={[{ required: true, message: 'Введите локацию' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Фото" name="image">
        <Input />
      </Form.Item>
      <Form.Item
        label="Категория объявления"
        name="type"
        rules={[{ required: true, message: 'Выберите категорию' }]}
      >
        <Select>
          <Option value="Недвижимость">Недвижимость</Option>
          <Option value="Авто">Авто</Option>
          <Option value="Услуги">Услуги</Option>
        </Select>
      </Form.Item>
    </>
  );
};

export default BasicStep;
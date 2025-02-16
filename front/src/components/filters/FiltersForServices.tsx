import React from 'react';
import { Input, Row, Col, Select, InputNumber } from 'antd';

const { Option } = Select;

interface FiltersForServicesProps {
  onServiceTypeChange: (type: string) => void;
  onExperienceChange: (min: number | null) => void;
  onCostChange: (min: number | null, max: number | null) => void;
}

const FiltersForServices: React.FC<FiltersForServicesProps> = ({
  onServiceTypeChange,
  onExperienceChange,
  onCostChange,
}) => {
  return (
    <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
      <Col span={8}>
        <Select
          placeholder="Тип услуги"
          style={{ width: '100%' }}
          onChange={onServiceTypeChange}
        >
          <Option value="ремонт">Ремонт</Option>
          <Option value="уборка">Уборка</Option>
          <Option value="доставка">Доставка</Option>
        </Select>
      </Col>

      <Col span={8}>
        <InputNumber
          placeholder="Опыт от (лет)"
          style={{ width: '100%' }}
          onChange={onExperienceChange}
        />
      </Col>

      <Col span={8}>
        <Input.Group compact>
          <InputNumber
            placeholder="Цена от"
            style={{ width: '50%' }}
            onChange={(value) => onCostChange(Number(value), null)}
          />
          <InputNumber
            placeholder="Цена до"
            style={{ width: '50%' }}
            onChange={(value) => onCostChange(null, Number(value))}
          />
        </Input.Group>
      </Col>
    </Row>
  );
};

export default FiltersForServices;
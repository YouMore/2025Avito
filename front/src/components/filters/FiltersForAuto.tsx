import React from 'react';
import { Input, Row, Col, Select, InputNumber } from 'antd';

const { Option } = Select;

interface FiltersForAutoProps {
  onBrandChange: (brand: string) => void;
  onModelChange: (model: string) => void;
  onYearChange: (min: number | null, max: number | null) => void;
}

const FiltersForAuto: React.FC<FiltersForAutoProps> = ({
  onBrandChange,
  onModelChange,
  onYearChange,
}) => {
  return (
    <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
      <Col span={8}>
        <Select
          placeholder="Марка"
          style={{ width: '100%' }}
          onChange={onBrandChange}
        >
          <Option value="Toyota">Toyota</Option>
          <Option value="Honda">Honda</Option>
          <Option value="Ford">Ford</Option>
        </Select>
      </Col>

      <Col span={8}>
        <Input
          placeholder="Модель"
          allowClear
          onChange={(e) => onModelChange(e.target.value)}
        />
      </Col>

      <Col span={8}>
        <Input.Group compact>
          <InputNumber
            placeholder="Год от"
            style={{ width: '50%' }}
            onChange={(value) => onYearChange(Number(value), null)}
          />
          <InputNumber
            placeholder="Год до"
            style={{ width: '50%' }}
            onChange={(value) => onYearChange(null, Number(value))}
          />
        </Input.Group>
      </Col>
    </Row>
  );
};

export default FiltersForAuto;
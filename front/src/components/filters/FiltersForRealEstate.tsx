import React from 'react';
import { Input, Row, Col, Select, InputNumber } from 'antd';

const { Option } = Select;

interface FiltersForRealEstateProps {
  onPropertyTypeChange: (type: string) => void;
  onAreaChange: (min: number | null, max: number | null) => void;
  onRoomsChange: (min: number | null, max: number | null) => void;
  onPriceChange: (min: number | null, max: number | null) => void;
}

const FiltersForRealEstate: React.FC<FiltersForRealEstateProps> = ({
  onPropertyTypeChange,
  onAreaChange,
  onRoomsChange,
  onPriceChange,
}) => {
  return (
    <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
      <Col span={6}>
        <Select
          placeholder="Тип недвижимости"
          style={{ width: '100%' }}
          onChange={onPropertyTypeChange}
        >
          <Option value="квартира">Квартира</Option>
          <Option value="дом">Дом</Option>
          <Option value="коттедж">Коттедж</Option>
        </Select>
      </Col>

      <Col span={6}>
        <Input.Group compact>
          <InputNumber
            placeholder="Площадь от"
            style={{ width: '50%' }}
            onChange={(value) => onAreaChange(Number(value), null)}
          />
          <InputNumber
            placeholder="Площадь до"
            style={{ width: '50%' }}
            onChange={(value) => onAreaChange(null, Number(value))}
          />
        </Input.Group>
      </Col>

      <Col span={6}>
        <Input.Group compact>
          <InputNumber
            placeholder="Комнат от"
            style={{ width: '50%' }}
            onChange={(value) => onRoomsChange(Number(value), null)}
          />
          <InputNumber
            placeholder="Комнат до"
            style={{ width: '50%' }}
            onChange={(value) => onRoomsChange(null, Number(value))}
          />
        </Input.Group>
      </Col>

      <Col span={6}>
        <Input.Group compact>
          <InputNumber
            placeholder="Цена от"
            style={{ width: '50%' }}
            onChange={(value) => onPriceChange(Number(value), null)}
          />
          <InputNumber
            placeholder="Цена до"
            style={{ width: '50%' }}
            onChange={(value) => onPriceChange(null, Number(value))}
          />
        </Input.Group>
      </Col>
    </Row>
  );
};

export default FiltersForRealEstate;
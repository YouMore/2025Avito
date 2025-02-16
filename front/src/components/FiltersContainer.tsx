import React, { useState } from 'react';
import { Input, Select, Row, Col } from 'antd';
import useDebounce from '../hooks/useDebounce';
import FiltersForAuto from './filters/FiltersForAuto';
import FiltersForRealEstate from './filters/FiltersForRealEstate';
import FiltersForServices from './filters/FiltersForServices';

const { Option } = Select;

interface FiltersContainerProps {
  onSearch: (searchText: string) => void;
  onFilterChange: (filterValue: string) => void;
  onAdditionalFilterChange: (filterName: string, value: any) => void;
}

const FiltersContainer: React.FC<FiltersContainerProps> = ({
  onSearch,
  onFilterChange,
  onAdditionalFilterChange,
}) => {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // useDebounce для поиска с задержкой
  useDebounce(searchText, 500, onSearch);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    onFilterChange(value);
    onAdditionalFilterChange('reset', null); // Сброс доп фильтров
  };

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col span={12}>
          <Input
            placeholder="Поиск по названию"
            allowClear
            value={searchText}
            onChange={handleSearchChange}
          />
        </Col>
        <Col span={12}>
          <Select
            placeholder="Фильтр по категории"
            allowClear
            style={{ width: '100%' }}
            onChange={handleCategoryChange}
          >
            <Option value="Недвижимость">Недвижимость</Option>
            <Option value="Авто">Авто</Option>
            <Option value="Услуги">Услуги</Option>
          </Select>
        </Col>
      </Row>

      {/* Дополнительные фильтры в зависимости от категории */}
      {selectedCategory === 'Авто' && (
        <FiltersForAuto
          onBrandChange={(value) => onAdditionalFilterChange('brand', value)}
          onModelChange={(value) => onAdditionalFilterChange('model', value)}
          onYearChange={(min, max) => onAdditionalFilterChange('year', { min, max })}
        />
      )}

      {selectedCategory === 'Недвижимость' && (
        <FiltersForRealEstate
          onPropertyTypeChange={(value) => onAdditionalFilterChange('propertyType', value)}
          onAreaChange={(min, max) => onAdditionalFilterChange('area', { min, max })}
          onRoomsChange={(min, max) => onAdditionalFilterChange('rooms', { min, max })}
          onPriceChange={(min, max) => onAdditionalFilterChange('price', { min, max })}
        />
      )}

      {selectedCategory === 'Услуги' && (
        <FiltersForServices
          onServiceTypeChange={(value) => onAdditionalFilterChange('serviceType', value)}
          onExperienceChange={(min) => onAdditionalFilterChange('experience', { min })}
          onCostChange={(min, max) => onAdditionalFilterChange('cost', { min, max })}
        />
      )}
    </>
  );
};

export default FiltersContainer;
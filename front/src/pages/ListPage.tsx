import React, { useEffect, useState } from 'react';
import { Button, List, Typography, Card, Flex, Col, Pagination, Spin } from 'antd';
import FiltersContainer from '../components/FiltersContainer';
import ListItem from '../components/ListItem';
import { Item } from '../api/types';
import { searchItemsByName, filterItemsByType } from '../utils/filters';
import { getItems } from '../api/api';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const ListPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchText, setSearchText] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');
  const [additionalFilters, setAdditionalFilters] = useState<Record<string, any>>({});
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error('Ошибка:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    let filtered = items;

    if (searchText) {
      filtered = searchItemsByName(filtered, searchText);
    }

    if (filterValue) {
      filtered = filterItemsByType(filtered, filterValue);
    }

    // Применяем дополнительные фильтры
    if (Object.keys(additionalFilters).length > 0) {
      filtered = filtered.filter((item) => {
        return Object.entries(additionalFilters).every(([key, value]) => {
          if (!value) return true;

          switch (key) {
            case 'area':
            case 'rooms':
            case 'price':
            case 'year':
            case 'cost':
              const min = value.min || -Infinity;
              const max = value.max || Infinity;
              return item[key] >= min && item[key] <= max;
            case 'experience':
              return item[key] >= value.min;
            default:
              return String(item[key]).toLowerCase().includes(String(value).toLowerCase());
          }
        });
      });
    }

    setFilteredItems(filtered);
    setCurrentPage(1); // Сброс пагинации при изменении фильтров
  }, [items, searchText, filterValue, additionalFilters]);

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  const handleFilterChange = (filterValue: string) => {
    setFilterValue(filterValue);
    setAdditionalFilters({}); // Сбрасываем дополнительные фильтры при смене категории
  };

  const handleAdditionalFilterChange = (filterName: string, value: any) => {
    if (filterName === 'reset') {
      setAdditionalFilters({});
    } else {
      setAdditionalFilters((prev) => ({
        ...prev,
        [filterName]: value,
      }));
    }
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading) {
    return (
      <Flex justify='center' align='center' style={{ height: '80vh' }}>
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <Flex justify="center" wrap>
      <Col span={24}>
        <Title level={2} style={{ textAlign: 'center' }}>
          Список объявлений
        </Title>
      </Col>
      <Col span={6} offset={22} style={{ marginBottom: '20px' }}>
        <Button
          type="primary"
          onClick={() => {
            localStorage.removeItem('formData');
            navigate('/form');
          }}
        >
          Разместить объявление
        </Button>
      </Col>
      <Col span={24}>
        <Card>
          <FiltersContainer
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onAdditionalFilterChange={handleAdditionalFilterChange}
          />
          <List
            dataSource={paginatedItems}
            renderItem={(item) => <ListItem item={item} />}
          />
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredItems.length}
            onChange={handlePageChange}
            style={{ marginTop: '20px', textAlign: 'center' }}
          />
        </Card>
      </Col>
    </Flex>
  );
};

export default ListPage;
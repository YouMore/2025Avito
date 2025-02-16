import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, message, Modal, Spin, Row, Col, Image, Descriptions, Typography, Flex } from 'antd';
import { Item } from '../api/types';
import { deleteItem, getItemById } from '../api/api';
import { renderAdditionalFields } from '../components/AdditionalFields'; // Импортируем функцию

const { Title } = Typography;

const ItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchItem = async () => {
      try {
        const data = await getItemById(Number(id), signal);
        setItem(data);
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          message.error('Ошибка при загрузке объявления');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchItem();

    return () => {
      abortController.abort();
    };
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteItem(Number(id));
      message.success('Объявление успешно удалено');
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        message.error('Ошибка при удалении объявления');
      }
    } finally {
      setIsModalVisible(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const renderDescription = () => {
    if (item && item.description.length > 100 && !showMore) {
      return (
        <>
          {item.description.slice(0, 100)}... 
          <Button type="link" onClick={() => setShowMore(true)}>Подробнее</Button>
        </>
      );
    }
    return item ? item.description : "";
  };

  if (loading) {
    return (
      <Flex justify='center' align='center' style={{ height: '80vh' }}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (!item) {
    return <div>Объявление не найдено</div>;
  }

  return (
    <div style={{ padding: '24px', border:'2px solid', borderRadius:'10px' }}>
      <Title level={2} style={{textAlign: 'center', margin:'none'}}>{item.name}</Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Image
            src={item.image || '/avitoLogo.jpg'}
            alt={item.name}
            style={{ width: '100%', borderRadius: '8px' }}
            onError={(e) => { 
              const target = e.target as HTMLImageElement;
              target.src = '/avitoLogo.jpg'; // Если изображение не загружается, заменяем на заглушку
            }}
          />
        </Col>

        <Col xs={24} md={16}>
          <Descriptions bordered column={1} title="Данные">
            <Descriptions.Item label="Описание">{renderDescription()}</Descriptions.Item>
            <Descriptions.Item label="Локация">{item.location}</Descriptions.Item>
            <Descriptions.Item label="Тип объявления">{item.type}</Descriptions.Item>
            {renderAdditionalFields(item)}
          </Descriptions>
          <div style={{ marginTop: '24px' }}>
            <Button 
              type="primary"
              onClick={() => {
                localStorage.removeItem('formData');
                navigate('/form', { state: item });
              }}
            >
              Редактировать
            </Button>
            <Button
              type="primary"
              danger
              onClick={showModal}
              style={{ marginLeft: '8px' }}
            >
              Удалить
            </Button>
          </div>
        </Col>
      </Row>

      <Modal
        title="Подтверждение удаления"
        visible={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Удалить"
        cancelText="Отмена"
      >
        <p>Вы уверены, что хотите удалить это объявление?</p>
      </Modal>
    </div>
  );
};

export default ItemPage;
import { Button, List } from 'antd';
import { Item } from '../api/types';
import { useNavigate } from 'react-router-dom';

interface ListItemProps {
  item: Item;
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <List.Item
      actions={[
        <Button onClick={() => navigate(`/item/${item.id}`, { state: item })}>
          Открыть
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={
          <div 
            style={{ 
              display: 'flex', 
              borderRadius: '10px', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: '100%' 
            }}>
            <img 
              src={item.image || '/avitoLogo.jpg'}
              onError={(e) => { 
                const target = e.target as HTMLImageElement;
                target.src = '/avitoLogo.jpg'; // Если изображение не загружается, заменяем на заглушку
              }}
              style={{ 
                width: '64px', 
                height: '64px', 
                objectFit: 'cover', 
                borderRadius: '8px',
              }}
            />
          </div>
        }
        title={item.name}
        description={
          <>
            <div><strong>Местоположение:</strong> {item.location}</div>
            <div><strong>Категория:</strong> {item.type}</div>
          </>
        }
      />
    </List.Item>
  );
};

export default ListItem;

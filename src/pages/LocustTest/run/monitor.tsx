import { Button, Card, Image, Modal ,Alert} from 'antd';
import { useState } from 'react';

const LargeImageDisplay = () => {
  const [altervisible, setAltervisible] = useState(true); // 状态来控制公告的显示与否
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* 仅在 visible 为 true 时显示公告 */}
      {altervisible && (
        <Alert
          message="监控看板使用"
          description="该页面留白，在实际业务中,根据业务测试的需求，嵌入相关的监控看板"
          type="info"
          showIcon
          closable // 允许关闭
          onClose={() => setVisible(false)} // 关闭时设置状态为 false
          style={{ marginBottom: 16 }} // 添加底部间距
        />
      )}
      <Card title="监控看板" style={{ width: '100%', textAlign: 'center' }}>
        <Image
          //   width={200} // 缩略图的宽度
          //   height={200} // 缩略图的高度
          src="/monitor.png" // 替换为您的大图链接
          alt="Large Image"
          preview={false} // 关闭默认的预览功能
        />
        {/* <Button type="primary" onClick={showModal} style={{ marginTop: '10px' }}>
          查看大图
        </Button> */}
      </Card>

      <Modal
        title="查看大图"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        width={800} // 根据需要设置宽度
      >
        <Image
          width="100%"
          src="https://example.com/large-image.jpg" // 替换为您的大图链接
          alt="Large Image"
        />
      </Modal>
    </div>
  );
};

export default LargeImageDisplay;

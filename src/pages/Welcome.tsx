import { PageContainer } from '@ant-design/pro-components';
import { useModel, history } from '@umijs/max';
import {
  Card,
  theme,
  Row,
  Col,
  Statistic,
  Button,
  Space,
  Typography,
  Divider,
  Tag,
  Avatar
} from 'antd';
import {
  ApiOutlined,
  ThunderboltOutlined,
  ScheduleOutlined,
  ProjectOutlined,
  BookOutlined,
  GithubOutlined,
  RocketOutlined,
  ToolOutlined,
  TeamOutlined,
  BugOutlined,
  DashboardOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import React from 'react';

const { Title, Paragraph, Text } = Typography;

/**
 * 功能模块卡片组件
 */
const FeatureCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  desc: string;
  path?: string;
  external?: boolean;
  href?: string;
  color?: string;
}> = ({ title, icon, desc, path, external = false, href, color = '#1890ff' }) => {
  const { token } = theme.useToken();

  const handleClick = () => {
    if (external && href) {
      window.open(href, '_blank');
    } else if (path) {
      history.push(path);
    }
  };

  return (
    <Card
      hoverable
      style={{
        height: '100%',
        borderRadius: '12px',
        border: `1px solid ${token.colorBorderSecondary}`,
      }}
      bodyStyle={{ padding: '24px' }}
      onClick={handleClick}
    >
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <Avatar
          size={48}
          style={{
            backgroundColor: color,
            marginBottom: '12px'
          }}
          icon={icon}
        />
        <Title level={4} style={{ margin: 0, color: token.colorText }}>
          {title}
        </Title>
      </div>
      <Paragraph
        style={{
          color: token.colorTextSecondary,
          textAlign: 'center',
          margin: 0,
          minHeight: '44px'
        }}
      >
        {desc}
      </Paragraph>
    </Card>
  );
};

/**
 * 技术栈卡片组件
 */
const TechCard: React.FC<{
  title: string;
  desc: string;
  tags: string[];
  icon: React.ReactNode;
  color: string;
}> = ({ title, desc, tags, icon, color }) => {
  const { token } = theme.useToken();

  return (
    <Card
      style={{
        height: '100%',
        borderRadius: '12px',
        border: `1px solid ${token.colorBorderSecondary}`,
      }}
      bodyStyle={{ padding: '20px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
        <Avatar
          size={32}
          style={{ backgroundColor: color, marginRight: '12px' }}
          icon={icon}
        />
        <Title level={5} style={{ margin: 0 }}>
          {title}
        </Title>
      </div>
      <Paragraph
        style={{
          color: token.colorTextSecondary,
          marginBottom: '12px',
          fontSize: '14px'
        }}
      >
        {desc}
      </Paragraph>
      <div>
        {tags.map((tag, index) => (
          <Tag key={index} color={color} style={{ marginBottom: '4px' }}>
            {tag}
          </Tag>
        ))}
      </div>
    </Card>
  );
};

/**
 * 巧克力测试平台开发指南页面
 */
const Welcome: React.FC = () => {
  const { token } = theme.useToken();

  // 平台统计数据
  const platformStats = [
    { title: '测试类型', value: 3, suffix: '种', icon: <ApiOutlined /> },
    { title: '核心模块', value: 8, suffix: '个', icon: <ProjectOutlined /> },
    { title: '技术栈', value: 6, suffix: '+', icon: <ToolOutlined /> },
    { title: '文档页面', value: 15, suffix: '篇', icon: <BookOutlined /> },
  ];

  // 技术栈信息
  const techStacks = [
    {
      title: '前端技术栈',
      desc: '现代化的前端开发框架和组件库',
      tags: ['React 18', 'TypeScript', 'Ant Design Pro', 'UmiJS 4'],
      icon: <RocketOutlined />,
      color: '#1890ff'
    },
    {
      title: '后端技术栈',
      desc: '轻量级且功能强大的后端服务架构',
      tags: ['Flask', 'Python 3.8+', 'SQLAlchemy', 'Celery'],
      icon: <ToolOutlined />,
      color: '#52c41a'
    },
    {
      title: '测试技术栈',
      desc: '专业的测试工具和框架集成',
      tags: ['Pytest', 'Locust', 'Requests', 'Redis'],
      icon: <BugOutlined />,
      color: '#fa8c16'
    }
  ];

  // 核心功能模块
  const coreFeatures = [
    {
      title: '接口测试',
      icon: <ApiOutlined />,
      desc: '自动化API测试，支持用例同步、参数化测试和详细报告',
      path: '/openapitest/caselist',
      color: '#1890ff'
    },
    {
      title: '压力测试',
      icon: <ThunderboltOutlined />,
      desc: '基于Locust的分布式压力测试，实时监控性能指标',
      path: '/locust/locustrun',
      color: '#fa541c'
    },
    {
      title: '测试计划',
      icon: <ScheduleOutlined />,
      desc: '定时执行测试任务，支持Cron表达式和多种通知方式',
      path: '/openapitest/caseplanlist',
      color: '#52c41a'
    },
    {
      title: '项目管理',
      icon: <ProjectOutlined />,
      desc: '完整的项目生命周期管理，支持权限控制和团队协作',
      path: '/project/list',
      color: '#722ed1'
    }
  ];

  // 开发资源链接
  const devResources = [
    {
      title: '开发文档',
      icon: <BookOutlined />,
      desc: '完整的开发指南、API文档和最佳实践',
      href: 'https://github.com/ljxpython/test_platform/blob/main/docs/developer-guide/development-setup.md',
      external: true,
      color: '#13c2c2'
    },
    {
      title: '用户指南',
      icon: <FileTextOutlined />,
      desc: '从快速开始到高级功能的完整使用教程',
      href: 'https://github.com/ljxpython/test_platform/blob/main/docs/user-guide/getting-started.md',
      external: true,
      color: '#eb2f96'
    },
    {
      title: '架构设计',
      icon: <DashboardOutlined />,
      desc: '深入了解平台的技术架构和设计理念',
      href: 'https://github.com/ljxpython/test_platform/blob/main/docs/developer-guide/architecture.md',
      external: true,
      color: '#f5222d'
    },
    {
      title: '前端源码',
      icon: <GithubOutlined />,
      desc: '查看前端源码、提交Issue或参与开源贡献',
      href: 'https://github.com/ljxpython/test_platform',
      external: true,
      color: '#595959'
    },
    {
      title: '后端源码',
      icon: <GithubOutlined />,
      desc: '查看后端源码、API实现和服务端逻辑',
      href: 'https://github.com/ljxpython/flask_platform_srv',
      external: true,
      color: '#722ed1'
    }
  ];

  return (
    <PageContainer
      header={{
        title: '🍫 巧克力测试平台开发指南',
        subTitle: '现代化的全栈测试解决方案',
        breadcrumb: {},
      }}
    >
      {/* 欢迎横幅 */}
      <Card
        style={{
          borderRadius: '12px',
          marginBottom: '24px',
          background: `linear-gradient(135deg, ${token.colorPrimary}15 0%, ${token.colorPrimary}05 100%)`,
          border: `1px solid ${token.colorPrimary}30`,
        }}
        bodyStyle={{ padding: '32px' }}
      >
        <Row align="middle" gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Title level={2} style={{ marginBottom: '16px', color: token.colorTextHeading }}>
              🚀 欢迎来到巧克力测试平台
            </Title>
            <Paragraph style={{ fontSize: '16px', color: token.colorTextSecondary, marginBottom: '24px' }}>
              这是一个基于 <Text strong>React + TypeScript + Flask</Text> 构建的现代化测试管理平台，
              集成了接口测试、压力测试、测试计划管理等核心功能。
              本页面将为开发者提供完整的开发指南和资源导航。
            </Paragraph>
            <Space size="middle">
              <Button
                type="primary"
                size="large"
                icon={<RocketOutlined />}
                onClick={() => window.open('https://github.com/ljxpython/test_platform/blob/main/docs/user-guide/getting-started.md', '_blank')}
              >
                快速开始
              </Button>
              <Button
                size="large"
                icon={<BookOutlined />}
                onClick={() => window.open('https://github.com/ljxpython/test_platform/blob/main/docs/README.md', '_blank')}
              >
                查看文档
              </Button>
              <Button
                size="large"
                icon={<GithubOutlined />}
                onClick={() => window.open('https://github.com/ljxpython/test_platform', '_blank')}
              >
                前端源码
              </Button>
            </Space>
          </Col>
          <Col xs={24} lg={8}>
            <Row gutter={[16, 16]}>
              {platformStats.map((stat, index) => (
                <Col span={12} key={index}>
                  <Statistic
                    title={stat.title}
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.icon}
                    valueStyle={{ color: token.colorPrimary }}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Card>

      {/* 技术架构 */}
      <Card
        title={
          <Title level={3} style={{ margin: 0 }}>
            <ToolOutlined style={{ marginRight: '8px', color: token.colorPrimary }} />
            技术架构
          </Title>
        }
        style={{ borderRadius: '12px', marginBottom: '24px' }}
        bodyStyle={{ padding: '24px' }}
      >
        <Row gutter={[24, 24]}>
          {techStacks.map((tech, index) => (
            <Col xs={24} md={8} key={index}>
              <TechCard {...tech} />
            </Col>
          ))}
        </Row>
      </Card>

      {/* 核心功能模块 */}
      <Card
        title={
          <Title level={3} style={{ margin: 0 }}>
            <ProjectOutlined style={{ marginRight: '8px', color: token.colorPrimary }} />
            核心功能模块
          </Title>
        }
        style={{ borderRadius: '12px', marginBottom: '24px' }}
        bodyStyle={{ padding: '24px' }}
      >
        <Row gutter={[24, 24]}>
          {coreFeatures.map((feature, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <FeatureCard {...feature} />
            </Col>
          ))}
        </Row>
      </Card>

      {/* 开发资源 */}
      <Card
        title={
          <Title level={3} style={{ margin: 0 }}>
            <BookOutlined style={{ marginRight: '8px', color: token.colorPrimary }} />
            开发资源
          </Title>
        }
        style={{ borderRadius: '12px', marginBottom: '24px' }}
        bodyStyle={{ padding: '24px' }}
      >
        <Row gutter={[24, 24]}>
          {devResources.map((resource, index) => (
            <Col xs={24} sm={12} lg={index < 3 ? 8 : 12} key={index}>
              <FeatureCard {...resource} />
            </Col>
          ))}
        </Row>
      </Card>

      {/* 开发环境搭建 */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card
            title={
              <Title level={4} style={{ margin: 0 }}>
                <RocketOutlined style={{ marginRight: '8px', color: token.colorPrimary }} />
                快速开始
              </Title>
            }
            style={{ borderRadius: '12px', height: '100%' }}
            bodyStyle={{ padding: '24px' }}
          >
            <div style={{ marginBottom: '16px' }}>
              <Title level={5}>环境要求</Title>
              <ul style={{ color: token.colorTextSecondary }}>
                <li>Node.js 16+ & Python 3.8+</li>
                <li>MySQL 8.0+ & Redis 6.0+</li>
                <li>Git 2.20+</li>
              </ul>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <Title level={5}>快速启动</Title>
              <div style={{
                backgroundColor: token.colorBgLayout,
                padding: '12px',
                borderRadius: '6px',
                fontFamily: 'monospace',
                fontSize: '13px'
              }}>
                <div># 克隆项目</div>
                <div>git clone [repository]</div>
                <div style={{ marginTop: '8px' }}># 前端启动</div>
                <div>npm install && npm start</div>
                <div style={{ marginTop: '8px' }}># 后端启动</div>
                <div>pip install -r requirements.txt</div>
                <div>python app.py</div>
              </div>
            </div>

            <Button
              type="primary"
              block
              icon={<BookOutlined />}
              onClick={() => window.open('https://github.com/ljxpython/test_platform/blob/main/docs/developer-guide/development-setup.md', '_blank')}
            >
              查看详细搭建指南
            </Button>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={
              <Title level={4} style={{ margin: 0 }}>
                <TeamOutlined style={{ marginRight: '8px', color: token.colorPrimary }} />
                贡献指南
              </Title>
            }
            style={{ borderRadius: '12px', height: '100%' }}
            bodyStyle={{ padding: '24px' }}
          >
            <div style={{ marginBottom: '16px' }}>
              <Title level={5}>开发流程</Title>
              <ol style={{ color: token.colorTextSecondary }}>
                <li>Fork 项目到个人仓库</li>
                <li>创建功能分支进行开发</li>
                <li>编写测试并确保通过</li>
                <li>提交 Pull Request</li>
              </ol>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <Title level={5}>代码规范</Title>
              <ul style={{ color: token.colorTextSecondary }}>
                <li>遵循 ESLint 和 Prettier 规范</li>
                <li>使用 TypeScript 类型定义</li>
                <li>编写单元测试和文档</li>
                <li>遵循约定式提交格式</li>
              </ul>
            </div>

            <Space direction="vertical" style={{ width: '100%' }}>
              <Button
                block
                icon={<BookOutlined />}
                onClick={() => window.open('https://github.com/ljxpython/test_platform/blob/main/docs/developer-guide/best-practices.md', '_blank')}
              >
                最佳实践指南
              </Button>
              <Button
                block
                icon={<GithubOutlined />}
                onClick={() => window.open('https://github.com/ljxpython/test_platform/issues', '_blank')}
              >
                提交 Issue (前端)
              </Button>
              <Button
                block
                icon={<GithubOutlined />}
                onClick={() => window.open('https://github.com/ljxpython/flask_platform_srv/issues', '_blank')}
              >
                提交 Issue (后端)
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>

      <Divider style={{ margin: '32px 0' }} />

      {/* 底部信息 */}
      <div style={{ textAlign: 'center', color: token.colorTextSecondary }}>
        <Paragraph>
          🍫 巧克力测试平台 - 让测试变得简单而有趣
        </Paragraph>
        <Paragraph>
          基于 <Text code>React + TypeScript + Flask</Text> 构建 |
          <a href="https://github.com/ljxpython/test_platform/blob/main/docs/README.md" target="_blank" style={{ marginLeft: '8px' }}>
            完整文档
          </a> |
          <a href="https://github.com/ljxpython/test_platform" target="_blank" style={{ marginLeft: '8px' }}>
            前端源码
          </a> |
          <a href="https://github.com/ljxpython/flask_platform_srv" target="_blank" style={{ marginLeft: '8px' }} rel="noreferrer">
            后端源码
          </a>
        </Paragraph>
      </div>
    </PageContainer>
  );
};

export default Welcome;

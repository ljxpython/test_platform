# 🍫 巧克力测试平台

<div align="center">

![Logo](./public/logo.svg)

**现代化的全栈测试解决方案**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/python-%3E%3D3.8-brightgreen.svg)](https://python.org/)
[![React](https://img.shields.io/badge/react-18.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.x-blue.svg)](https://www.typescriptlang.org/)

[快速开始](#-快速开始) • [功能特性](#-功能特性) • [文档](#-文档) • [部署指南](#-部署指南) • [贡献指南](#-贡献指南)

</div>

## 🎯 项目简介

巧克力测试平台是一个基于 **React + TypeScript + Flask** 构建的现代化测试管理平台，集成了接口测试、压力测试、测试计划管理等核心功能，旨在为团队提供一站式的测试解决方案。

### ✨ 为什么选择巧克力测试平台？

- 🚀 **开箱即用**: 5分钟快速搭建完整测试环境
- 🎨 **现代化UI**: 基于Ant Design Pro的精美界面
- 🔄 **自动化测试**: 支持定时任务和CI/CD集成
- 📊 **丰富报告**: 详细的测试报告和数据分析
- 🦗 **压力测试**: 集成Locust分布式压测能力
- 🔐 **权限管理**: 完善的用户权限和项目管理
- 🌐 **多环境支持**: 支持开发、测试、生产多环境

## 在线体验地址

[巧克力测试平台](https://www.coder-ljx.cn:7524/welcome)

账号密码: test/test

## 🚀 快速开始

### 环境要求
- Node.js 16+
- Python 3.8+
- MySQL 8.0+ / PostgreSQL 12+
- Redis 6.0+

### 一键启动 

需配合后端代码使用:[后端代码](https://github.com/ljxpython/test_platform):

```bash
# 克隆项目
git clone https://github.com/ljxpython/test_platform.git
cd test-platform

# 启动所有服务
pnpm install

# 初始化数据
pnpm run dev

# 访问平台: http://localhost:3000
# 默认账号: test / test
```

### 本地开发
```bash
# 前端启动
npm install
npm run start:dev

# 后端启动 (新终端)
git clone https://github.com/ljxpython/flask_platform_srv.git
pip install -r requirements.txt
python3 main.py

# 访问: http://localhost:5000
```

## 🎪 功能特性

### 🔌 接口测试
- **自动化用例同步**: 从代码自动同步测试用例
- **多环境支持**: 支持dev/test/staging/prod环境切换
- **参数化测试**: 支持数据驱动的参数化测试
- **断言增强**: 丰富的断言方式和自定义断言
- **测试报告**: 详细的执行报告和趋势分析

### ⚡ 压力测试
- **Locust集成**: 基于Locust的分布式压力测试
- **实时监控**: 实时查看QPS、响应时间、错误率
- **场景设计**: 灵活的压测场景配置
- **分布式支持**: 支持多机器协同压测
- **性能报告**: 专业的性能测试报告

### 📋 测试管理
- **项目管理**: 完整的项目生命周期管理
- **用例管理**: 测试用例的创建、编辑、分类管理
- **套件管理**: 灵活的测试套件组织和配置
- **计划管理**: 支持定时执行的测试计划
- **结果管理**: 测试结果的查看、分析和导出

### 🔄 自动化集成
- **定时任务**: 基于Cron表达式的定时执行
- **CI/CD集成**: 提供API接口支持流水线集成
- **通知机制**: 邮件、钉钉、企业微信等多种通知方式
- **Webhook支持**: 支持自定义Webhook通知

## 📚 文档

### 📖 用户文档
- [🎯 快速开始](./docs/user-guide/getting-started.md) - 5分钟上手指南
- [🔌 接口测试指南](./docs/user-guide/interface-testing.md) - 接口测试完整教程
- [⚡ 压力测试指南](./docs/user-guide/performance-testing.md) - Locust压测实战
- [📋 测试管理指南](./docs/user-guide/test-management.md) - 测试管理最佳实践

### 🛠️ 开发文档
- [🏗️ 架构设计](./docs/developer-guide/architecture.md) - 系统架构详解
- [📖 API文档](./docs/developer-guide/api-reference.md) - 完整API接口文档
- [💻 开发环境搭建](./docs/developer-guide/development-setup.md) - 开发环境配置
- [✨ 最佳实践](./docs/developer-guide/best-practices.md) - 开发最佳实践

### 🚀 部署文档
- [📦 安装指南](./docs/deployment/installation.md) - 详细安装步骤
- [⚙️ 配置说明](./docs/deployment/configuration.md) - 配置参数说明
- [🔧 故障排除](./docs/deployment/troubleshooting.md) - 常见问题解决

> 📋 **完整文档导航**: [docs/README.md](./docs/README.md)

## 🏗️ 技术架构

### 前端技术栈
- **React 18**: 现代化前端框架
- **TypeScript**: 类型安全的JavaScript
- **Ant Design Pro**: 企业级UI解决方案
- **UmiJS 4**: 可扩展的前端应用框架
- **ProComponents**: 高级组件库

### 后端技术栈
- **Flask**: 轻量级Python Web框架
- **SQLAlchemy**: Python ORM框架
- **Celery**: 分布式任务队列
- **Redis**: 缓存和消息队列
- **MySQL**: 关系型数据库

### 测试技术栈
- **Pytest**: Python测试框架
- **Locust**: 性能测试工具
- **Requests**: HTTP请求库

## 🚀 部署指南

### 手动部署
详细的手动部署步骤请参考 [安装指南](./docs/deployment/installation.md)

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 如何贡献
1. 🍴 Fork 本项目
2. 🌿 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 💾 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 📤 推送到分支 (`git push origin feature/AmazingFeature`)
5. 🔀 创建 Pull Request

### 开发规范
- 遵循 [代码规范](./docs/developer-guide/best-practices.md)
- 编写单元测试
- 更新相关文档
- 通过所有CI检查

## 📄 开源协议

本项目基于 [MIT License](LICENSE) 开源协议。

## 🙏 致谢

感谢以下开源项目的支持：
- [Ant Design Pro](https://pro.ant.design/) - 企业级UI解决方案
- [Flask](https://flask.palletsprojects.com/) - Python Web框架
- [Locust](https://locust.io/) - 现代化负载测试工具
- [React](https://reactjs.org/) - 用户界面库

## 📞 联系我

- 📧 邮箱: 1030470148@qq..com
- 🐛 问题反馈
- 个人微信号

<img src="docs/assets/image-20250531212549739.png" alt="Description" width="300"/>



---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给我们一个Star！⭐**

Made with ❤️ by Test Platform Team

</div>

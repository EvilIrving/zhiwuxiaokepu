# 植物科普平台 (Plant Science Education Platform)

一个现代化的植物科普教育平台，包含管理后台和移动端展示界面。

![Platform Overview](placeholder-platform-overview.jpg)

## 🌱 项目介绍

本项目是一个完整的植物科普教育解决方案，包含：
- **管理后台** (`admin/`): 用于内容管理和系统配置
- **移动端** (`mobile/`): 面向用户的植物科普展示应用
- **原型设计** (`二维码原型/`): 产品原型和交互设计

## 🚀 技术栈

### 管理后台 (Admin)
- **框架**: Vue 3 + Vite
- **UI组件库**: Element Plus
- **状态管理**: Pinia
- **路由**: Vue Router
- **样式**: Tailwind CSS
- **HTTP客户端**: Axios
- **图标**: Element Plus Icons

### 移动端 (Mobile)
- **框架**: Vue 3 + TypeScript + Vite
- **状态管理**: Pinia
- **路由**: Vue Router
- **样式**: Tailwind CSS + daisyUI
- **开发工具**: VConsole (移动端调试)
- **代码规范**: ESLint + Prettier

## 📁 项目结构

```
zhiwuxiaokepu/
├── admin/                    # 管理后台
│   ├── src/
│   │   ├── api/             # API接口
│   │   ├── components/      # 公共组件
│   │   ├── views/          # 页面视图
│   │   ├── stores/         # 状态管理
│   │   └── utils/          # 工具函数
│   └── package.json
├── mobile/                   # 移动端应用
│   ├── src/
│   │   ├── components/      # 组件
│   │   ├── view/           # 页面视图
│   │   └── stores/         # 状态管理
│   └── package.json
└── 二维码原型/              # 产品原型
```

## 🛠️ 快速开始

### 环境要求
- Node.js >= 16.0.0
- pnpm (推荐) 或 npm

### 安装依赖

#### 管理后台
```bash
cd admin
pnpm install
```

#### 移动端
```bash
cd mobile
pnpm install
```

### 开发启动

#### 管理后台
```bash
cd admin
pnpm dev
```
访问: http://localhost:5173

#### 移动端
```bash
cd mobile
pnpm dev
```
访问: http://localhost:5174

### 生产构建

#### 管理后台
```bash
cd admin
pnpm build
```

#### 移动端
```bash
cd mobile
pnpm build
```

## 🎯 功能特性

### 管理后台功能
- 🌿 植物信息管理
- 📸 图片上传和管理
- 👥 用户权限管理
- 📊 数据统计分析
- 🔍 搜索和筛选

### 移动端功能
- 📱 响应式设计，适配各种移动设备
- 🌱 植物科普内容展示
- 🔍 搜索功能
- 📖 详情页面
- 📤 分享功能

## 🎨 UI/UX 设计

- **设计语言**: 现代化、简洁、易用
- **色彩方案**: 自然绿色系，符合植物主题
- **图标**: 简洁的线性图标
- **交互动画**: 流畅的过渡效果

![Admin Dashboard](placeholder-admin-dashboard.jpg)
![Mobile Interface](placeholder-mobile-interface.jpg)

## 🔧 开发规范

### 代码规范
- 使用 ESLint + Prettier 进行代码格式化
- 遵循 Vue 3 Composition API 规范
- TypeScript 严格模式

### 提交规范
- 使用清晰的提交信息
- 遵循 conventional commits 规范

## 📱 浏览器兼容

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90
- 移动端浏览器 (iOS Safari, Chrome Mobile)

## 🚀 部署

### 环境变量配置
创建 `.env` 文件并配置相关环境变量：

```bash
# 基础URL
VITE_BASE_URL=/
VITE_API_BASE_URL=https://your-api-domain.com

# 其他配置
...
```

### 构建部署
```bash
# 构建生产版本
pnpm build

# 部署到服务器
# 将 dist 目录下的文件部署到您的 Web 服务器
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 邮箱: your-email@example.com
- Issues: [GitHub Issues](https://github.com/your-username/zhiwuxiaokepu/issues)

---

*本项目由植物科普团队开发与维护*
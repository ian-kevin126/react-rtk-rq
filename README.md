# 简介

[React](https://reactjs.org/) 是用于构建用户界面的流行 JavaScript 库。

[Rsbuild](https://rsbuild.dev/) 是由 Rspack 驱动的高性能构建工具，它默认包含了一套精心设计的构建配置，提供开箱即用的开发体验。

# 开始

- 单击 **运行** 按钮启动程序。

![Run](https://lf-cdn.marscode.com.cn/obj/eden-cn/ljhwz_lkpkbvsj/ljhwZthlaukjlkulzlp/project_template/prod/3b0f16a28c0263a9c9836741154fa0776989661a/images/native_nodejs_react/run.jpeg)

- 转到 Webview 查看实时页面。

![Preview](https://lf-cdn.marscode.com.cn/obj/eden-cn/ljhwz_lkpkbvsj/ljhwZthlaukjlkulzlp/project_template/prod/3b0f16a28c0263a9c9836741154fa0776989661a/images/native_nodejs_react/preview.jpeg)

默认情况下，MarsCode 运行 dev 脚本，你可以更改 **. vscode/launch.json** 中的配置。参考 [Visual Studio Code 的文档](https://code.visualstudio.com/docs/editor/debugging) 有关如何配置 launch.json。

# 了解更多

- [React](https://react.dev/learn) - 了解 React 功能。
- [Rsbuild](https://rsbuild.dev/) - 了解 Rsbuild 功能。

# 帮助

如果你需要帮助，你可以查看[文档](https://docs.marscode.cn/)，或向我们提供[反馈](https://juejin.cn/pin/club/7359094304150650889?utm_source=doc&utm_medium=marscode)。

# shell 杀死进程

```shell
netstat -lnp|grep 8089

kill -9 [pid]
```

这段shell指令的意思是：使用netstat命令列出所有网络连接、路由表、接口统计信息、伪装连接和多播成员，并通过管道（|）将结果传递给grep命令，grep命令在这些结果中搜索包含字符串"8089"的行。
具体来说：
- netstat -lnp：
    -l：只显示监听（listening）状态的网络连接。
    -n：以数字形式显示IP地址和端口号，而不是尝试解析主机名和服务名。
    -p：显示与每个连接相关的进程ID和程序名。
- | grep 8089：
    - |：管道符号，将netstat命令的输出作为grep命令的输入。
    - grep 8089：在输入中搜索包含字符串"8089"的行。
因此，这个指令的目的是找出所有正在监听8089端口的网络连接，并显示相关的进程ID和程序名。
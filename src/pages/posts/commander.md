---
layout: '@/templates/BasePost.astro'
title: 基于commander打造自己业务的脚手架
description: 基于commander打造自己业务的脚手架
pubDate: 2020-01-01T00:00:00Z
imgSrc: '/assets/images/image-post6.jpeg'
imgAlt: 'Image post 6'
---

## 前言
随着业务的发展，一个公司可能有多个部门使用同一个技术迭代业务，这时候就产生了一个问题，这么多雷同的项目不能总是拷贝，打造符合自己公司的脚手架应运而生。
分享一下我自己写的一个react-native的脚手架.


## 效果
<img src="/assets/images/commander-pic1.png" width="480" /><br/>
<img src="/assets/images/commander-pic2.png" width="580" /><br/>

## 技术选型
- 基于commander的命令行框架
- 基于react-native0.55.4版本，集成了redux、typescript、react-navigation demo
- 打包脚本
- 代码规范eslint

## 架手架入口
```
#!/usr/bin/env node
import { Command } from 'commander'
import { init } from './command/init'
import { fix } from './command/fix'
import { bundle } from './command/bundle'
import { zipBundle } from './command/zip'
const pkg = require('../package.json')

const program = new Command('srn')
program.version(pkg.version)

program
  .command('init')
  .description('初始化react-native 项目工程')
  .option('-n, --name <name>', '项目名称')
  .action(init)

program
  .command('bundle')
  .description('react-native 打整包')
  .option('-e --entry <entry>', '入口文件')
  .option('-o --outputDir <outputDir>', 'bundle输出目录')
  .option('-p --platform <platform>', '平台（android|ios)')
  .option('-a --assetsDest <assetsDest>', '静态资源输出目录')
  .action(bundle)

program
  .command('zip')
  .description('bundle压缩')
  .option('-n --name <name>', '名称')
  .action(zipBundle)

program
  .command('fix')
  .description('修复react-native运行时问题')
  .option('-q, --question <question>', '需修复的问题')
  .action(fix)

program.parse(process.argv)

```
## react-native项目初始化命令
```
export const init = async (options: {name: string}) => {
  const { name } = options
  const finalOptions = { ...options }
  if (!name) {
    const { name } = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'project name:',
        validate: (input = '') => input.trim().length > 0
      }
    ])
    finalOptions.name = name
  }
  logger.log(banner)

  const spinner = ora(colors.green(`Setting up new React Native app in ${finalOptions.name}`))
  try {
    spinner.succeed()
    const projectDir = path.join(path.resolve(process.cwd()), finalOptions.name)
    const flag = mkdirSync(projectDir)
    if (!flag) {
      process.exit(1)
    }

    spinner.start('downloading template')
    const templatePath = path.resolve(__dirname, '../../template')
    copyProjectTemplateAndReplace(templatePath, projectDir, finalOptions.name)

    await delay((Math.random() + 0.4) * 10000)
    spinner.succeed(colors.green('download template'))

    spinner.start('creating appJson')
    addAppJson(projectDir, finalOptions.name)
    await delay(Math.random() * 4000)
    spinner.succeed(colors.green('created appJson'))

    spinner.succeed(colors.green(`successful created ${finalOptions.name}`))
  } catch (e) {
    spinner.stop()
  }
}
```
## 修复react-native 0.55.4版本运行时问题的命令
```
enum QuestionEnum {
  q0 = '1、[ios]MacOS 运行报错 Could not find iPhone simulator',
  q1 = '2、[ios]third-part config.h not found; Entry, ":CFBundleIdentifier", Does Not Exist',
  q2 = '3、[ios]遇到 React Native 启动报错的问题 getCurrentAppState:error 和 objectAtIndexedSubscript: 的解决方案',
  q3 = '4、[ios]Xcode12.5/报错：Cannot initialize a parameter of type ‘NSArray＜id＜RCTBridgeModule＞＞ *',
  q4 = '5、[build] Error fast-image OnProgressEvent',
  q5 = '6、[android] blacklist regex syntax errors'
}

export const fix = async (options: { question: string }) => {
  const { question } = options
  const finalOptions = { ...options }

  if (!question) {
    const { question } = await inquirer.prompt([
      {
        type: 'list',
        name: 'question',
        message: '请选择修复的问题',
        choices: [QuestionEnum.q0, QuestionEnum.q1, QuestionEnum.q2, QuestionEnum.q3, QuestionEnum.q4, QuestionEnum.q5],
        default: 0
      }
    ])
    finalOptions.question = question
  }

  const spinner = ora(colors.green('问题修复中...'))
  spinner.start()

  let success: boolean = false
  switch (finalOptions.question) {
    case QuestionEnum.q0:
      success = fixQ0()
      break
    case QuestionEnum.q1:
      success = await fixQ1()
      break
    case QuestionEnum.q2:
      success = fixQ2()
      break
    case QuestionEnum.q3:
      success = fixQ3()
      break
    case QuestionEnum.q4:
      success = fixQ4()
      break
    case QuestionEnum.q5:
      success = fixQ5()
      break
  }

  if (success) spinner.succeed(colors.green('问题已修复'))
  spinner.stop()
}

```

## 总结
- 可以封装自己的业务，集成基础服务，提升开发效率
